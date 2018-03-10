import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { WoodType } from './wood-types';
import * as prototypes from "./wood-types";

import { WoodTypeFactory } from './wood-type-factory';
import { ResultsCalculator } from './results-calculator';

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
  buckets: object = {
    'big_high_quality_container': [],
    'big_best_quality_container': [],
    'big_low_quality_container': [],
    'big_medium_quality_container': [],
    'huge_best_quality_container': [],
    'huge_high_quality_container': [],
    'huge_low_quality_container': [],
    'huge_medium_quality_container': [],
    'medium_best_quality_container': [],
    'medium_high_quality_container': [],
    'medium_low_quality_container': [],
    'medium_medium_quality_container': [],
    'small_best_quality_container': [],
    'small_high_quality_container': [],
    'small_low_quality_container': [],
    'small_medium_quality_container': []
  };
  main_bucket: Array<WoodType> = [];
  apiRoot: string = 'http://localhost:4200/proxy';
  client: Http;
  prices: object;
  woodPieceForm: object = {coeficientField: 1};
  calculator: ResultsCalculator;
  results: object;

  constructor(private http: Http) {
    this.prototypes = prototypes;
    this.factory = new WoodTypeFactory(this.prototypes);
    this.client = http;
  }

  ngOnInit() {
    let self = this;
    this.getPrices().subscribe(data => {
      self.prices = JSON.parse(data.text());
      self.recalculate_result();
    });
  }

  submitWoodPiece(form){
    let self = this;
    let wood_piece = form.value;
    this.calculateSizeOverRemoteApi(wood_piece.length, wood_piece.diameter,
                                    wood_piece.quality, wood_piece.coeficient)
  }

  deletePiece(id){
    this.main_bucket
    let element = this.main_bucket.find(e => { return e.id == id });
    this.remove_element_from_collection(this.main_bucket, element);
    this.remove_element_from_collection(this.buckets[element.type + '_container'], element);
    this.recalculate_result();
  }

  recalculate_result(){
    let calculator = new ResultsCalculator(this.buckets, this.prices);
    this.results = calculator.calculate_result();
  }

  remove_element_from_collection(collection, element){
    collection.splice(collection.indexOf(element), 1);
  }

  calculateSizeOverRemoteApi(length: number, diameter: number, quality: string, coef: number){
    let self = this;
    let url = `${this.apiRoot}?`;
    url += 'standart=gost&';
    url += 'LogLen=' + length + '&';
    url += 'LogDiam=' + diameter + '&';
    url += 'Quantity=' + 1 + '&';
    url += Math.random();
    
    this.client.get(url).subscribe(
      res => {
        let size = Number(res.text().match(/(\d\.\d+)/)[0])
        self.createElement(length, diameter, size, quality, coef)
      },
      msg => console.log(`Error: ${msg.status} ${msg.statusText}`)
    ); 
  }

  createElement(length: number, diameter: number, size: number, quality: string, coef: number){
    let wood_type = this.factory.create(length, diameter, size, quality, coef);
    this.buckets[wood_type.container()].push(wood_type);
    this.main_bucket.push(wood_type);
    this.recalculate_result();
  }

  getPrices() {
    return this.http.get("./assets/prices.json")
  }

}
