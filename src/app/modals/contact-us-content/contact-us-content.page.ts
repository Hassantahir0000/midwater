import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-contact-us-content',
  templateUrl: './contact-us-content.page.html',
  styleUrls: ['./contact-us-content.page.scss'],
})
export class ContactUsContentPage implements OnInit {

  constructor( public modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  //close modal
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
