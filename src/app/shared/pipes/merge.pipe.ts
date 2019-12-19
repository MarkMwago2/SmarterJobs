import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'merge'
})
export class MergePipe implements PipeTransform {

  transform(arr1, arr2) {
    const arr = [];
    arr1.forEach((elt, i) => {
      arr.push({ state: elt, name: arr2[i] });
    });
  }

}
