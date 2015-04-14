$(document).on('ready', function() {
  
	var testString = '186,54,"Dawn Shill",sweetpeashill@gmail.com,907-250-6975,26/04/2014,Shipped,265.50,265.50,0.00,5.00,5.00,Ground,0.0000,0.0000,270.50,270.50,"Credit Card",4,0,29/04/2014,USD,1.0000000000,,,Dawn,Shill,,"PO Box 772706",,"Eagle River",AK,99577,"United States",907-250-6975,sweetpeashill@gmail.com,Dawn,Shill,,"PO Box 772706",,"Eagle River",AK,99577,"United States",907-250-6975,sweetpeashill@gmail.com,"Product ID: 100, Product Qty: 1, Product SKU: 8810-WonderBlue-Small, Product Name: Surya Leopard Yoga Legging, Product Weight: 0.8000, Product Variation Details: Size: S (4), Product Unit Price: 67.50, Product Total Price: 67.50|Product ID: 115, Product Qty: 1, Product SKU: Viva Bahia yoga capri - Small, Product Name: Viva Bahia yoga capri, Product Weight: 0.5000, Product Variation Details: Size: S (4), Product Unit Price: 65.00, Product Total Price: 65.00|Product ID: 116, Product Qty: 1, Product SKU: Cotton candy yoga capri - Small, Product Name: Cotton candy yoga capri, Product Weight: 0.5000, Product Variation Details: Size: S (4), Product Unit Price: 68.00, Product Total Price: 68.00|Product ID: 117, Product Qty: 1, Product SKU: Tucano yoga capri - Small, Product Name: Tucano yoga capri, Product Weight: 0.5000, Product Variation Details: Size: S (4), Product Unit Price: 65.00, Product Total Price: 65.00"'


	// testString is one order including "repeat" followed by line items for the order
	console.log(testString)

	// Separate the testString into an array of "cells"
	var splitString = testString.split(",")


	// Finds the index in splitString that begins the line item order section
	var findOrder = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][0] == '"' && 
				arr[i][1] == 'P' &&
				arr[i][2] == 'r') {
				return i;
			}
		}
	}

	// The index that the line item orders begin at
	var orderStart = findOrder(splitString)

	// Creates the "Repeat" section of the order
	var findRepeat = function(arr) {
		var repeat = [];
		for (var i = 0; i < orderStart; i++){
			repeat.push(splitString[i])
		}
		repeat = repeat.join(',');
		return  repeat;
	}

	var repeat = findRepeat(splitString);


	// Returns an array of line item orders split at "|"
	var combineOrder = function(arr) {
		var orders = []
		for (var i = orderStart; i < splitString.length; i++) {
			if (i == findOrder(splitString)) {
				orders.push(splitString[i].substr(1))
			} else if (i == splitString.length - 1) {
				orders.push(splitString[i].substr(0, splitString[i].length - 1))
			} else {
				orders.push(splitString[i])
			}
		}
		return orders.join(",").split("|");
	}

	// console.log("combineOrder: " + combineOrder(splitString))

	var orderArray = combineOrder(splitString)

	var finalResult = function(arr) {
		for (var i = 0; i < arr.length; i++){
			console.log("BEGIN ORDER: " + repeat + "," + arr[i])
		}
	}

	finalResult(orderArray)


	// console.log(findOrder(splitString))

	// Index 47 of splitString will be the beginning of the line item products
	// (at least for now with test input)
	// Eventually this will need business logic to find the beginning
	// Products always start with "Product ID: (with no end quote)
	// for (i...) if splitString[i]
	// console.log(splitString[47][0] + splitString[47][1] + splitString[47][2] + splitString[47][3])

	// .join 47 - end of line to get full order string

	// split that array by "|" to get an array of the ordered products

	// var findRepeat = function(str) {
	// 	var repeat = [];
	// 	for (var i = 0; i < str.length; i++) {
	// 		if (str[i] == )
	// 	}
	// }

	// var csvSplitter = function(str) {
	// 	var repeat = [];
	// 	for (var i = 0; i < str.length; i++) {
	// 		if(str[i] == " ") {
	// 			console.log(repeat)
	// 		}
	// 		else {
	// 			repeat.push(str[i])
	// 		}
	// 	}

	// 	console.log(repeat)
	// }

	// csvSplitter("Hello World!")


});