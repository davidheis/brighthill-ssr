import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeJsonScript'
})
export class SafeScriptPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  transform(value: any): any {
    if (value) {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }

  }

}
