import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppLogService } from 'src/services/app-log/app-log.service';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';

@Component({
  selector: 'app-app-log-page',
  templateUrl: './app-log-page.page.html',
  styleUrls: ['./app-log-page.page.scss'],
})
export class AppLogPagePage implements OnInit {

  segmentsTabs = "log";
  constructor(
    public appLogService: AppLogService,
    public modalCtrl: ModalController,
    public appTranslationService: AppTranslationService) { }

  ngOnInit() {
  }
  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
