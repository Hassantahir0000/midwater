import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor() {

  }
  // JSON "set" example
  async set(keyy, value) {
    await Storage.set({
      key: keyy,
      value: JSON.stringify(value)
    });
  }

  // JSON "get" example
  async get(keyy) {
    const ret = await Storage.get({ key: keyy });
    const data = JSON.parse(ret.value);
    return data;
  }

}
