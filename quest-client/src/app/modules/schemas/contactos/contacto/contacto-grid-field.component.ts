import { Component, OnInit } from '@angular/core';
import { ContactoModelConfig } from '../../../../model-configs/contactos/contacto-model-config';
import { AocGridColumn } from '@atlantis-of-code/aoc-client/core/types';
import { Contacto } from '../../../../models/contactos/contacto';
import { AocGridModule } from '@atlantis-of-code/aoc-client/components/aoc-grid';

@Component({
  selector: 'app-contacto-grid-field',
  standalone: true,
  imports: [
    AocGridModule
  ],
  template: `
    <aoc-grid-field
      [modelConfig]="modelConfig"
      [columns]="columns"
    ></aoc-grid-field>
  `
})
export class ContactoGridFieldComponent implements OnInit {
  columns: AocGridColumn[];

  constructor(
    public modelConfig: ContactoModelConfig
  ) { }

  ngOnInit(): void {
    this.columns = [
      { header: 'Nombre', display: Contacto.field.NOMBRE, defaultSort: 'asc' },
      { header: 'Teléfono 1', display: Contacto.field.TELEFONO1},
      { header: 'Teléfono 2', display: Contacto.field.TELEFONO2},
      { header: 'Teléfono 3', display: Contacto.field.TELEFONO3},
      { header: 'Email', display: Contacto.field.EMAIL},
    ];
  }
}
