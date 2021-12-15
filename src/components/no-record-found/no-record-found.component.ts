import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';

@Component({
  selector: 'app-no-record-found',
  templateUrl: './no-record-found.component.html',
  styleUrls: ['./no-record-found.component.scss'],
})
export class NoRecordFoundComponent implements OnInit {
  @Input('data') data;//product data
  constructor(public shared: SharedDataService) {

  }

  ngOnInit() { }

}
