export class WoodTypeFactory{
	prototypes: any;
	coef: number = 1;

	constructor(prototypes: any){
		this.prototypes = prototypes;
	}

	create(length: number, diameter: number, size: number, quality: string, coef?: number){
		let class_name = this.class_name(diameter, quality);
		return new this.prototypes[class_name](length, diameter, size, coef || this.coef);
	}

	class_name(diameter: number, quality: string){
		let class_name = '';
		class_name += this.classify_by_diameter(diameter);
		class_name += this.classify_by_quality(quality);
		class_name += 'Quality';
		return class_name;
	}

	classify_by_diameter(diameter: number){
		let result;
		switch (true) {
			case (diameter > 13 && diameter < 26):
				result = 'Small';
				break;
			case (diameter > 25 && diameter < 36):
				result = 'Medium';
				break;
			case (diameter > 35 && diameter < 50):
				result = 'Big';
				break;
			case (diameter > 49):
				result = 'Huge';
				break;
		}
		return result;
	}

	classify_by_quality(quality: string){
		switch (quality) {
			case "L":
				return 'Best';
			case "||":
				return 'High';
			case "|||":
				return 'Medium';
			case "T":
				return 'Low';
			default:
				console.log('Not available quality');
		}
	}
}