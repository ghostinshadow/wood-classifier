import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { WoodType } from './wood-types';
import * as prototypes from "./wood-types";

import { WoodTypeFactory } from './wood-type-factory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  qualityOptions: object = {
  	best: 'L',
  	high: '||',
  	medium: '|||',
  	low: 'T'
  };

  headers: object = {
  	diameter: 'Діаметр, см',
  	size: 'V, м куб	',
  	price: 'Ціна',
  	cost: 'Обчислена вартість'
  };

  lengthOptions: object = {
  	huge: ' >= 50',
  	big: '36 - 49',
  	medium: '26 - 35',
  	small: '14 - 25'
  };

  factory: WoodTypeFactory;
  prototypes: any;
  calculatedObjects: WoodType[];
  apiRoot: string = 'http://localhost:4200/proxy';
  client: Http;

  constructor(private http: Http) {
    this.prototypes = prototypes;
    this.factory = new WoodTypeFactory(this.prototypes);
    this.client = http;
    debugger;
  }

  ngOnInit() {
  }

  calculateSizeOverRemoteApi(length: number, diameter: number, quality: string){
    let self = this;
    let url = `${this.apiRoot}?`;
    url += 'standart=gost&';
    url += 'LogLen=' + length + '&';
    url += 'LogDiam=' + diameter + '&';
    url += 'Quantity=' + 1 + '&';
    url += Math.random();
    
    this.client.get(url).subscribe(
      res => {
        let size = Number(res._body.match(/(\d\.\d+)/)[0])
        self.createElement(length, diameter, size, quality)
      },
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    ); 
  }

  createElement(length: number, diameter: number, size: number, quality: string){
    //set id
    let wood_type = this.factory.create(length, diameter, size, quality);
    let wood_bucket = this.woodBuckets[wood_type.type];
    wood_bucket.push(wood_type)
  }

}
