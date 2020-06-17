import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'convertirBool'
})

export class MiPipe implements PipeTransform {

    transform(value: Boolean): String {
        if (value == true)
            return "SI"
        else{
            if(value == false)
                return "NO"
            else
                return "No seleccionado"
        }

    }
}
