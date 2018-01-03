/**
 * Created by jawad on 30/05/2017.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {elementAt} from "rxjs/operator/elementAt";

@Injectable()
export class DataService{
    http:any;
    dataSourceUrl: String;
    categories:string;
    constructor(http:Http){
        this.http = http;
        this.dataSourceUrl = 'draw.json';
        this.categories = 'categories.json';
    }
    getData(){
        return this.http.get(this.dataSourceUrl).map(res => res.json());
    }
    getCategories(){
      return this.http.get(this.categories).map(res => res.json());
    }
    getImagesByCategorie(idCategorie){
      let result = [];
      this.http.get(this.dataSourceUrl).map(res => res.json()).subscribe(res => {
        let items = res
        items.forEach(item => {
          if (item.cat == idCategorie){
            result.push(item)
          }
        })
        })
      return result
    }


}
