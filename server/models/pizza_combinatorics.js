
var PizzaToppings = require('./pizza').AvailableToppings;
Pizza_combinatorics = function(){
	
	this.GetPizzas = function(pizzas){
		var pizzaList = {};
		console.log('Iterate through pizzas\n');
		pizzas.forEach(function(pizza, index, pizzas){
			var key = '';
			for(var prop in pizza){				
				if (PizzaToppings.hasOwnProperty(prop) && prop != 'name' && pizza[prop] == true){
					key += prop + ' | ';					
				}
			}
			if(!(key in pizzaList)){
				pizzaList[key] = 1;
			} else {
				pizzaList[key]++;
			}
		});
		return pizzaList;
	}
}

module.exports = {
	Pizza_Combinatorics: new Pizza_combinatorics()
}