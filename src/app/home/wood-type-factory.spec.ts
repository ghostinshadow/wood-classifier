import { WoodTypeFactory } from './wood-type-factory';
import * as prototypes from "./wood-types";
import {  BigBestQuality } from "./wood-types";

import { async, TestBed } from '@angular/core/testing';
import { ResultsCalculator } from './results-calculator';

describe('WoodTypeFactory', () => {
    describe('.class_name', () => {
        let factory: WoodTypeFactory;
        it('should create medium best', async(() => {
          var factory = new WoodTypeFactory(prototypes);
          expect(factory.class_name(35, 'L')).toEqual('MediumBestQuality');
        }));

        it('should create medium best', async(() => {
          var factory = new WoodTypeFactory(prototypes);
          expect(factory.class_name(26, 'L')).toEqual('MediumBestQuality');
        }));

        it('should create small high', async(() => {
          var factory = new WoodTypeFactory(prototypes);
          expect(factory.class_name(14, '||')).toEqual('SmallHighQuality');
        }));

        it('should create small high', async(() => {
          var factory = new WoodTypeFactory(prototypes);
          expect(factory.class_name(25, '||')).toEqual('SmallHighQuality');
        }));

        it('should create big low', async(() => {
          var factory = new WoodTypeFactory(prototypes);
          expect(factory.class_name(36, 'T')).toEqual('BigLowQuality');
        }));

        it('should create big low', async(() => {
          var factory = new WoodTypeFactory(prototypes);
          expect(factory.class_name(49, 'T')).toEqual('BigLowQuality');
        }));

         it('should create huge medium', async(() => {
          var factory = new WoodTypeFactory(prototypes);
          expect(factory.class_name(50, '|||')).toEqual('HugeMediumQuality');
        }));
    })

    describe('.create', () => {
        let factory: WoodTypeFactory;

        it('should create medium best', async(() => {
          var factory = new WoodTypeFactory(prototypes);
          var result = factory.create(400, 33, 0.55, 'L');

          expect(result.type).toEqual('medium_best_quality');
          expect(result.length).toEqual(400);
          expect(result.diameter).toEqual(33);
          expect(result.size).toEqual(0.55);
        }));
    })
});

describe('WoodType', () => {
    describe('.calculate_price', () => {
        let wood_type: BigBestQuality;

    it('should calculate price', async(() => {
        var wood_type = new BigBestQuality(400, 33, 0.55, 1);
        var prices = {'big_best_quality': {value: 35000} };

        expect(wood_type.calculate_price(prices)).toEqual(1925000);
        }))
    })
});


describe('ResultsCalculator', () => {
    describe('.constructor', () => {
      it('accepts buckets and prices', async(() => {
        let prices = {'big_best_quality': 35000};
        let buckets = {};
        let calculator = new ResultsCalculator(buckets, prices);

        expect(calculator.buckets).toEqual({});
      }))
    })

    describe('.calculate_result', () => {
      it('calculates result object', async(() => {
        let prices = {'big_best_quality': {'value': 35000} };
        let wood_types = [new BigBestQuality(400, 33, 0.55, 1),
                          new BigBestQuality(400, 37, 0.77, 1)]
        let buckets = {'big_best_quality_container': wood_types};
        let calculator = new ResultsCalculator(buckets, prices);

        let result = calculator.calculate_result();

        expect(result['big_best_quality']).toEqual({
          'size': 1.32,
          'calculated_price': 46200,
          'price': 35000
        })

        expect(result['overal_price']).toEqual(46200)
      }))
    })

    describe('.calculate_sum_object', () => {
      it('calculates sum object', async(() => {
        let prices = {'big_best_quality': {'value': 35000} };
        let wood_types = [new BigBestQuality(400, 33, 0.55, 1),
                          new BigBestQuality(400, 37, 0.77, 1)]
        let buckets = {'big_best_quality_container': wood_types};
        let calculator = new ResultsCalculator(buckets, prices);

        let result = calculator.calculate_sum_object(wood_types);

        expect(result).toEqual({
          'size': 1.32,
          'calculated_price': 46200
        })
      }))

      it('is aware of given coefiecient', async(() => {
        let prices = {'big_best_quality': {'value': 35000} };
        let wood_types = [new BigBestQuality(400, 33, 0.55, 0.5),
                          new BigBestQuality(400, 37, 0.77, 0.5)]
        let buckets = {'big_best_quality_container': wood_types};
        let calculator = new ResultsCalculator(buckets, prices);

        let result = calculator.calculate_sum_object(wood_types);

        expect(result).toEqual({
          'size': 0.66,
          'calculated_price': 23100
        })
      }))
    })
})