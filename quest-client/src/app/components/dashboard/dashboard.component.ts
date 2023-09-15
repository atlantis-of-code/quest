import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { AocUiDisplay } from '@atlantis-of-code/aoc-client/ui/common/types';
import { AocFormWindowService, AocRestService } from '@atlantis-of-code/aoc-client/core/services';
import { NaceConnectorService } from '../../utils/nace-connector.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div style="display: flex; flex-direction: column; height: 100%;">
      <p>Aplicación de gestión Maverma</p>
      <!--
      <hr>
      <div style="width: 300px">
        <aoc-ui-datetime-picker [formControl]="calDate"></aoc-ui-datetime-picker>
      </div>
      <div style="width: 300px">
        <aoc-ui-datetime-picker [formControl]="calDate1" mode="dateTime"></aoc-ui-datetime-picker>
      </div>
      <div style="width: 300px">
        <aoc-ui-datetime-picker [formControl]="calDate1" mode="time"></aoc-ui-datetime-picker>
      </div>

      <hr>
      <div style="width: 300px">
        <aoc-ui-datetime-picker [formControl]="timeStr2" format="HH:mm:ss" mode="time"></aoc-ui-datetime-picker>
      </div>
      <hr>

      <aoc-ui-autocomplete style="width: 300px" [formControl]="autocompleteFormControl" [options]="options" (onQuery)="query($event)" [display]="display" [multiple]="true"></aoc-ui-autocomplete>

      <hr>
      <hr>


      <button (click)="receiveData($event)">NACE: Recibir datos desde extensión</button>

    -->
      <div style="flex: 1; position: relative;">
        <div style="position: absolute; overflow: auto; height: 100%; width: 100%;">
          <pre style="margin: 0; padding: 0;">{{ extensionPayload }}</pre>
        </div>
      </div>
    </div>
  `
})
export default class DashboardComponent implements OnInit {

  calDate = new UntypedFormControl(new Date());
  calDate1 = new UntypedFormControl(new Date(2020, 0, 15));
  calDate2 = new UntypedFormControl(new Date(2020, 0, 15));
  timeStr2 = new UntypedFormControl('05:55:21');

  // autocompleteFormControl = new FormControl();
  autocompleteFormControl = new UntypedFormControl([{id: 2, name: 'uep2'}]);
  options = [
    {
      id: 1,
      name: 'uep1'
    },
    {
      id: 2,
      name: 'uep2'
    },
    {
      id: 3,
      name: 'uep3'
    },
    {
      id: 4,
      name: 'uep4'
    },
    {
      id: 5,
      name: 'uep5'
    },
    {
      id: 6,
      name: 'uep6'
    }
  ];
  display: AocUiDisplay = 'name';


  extensionPayload: any = null;

  constructor(
    private aocRestService: AocRestService,
    private aocFormWindowService: AocFormWindowService,
    private naceConnectorService: NaceConnectorService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.timeStr2.valueChanges.subscribe(newVal => {
      console.log(newVal);
    });
    this.autocompleteFormControl.valueChanges.subscribe(newVal => {
      console.log(newVal);
    });
  }

  query($event) {
    console.log($event);
    this.options = [...this.options];
  }



  receiveData(event: Event) {
      this.naceConnectorService.getAndProcessPayload().then(payload => {
        this.extensionPayload = JSON.stringify(payload, undefined, 4);
        this.changeDetectorRef.detectChanges(); // need this to refresh template
        console.log(payload);
      }).catch(_ => {
        console.log('no payload... nothing to do');
      });
  }

  /*
  copyDocumentTest() {
    this.aocRestService.findOne$(Presupuesto, {id: '2'}, {
      populate: {
        [Presupuesto.entity.CLIENTE]: true,
        [Presupuesto.entity.ANYO_FISCAL]: true,
        [Presupuesto.collection.LINEA_PRESUPUESTO]: {
          [LineaPresupuesto.entity.ARTICULO]: {
            [Articulo.entity.CATEGORIA]: true
          }
        },
        [Presupuesto.entity.DIRECCION_FISCAL]: {
          [Direccion.entity.PAIS]: true,
          [Direccion.entity.DENOMINACION_VIA]: true
        },
        [Presupuesto.entity.DIRECCION_OBRA]: {
          [Direccion.entity.PAIS]: true,
          [Direccion.entity.DENOMINACION_VIA]: true
        },
      }
    }).subscribe(presupuesto => {
      const albaran = new Albaran();
      this.mavermaUtils.copyDocument(
        this.aocRestService,
        presupuesto,
        Presupuesto.collection.LINEA_PRESUPUESTO,
        albaran,
        Albaran.collection.LINEA_ALBARAN,
        LineaAlbaran).then(_ => {
        this.aocFormWindowService.openRoute({
          path: ['facturacion', 'albaran', 'form'],
          aocFormShareConfig: {
            model: albaran,
            persistToDatabase: false
          }
        });
        console.log(albaran);
      });

    })
  }
   */
}
