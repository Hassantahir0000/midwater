import { Injectable } from '@angular/core';
import { AppLogService } from '../app-log/app-log.service';
import { AppStorageService } from '../app-storage/app-storage.service';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AppTranslationService {
  public translationListArray = {};
  public missingValues = {}
  constructor(
    public config: ConfigService,
    public appLogService: AppLogService,
    public appStorageService: AppStorageService) {
    if (localStorage.missingValues)
      this.missingValues = JSON.parse(localStorage.missingValues)
  }

  consoleMissingValues() {
    console.log(this.missingValues);
  }

  // translation services
  translateStringPipe(value) {
    return this.getTranslationFromArray(value)
  }

  getTranslationFromArray(val) {
    let key = val.toLocaleLowerCase()
    let v = this.translationListArray[key]
    if (v == undefined) {
      this.missingValues[key] = key
      v = key;
    }
    localStorage.missingValues = JSON.stringify(this.missingValues)
    return v
  }
  // translation services
  translateString(value) {
    return new Promise(resolve => {
      resolve(this.getTranslationFromArray(value));
    });
  }
  translateArray(value) {
    return new Promise(resolve => {
      let tempArray = [];
      value.forEach(element => {
        tempArray[element] = this.getTranslationFromArray(element)
      });
      resolve(tempArray);
    });
  }
}
