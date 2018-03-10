export class ResultsCalculator{
  buckets: object;
  prices: object;
  result: object;
  size_multiplier: number = 1000;
  price_multiplier: number = 100;

  constructor(buckets: object, prices: object){
  	this.buckets = buckets;
  	this.prices = prices;
  	this.result = {overal_price: 0};
  }

  calculate_result(){
    let self = this;

  	Object.entries(this.buckets).forEach(k => {
  	  let [container_name, elements] = k;
  	  let type = container_name.match(/([\w_]+)_container/)[1]
  	  let temp_res = self.calculate_sum_object(elements);
  	  temp_res['price'] = this.prices[type].value; 
  	  self.result[type] = temp_res;
  	})
  	self.result['overal_price'] = self.result['overal_price'] / self.price_multiplier;

  	return self.result;
  }

  calculate_sum_object(elements){
  	let self = this;
  	let res = {size: 0, calculated_price: 0};

  	elements.forEach(wood_type => {
  	   res.size += wood_type.size * self.size_multiplier;
  	   res.calculated_price += wood_type.calculate_price(self.prices);
  	   self.result['overal_price'] += wood_type.calculate_price(self.prices);
  	})

  	res.size = res.size / self.size_multiplier;
  	res.calculated_price = res.calculated_price / self.price_multiplier;

  	return res;
  }
}