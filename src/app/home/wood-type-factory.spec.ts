import { WoodTypeFactory } from './wood-type-factory';
import * as prototypes from "./wood-types";

import { async, TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
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