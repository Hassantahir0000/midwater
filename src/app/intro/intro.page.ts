import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';
import { ConfigService } from 'src/services/config/config.service';
import { AppEventsService } from 'src/services/app-events/app-events.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {


  @ViewChild('introSlider') introSlides: IonSlides;

  sliderConfig = {
    observer: true,
    observeParents: true
  }

  public slidesArray = [
    { image: "assets/intro/1.png", description: "online shopping", description2: "made easy" },
    { image: "assets/intro/2.png", description: "cook instantly", description2: "without any worries" },
    { image: "assets/intro/3.png", description: "ship at your home", description2: "in no time" }
  ];
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataService,
    public config: ConfigService,
    public appEventsService: AppEventsService,
    public modalCtrl: ModalController
  ) {
  }

  swipeNext() {
    this.introSlides.slideNext();
  }
  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {

  }

}
