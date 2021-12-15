import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from 'src/services/config/config.service';
@Pipe({
  name: 'curency'
})
export class CurencyPipe implements PipeTransform {

  constructor(public config: ConfigService) {
  }

  transform(value) {


    let currency = this.config.currencySymbolString;
    let decimals = this.config.currencyDecimalNumber;
    let currecnyPos = this.config.currencyPositionString;

    let priceFixed = parseFloat(value).toFixed(decimals);
    //let priceFixed = value;

    if (priceFixed.toString() == 'NaN') {

      if (currecnyPos == 'left')
        return currency + "" + value;
      else
        return value + " " + currency;
    }
    else {
      if (currecnyPos == 'left')
        return currency + "" + priceFixed;
      else
        return priceFixed + "" + currency;
    }
  }

}
