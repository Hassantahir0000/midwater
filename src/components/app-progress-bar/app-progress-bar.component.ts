import { Component, Input, OnInit } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';

@Component({
  selector: 'app-app-progress-bar',
  templateUrl: './app-progress-bar.component.html',
  styleUrls: ['./app-progress-bar.component.scss'],
})
export class AppProgressBarComponent implements OnInit {

  @Input('value') value;//current page

  constructor(public config: ConfigService) {
  }
  applyClassComplete(value) {
    if (this.value >= value) return true
  }
  ngOnInit() { }

}
