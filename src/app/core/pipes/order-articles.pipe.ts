import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderArticles'
})
export class OrderArticlesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value.sort((item1, item2) => {
        return item2.dateAddedToDatabase - item1.dateAddedToDatabase;
      });
    }
  }


}
