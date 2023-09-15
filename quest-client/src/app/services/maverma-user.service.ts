import { Injectable } from '@angular/core';
import { AocLoginService } from '@atlantis-of-code/aoc-client/core/services';
import { Usuario } from '../models/usuarios/usuario';

@Injectable({ providedIn: 'root' })
export class MavermaUserService {

  private usuario: Usuario;

  constructor(
    private aocLoginService: AocLoginService
  ) {
    this.init();
  }

  private init() {
    this.aocLoginService.getUserObservable<Usuario>().subscribe(usuario => this.usuario = usuario);
  }

  /**
   * returns if user is in provided group name, if 'admin' will always return true
   * @param groupName
   */
  public pertenceAlGrupo(nombreDeGrupo: string) {
    return this.usuario?.grupoCollection.some(group => group.nombre === nombreDeGrupo);
  }

  public esTecnico() {
    return this.usuario && this.usuario.tecnico != null;
  }

  public getTecnicoId() {
    return this.usuario.tecnico?.id;
  }
}
