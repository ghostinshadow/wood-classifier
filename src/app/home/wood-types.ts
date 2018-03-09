import { v4 as uuid } from 'uuid';

export class WoodType {
	length: number;
	diameter: number;
	size: number;
	type: string;
	id: string;

	constructor(length: number, diameter: number, size: number){
		this.length = length;
		this.diameter = diameter;
		this.size = size;
		this.id = uuid();
	}

	container(){
		return this.type + '_container';
	}

	calculate_price(prices: object){
		return this.size * prices[this.type] * 100;
	}
}

export class BigBestQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'big_best_quality';
	}
}

export class BigHighQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'big_high_quality';
	}
}

export class BigLowQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'big_low_quality';
	}
}

export class BigMediumQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'big_medium_quality';
	}
}

export class HugeBestQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'huge_best_quality';
	}
}

export class HugeHighQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'huge_high_quality';
	}
}

export class HugeLowQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'huge_low_quality';
	}
}

export class HugeMediumQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'huge_medium_quality';
	}
}

export class MediumBestQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'medium_best_quality';
	}
}

export class MediumHighQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'medium_high_quality';
	}
}

export class MediumLowQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'medium_low_quality';
	}
}

export class MediumMediumQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'medium_medium_quality';
	}
}

export class SmallBestQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'small_best_quality';
	}
}

export class SmallHighQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'small_high_quality';
	}
}

export class SmallLowQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'small_low_quality';
	}
}

export class SmallMediumQuality extends WoodType{
	constructor(length: number, diameter: number, size: number){
		super(length, diameter, size);
		this.type = 'small_medium_quality';
	}
}