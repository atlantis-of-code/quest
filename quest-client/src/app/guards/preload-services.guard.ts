import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MavermaDefaultsService } from '../services/maverma-defaults.service';

@Injectable({ providedIn: 'root' })
export class PreloadServicesGuard implements CanActivate {

  constructor(
    private mavermaDefaultsService: MavermaDefaultsService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<boolean>((resolve, reject) => {
      return Promise.all([
        this.mavermaDefaultsService.ready()
      ])
        .then(() => resolve(true))
        .catch(e => reject('Fallo en la carga de servicios bàsicos para la aplicación'));
    });
  }

}
