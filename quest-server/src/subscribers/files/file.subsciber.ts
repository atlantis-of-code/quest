import { AocConfig, AocSubscriber } from "@atlantis-of-code/aoc-server";
import { ChangeSet, ChangeSetType, EventSubscriber, FlushEventArgs, Utils } from '@mikro-orm/core';
import fs from 'fs';
import path from 'path';
import { File } from '../../entities/files/file';

@AocSubscriber
export class FileSubsciber implements EventSubscriber<File> {

  filePath = AocConfig.aocConfigEnvironment.custom.filePath;

  constructor() {
    fs.promises.access(this.filePath, fs.constants.F_OK | fs.constants.W_OK)
      .catch(_ => {
        fs.promises.mkdir(this.filePath, { recursive: true }).then();
      })
    /*
    if (!fs.existsSync(this.filePath)) {
      fs.mkdirSync(this.filePath, {recursive: true});
    }
     */
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
    for (const cs of uow.getChangeSets().filter(cs => cs.entity instanceof File) as ChangeSet<Partial<File>>[]) {
      const file = cs.entity;
      // Delete operation will remove file from disk
      if ([ChangeSetType.DELETE, ChangeSetType.DELETE_EARLY].includes(cs.type)) {
        let directoryPath = path.join(this.filePath, file.directory, file.ref_id);
        if (file.subdirectory) {
          directoryPath = path.join(directoryPath, file.subdirectory);
        }
        await this.deleteFileFromDisk(directoryPath, file.name);
        // Check if directory is empty, if it is we can delete directory to clean up file system
        directoryPath = path.join(this.filePath, file.directory, file.ref_id);
        await this.tryToRemoveEmptyDir(directoryPath);
      } else {
        // File referer id missing, must be found from referer class in the identity map.
        // If referer parent is not found error will be thrown, else a native update will be set to the database
        // because the insert/updates has been already performed.
        if (!file.ref_id) {
          const refererId = Array.from(uow.getPersistStack().values()).find(o => `${o.__meta.schema}.${o.__meta.tableName}` === file.ref_class)?.id;
          if (!file.ref_id && !refererId) {
            throw new Error(`Could not get referer id for '${file.name}' searching parent class '${file.ref_class}'`);
          }
          await args.em.nativeUpdate(File, { id: file.id }, { ref_id: refererId });
          file.ref_id = refererId;
        }
        const oldFile = cs.originalEntity;
        if (oldFile && oldFile.name !== file.name) { // Move file
          let directoryPath = path.join(this.filePath, file.directory, file.ref_id);
          if (file.subdirectory) {
            directoryPath = path.join(directoryPath, file.subdirectory);
          }
          await this.moveFile(directoryPath, oldFile.name, file.name);
        }
      }
    }
    /*
    Check if any file has raw data to be persisted (disk operations)
     */
    const filesInIdentityMap: Map<string, File> = uow.getIdentityMap().getStore(args.em.getMetadata().get(Utils.className(File)));
    for (const file of filesInIdentityMap.values()) {
      if (file.raw) {
        // Directory path calculation, if file has a type will be added to the path
        let directoryPath = path.join(this.filePath, file.directory, file.ref_id);
        if (file.subdirectory) {
          directoryPath = path.join(directoryPath, file.subdirectory);
        }
        this.writeFileToDisk(directoryPath, file.name, file.raw);
      }
    }

  }

  /*
   * Disk operations
   */

  private async deleteFileFromDisk(directoryPath: string, fileName: string) {

    try {
      const fullPath = path.join(directoryPath, fileName);
      await fs.promises.access(fullPath);
      await fs.promises.rm(fullPath);
    } catch (_) {}
    /*
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath);
    }
     */
    await this.tryToRemoveEmptyDir(directoryPath);
  }

  private async tryToRemoveEmptyDir(directoryPath: string) {
    // Check if directory is empty, if it is we can delete directory to clean up file system
    try {
      await fs.promises.access(directoryPath, fs.constants.F_OK | fs.constants.W_OK);
      const files = await fs.promises.readdir(directoryPath);
      if (files.length === 0) {
        await fs.promises.rmdir(directoryPath);
      }
    } catch (e) {
    }
    /*
    if (fs.existsSync(directoryPath)) {
      const files = fs.readdirSync(directoryPath);
      if (files.length === 0) {
        fs.rmdirSync(directoryPath);
      }
    }
     */
  }

  private async writeFileToDisk(directoryPath: string, fileName: string, b64: string) {
    try {
      await fs.promises.access(directoryPath, fs.constants.F_OK | fs.constants.W_OK);
    } catch(_) {
      await fs.promises.mkdir(directoryPath, { recursive: true });
    }
    /*
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, {recursive: true});
    }
     */
    const fullPath = path.join(directoryPath, fileName);
    const data = b64.split(';base64,').pop();
    await fs.promises.writeFile(fullPath, data, { encoding: 'base64' });
    // fs.writeFileSync(fullPath, data, {encoding: 'base64'});
  }

  private async moveFile(directoryPath: string, oldFileName: string, newFileName: string) {
    try {
      const oldPath = path.join(directoryPath, oldFileName);
      const newPath = path.join(directoryPath, newFileName);
      await fs.promises.access(oldPath, fs.constants.F_OK | fs.constants.W_OK);
      await fs.promises.rename(oldPath, newPath);
    } catch (_) {}
    /*
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
    }
     */
  }
}
