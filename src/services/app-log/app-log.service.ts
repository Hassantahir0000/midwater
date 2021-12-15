import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AppLogService {
  dataTemp: { [k: string]: any } = {};
  data: any;

  dataTempError: { [k: string]: any } = {};
  dataError: any;
  innerHtml = "";
  constructor() { }
  public counter = 1;
  log(...arg) {
    //console.trace();
    //console.log(arg[0].constructor.name, Function.caller)
    // console.log(...arg);
    let source = this.counter + " >> " + arg[0];
    let result: { [k: string]: any } = {};
    //result.source = arg[0].constructor.name;
    for (let i = 0; i < arg.length; i++) {
      if (i != 0)
        result[i + "- arg >>"] = arg[i];
    }
    //console.log(source.toLocaleLowerCase());
    if (source.toLocaleLowerCase().search("error") != -1) {
      this.dataTempError[source] = result;
      this.dataError = JSON.parse(JSON.stringify(this.dataTempError));
    }
    else {
      this.dataTemp[source] = result;
      this.data = JSON.parse(JSON.stringify(this.dataTemp));
    }
    this.counter++;

  }
}
