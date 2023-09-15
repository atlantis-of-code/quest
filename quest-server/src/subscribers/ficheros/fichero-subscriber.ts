import { ChangeSet, ChangeSetType, EventSubscriber, FlushEventArgs, Subscriber, Utils } from '@mikro-orm/core';
import { Fichero } from '../../entities/ficheros/fichero';
import path from 'path';
import fs from 'fs';
import { AocConfig } from '@atlantis-of-code/aoc-server';

@Subscriber()
export class FicheroSubscriber implements EventSubscriber<Fichero> {

  pathFicheros = AocConfig.aocConfigEnvironment.custom.pathFicheros;

  constructor() {
    if (!fs.existsSync(this.pathFicheros)) {
      fs.mkdirSync(this.pathFicheros, {recursive: true});
    }
  }

  /**
   * Database operations:
   * This is not a local observer registry, it's global and will be executed for every persist operation for any class.
   * It's the only way to get the identity map containing all the FILE objects even if they are not persisted (no changes).
   * By this way we can check if raw data is present and has to be persisted to hard disk.
   * @param args
   */
  async afterFlush(args: FlushEventArgs) {
    const uow = args.uow;
    /*
    Get all file objects from change set (database operations)
     */
    for (const cs of uow.getChangeSets().filter(cs => cs.entity.__meta.class === Fichero) as unknown as ChangeSet<Fichero>[]) {
      const fichero = cs.entity;
      // Delete operation will remove file from disk
      if (cs.type === ChangeSetType.DELETE) {
        let directoryPath = path.join(this.pathFicheros, fichero.directorio, fichero.referencia_id);
        if (fichero.subdirectorio) {
          directoryPath = path.join(directoryPath, fichero.subdirectorio);
        }
        this.deleteFileFromDisk(directoryPath, fichero.nombre);
        // Check if directory is empty, if it is we can delete directory to clean up file system
        directoryPath = path.join(this.pathFicheros, fichero.directorio, fichero.referencia_id);
        this.tryToRemoveEmptyDir(directoryPath);
      } else {
        // File referer id missing, must be found from referer class in the identity map.
        // If referer parent is not found error will be thrown, else a native update will be set to the database
        // because the insert/updates has been already performed.
        if (!fichero.referencia_id) {
          const refererId = Array.from(uow.getPersistStack().values()).find(o => `${o.__meta.schema}.${o.__meta.tableName}` === fichero.referencia_classe)?.id;
          if (!fichero.referencia_id && !refererId) {
            throw new Error(`Could not get referer id for '${fichero.nombre}' searching parent class '${fichero.referencia_classe}'`);
          }
          await args.em.nativeUpdate(Fichero, {id: fichero.id}, {referencia_id: refererId});
          fichero.referencia_id = refererId;
        }
        const oldFile = cs.originalEntity;
        if (oldFile && oldFile.nombre !== fichero.nombre) { // Move file
          let directoryPath = path.join(this.pathFicheros, fichero.directorio, fichero.referencia_id);
          if (fichero.subdirectorio) {
            directoryPath = path.join(directoryPath, fichero.subdirectorio);
          }
          this.moveFile(directoryPath, oldFile.nombre, fichero.nombre);
        }
      }
    }
    /*
    Check if any file has raw data to be persisted (disk operations)
     */
    const filesInIdentityMap: Map<string, Fichero> = uow.getIdentityMap().getStore(args.em.getMetadata().get(Utils.className(Fichero)));
    for (const fichero of filesInIdentityMap.values()) {
      if (fichero.raw) {
        // Directory path calculation, if file has a type will be added to the path
        let directoryPath = path.join(this.pathFicheros, fichero.directorio, fichero.referencia_id);
        if (fichero.subdirectorio) {
          directoryPath = path.join(directoryPath, fichero.subdirectorio);
        }
        this.writeFileToDisk(directoryPath, fichero.nombre, fichero.raw);
      }
    }

  }

  /*
   * Disk operations
   */

  private deleteFileFromDisk(directoryPath: string, fileName: string) {
    const fullPath = path.join(directoryPath, fileName);
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath);
    }
    this.tryToRemoveEmptyDir(directoryPath);
  }

  private tryToRemoveEmptyDir(directoryPath: string) {
    // Check if directory is empty, if it is we can delete directory to clean up file system
    if (fs.existsSync(directoryPath)) {
      const files = fs.readdirSync(directoryPath);
      if (files.length === 0) {
        fs.rmdirSync(directoryPath);
      }
    }
  }

  private writeFileToDisk(directoryPath: string, fileName: string, b64: string) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, {recursive: true});
    }
    const fullPath = path.join(directoryPath, fileName);
    const data = b64.split(';base64,').pop();
    fs.writeFileSync(fullPath, data, {encoding: 'base64'});
  }

  private moveFile(directoryPath: string, oldFileName: string, newFileName: string) {
    const oldPath = path.join(directoryPath, oldFileName);
    const newPath = path.join(directoryPath, newFileName);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
    }
  }


}
