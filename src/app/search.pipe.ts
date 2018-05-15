

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'usersearch'
})
export class UsersearchPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        /* console.log('arg'+args);
         console.log(value);*/
        let val1:any=[];
        let flag:any=0;

        //return null;
        if (typeof(args)!= 'undefined') {
            args = args.toLocaleLowerCase();

            if (args === '') {
                return value;
            } else {
                val1 = [];
                for (let key in value) {

                    flag = 0;
                    //  console.log('value');
                    //  console.log(value[key]);
                    for (let key1 in value[key]) {
                        //  console.log(value[key][key1]);
                        if ((typeof value[key][key1] === 'string' || value[key][key1] instanceof String) &&
                            (value[key][key1].toString().toLowerCase().indexOf(args.toString().toLowerCase()) != -1)) {
                            //    console.log('ttt');
                            // console.log(value.filter(value=> (value.firstname.toLocaleLowerCase().indexOf(args) != -1 || value.lastname.toLocaleLowerCase().indexOf(args) != -1 || value.email.toLocaleLowerCase().indexOf(args) != -1)  ));
                            if (flag != 1) val1.push(value[key]);
                            flag = 1;
                        }
                        // console.log(66);
                        //  console.log(value);
                        //  console.log(value.filter(value=> (value[key1].toLocaleLowerCase().indexOf(args) != -1)  ));

                        // return value.filter(value=> (value[key1].toLocaleLowerCase().indexOf(args) != -1)  );
                    }
                }
                return val1;
                /*return value.filter(value=> (value.firstname.toLocaleLowerCase().indexOf(args) != -1 || value.lastname.toLocaleLowerCase().indexOf(args) != -1 || value.email.toLocaleLowerCase().indexOf(args) != -1)  );*/
            }
        }


        // return value;
    }
}


