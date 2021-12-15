import { Pipe, PipeTransform } from '@angular/core';
import { AppTranslationService } from 'src/services/app-translation/app-translation.service';
import { SharedDataService } from 'src/services/shared-data/shared-data.service';


@Pipe({
  name: 'translate',
  pure: false
})
export class TranslateAppPipe implements PipeTransform {


  constructor(
    public shared: SharedDataService,
    public appTranslationService: AppTranslationService) {

  }
  transform(value: string) {
    //console.log(value + " " + this.shared.translationListArray[value.toString()]);
    // if (this.appTranaltionService.translationListArray[value] == undefined) {
    //   if (this.shared.lab)
    //     this.appTranaltionService.missingValues[value] = value;
    //   return value;
    // }

    return this.appTranslationService.translateStringPipe(value)
  }

}
