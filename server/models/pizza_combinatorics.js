var _ = require('lodash-node');
var PizzaToppings = require('./pizza').AvailableToppings;
Pizza_combinatorics = function(){
	
	this.GetPizzas = function(pizzas){
		var pizzaList = {};
		console.log('Iterate through pizzas\n');
		pizzas.forEach(function(pizza, index, pizzas){
			var key = '';
			for(var prop in pizza){				
				if (PizzaToppings.hasOwnProperty(prop) && prop != 'name' && pizza[prop] == true){
					key += prop + '|';					
				}
			}
			if(!(key in pizzaList)){
				pizzaList[key] = .05;
			} else {
				pizzaList[key]++;
			}
		});
		var result = [];
		for(var prop in pizzaList){
			if (pizzaList.hasOwnProperty(prop)){
				var object = {
						quantity: Math.ceil(pizzaList[prop]),
						displayToppings: prop.replace('_', ' ').substring(0,prop.length-1).split('|'),
						toppingImgSrc: _.map(prop.substring(0,prop.length-1).split('|'), function(topping){
							return imageSrc[topping];
						})
					};
				result.push(object);
			}
		}

		return result;
	}
}

var imageSrc = {
	pepperoni: "images/topping_pepperoni_ML_reg.png",
	bacon: "images/topping_Bacon_ML_reg.png",
	beef: "images/topping_Beef_ML_reg.png",
	meatball: "images/topping_Meatball_ML_reg.png",
	chicken: "images/topping_Chicken_ML_reg.png",
	pork: "images/topping_Pork_ML_reg.png",
	salami: "images/topping_Salami_ML_reg.png",
	ham: "images/topping_Ham_ML_reg.png",
	sausage: "images/topping_ItalianSausage_ML_reg.png",
	mushrooms: "images/topping_Mushroom_ML_reg.png",
	green_peppers: "images/topping_GreenBellPepper_ML_reg.png",
	black_olives: "images/topping_Olives_black_ML_reg.png",
	banana_peppers: "images/topping_BananaPepper_ML_reg.png",
	cherry_peppers: "images/topping_CherryPepper_ML_reg.png",
	jalepeno: "images/topping_Jalepeno_ML_reg.png",
	red_onion: "images/topping_Onion_red_ML_reg.png",
	pineapple: "images/topping_Pineapple_ML_reg.png",
	spinach: "images/topping_Spinach_Fresh_ML_reg.png",
	tomato: "images/topping_Tomato_ML_reg.png"
}

module.exports = {
	Pizza_Combinatorics: new Pizza_combinatorics()
}