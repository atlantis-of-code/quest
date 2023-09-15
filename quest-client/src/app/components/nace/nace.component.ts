import { Component, OnInit, Optional } from '@angular/core';
import { AocUiWindowDynRef } from '@atlantis-of-code/aoc-client/ui/overlay/aoc-ui-window';
import { NaceConnectorService } from '../../utils/nace-connector.service';

@Component({
  selector: 'app-nace',
  templateUrl: './nace.component.html',
  styleUrls: ['./nace.component.scss']
})
export class NaceComponent implements OnInit {

  constructor(
    public naceConnectorService: NaceConnectorService,
    @Optional() private aocUiWindowDynRef: AocUiWindowDynRef
  ) {}

  ngOnInit() {
    this.aocUiWindowDynRef.show();
  }

}
