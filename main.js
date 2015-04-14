$(document).on('ready', function() {


	// On submit button click runs findHeader then perOrder on the text inside box
	$('#submitButton').on('click', function(e){
		e.preventDefault();
		var text = $('#input').val();
		findHeader(text);
	})


	// var testString2 = prompt("Enter test string");

	var findHeader = function(orderInfo) {

		var splitFull = orderInfo.split("\n");

		var header = orderInfo.split("\n")[0];
		// console.log("HEADER: " + header);
		$('#results').append('<p>' + header + '</p>')

		for (var i = 1; i < splitFull.length; i++) {
			perOrder(splitFull[i])
		}

		// var body = orderInfo.split("\n")[1];
		// perOrder(body)
	};

	// findHeader(testString2);

	// Test String for Step 1 (separating each order into order info + line item repeating)
	var testString = '186,54,"Dawn Shill",sweetpeashill@gmail.com,907-250-6975,26/04/2014,Shipped,265.50,265.50,0.00,5.00,5.00,Ground,0.0000,0.0000,270.50,270.50,"Credit Card",4,0,29/04/2014,USD,1.0000000000,,,Dawn,Shill,,"PO Box 772706",,"Eagle River",AK,99577,"United States",907-250-6975,sweetpeashill@gmail.com,Dawn,Shill,,"PO Box 772706",,"Eagle River",AK,99577,"United States",907-250-6975,sweetpeashill@gmail.com,"Product ID: 100, Product Qty: 1, Product SKU: 8810-WonderBlue-Small, Product Name: Surya Leopard Yoga Legging, Product Weight: 0.8000, Product Variation Details: Size: S (4), Product Unit Price: 67.50, Product Total Price: 67.50|Product ID: 115, Product Qty: 1, Product SKU: Viva Bahia yoga capri - Small, Product Name: Viva Bahia yoga capri, Product Weight: 0.5000, Product Variation Details: Size: S (4), Product Unit Price: 65.00, Product Total Price: 65.00|Product ID: 116, Product Qty: 1, Product SKU: Cotton candy yoga capri - Small, Product Name: Cotton candy yoga capri, Product Weight: 0.5000, Product Variation Details: Size: S (4), Product Unit Price: 68.00, Product Total Price: 68.00|Product ID: 117, Product Qty: 1, Product SKU: Tucano yoga capri - Small, Product Name: Tucano yoga capri, Product Weight: 0.5000, Product Variation Details: Size: S (4), Product Unit Price: 65.00, Product Total Price: 65.00"'

	var perOrder = function(orderInfo) {

		// testString is one order including "repeat" followed by line items for the order
		// console.log(testString)

		// Separate the testString into an array of "cells"
		var splitString = orderInfo.split(",")

		// Test if index 24 is the customer message


		// Finds the index in splitString that begins the line item order section
		var findOrder = function(arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i][0] == '"' && 
					arr[i][1] == 'P' &&
					arr[i][2] == 'r' &&
					arr[i][3] == 'o' &&
					arr[i][4] == 'd' &&
					arr[i][5] == 'u' &&
					arr[i][6] == 'c' &&
					arr[i][7] == 't' &&
					arr[i][8] == ' ' &&
					arr[i][9] == 'I' &&
					arr[i][10] == 'D' &&
					arr[i][11] == ':') {
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
				// console.log("BEGIN ORDER: " + repeat + "," + arr[i])
				$('#results').append('<p>' + repeat + "," + arr[i] + '</p>')
			}
		}

		finalResult(orderArray)

	}

	// perOrder('424,222,"Roberta Aragon",bellagoni@gmail.com,505-401-1280,18/12/2014,Shipped,196.75,196.75,0.00,7.00,7.00,"Priority Flat Rate (3 items)",0.0000,0.0000,203.75,203.75,"Credit Card",3,0,18/12/2014,USD,1.0000000000,,,Roberta,Aragon,,"20707 Anza Ave # 214",,Torrance,CA,90503,"United States",505-401-1280,bellagoni@gmail.com,Roberta,Aragon,,"20707 Anza Ave # 214",,Torrance,CA,90503,"United States",505-401-1280,bellagoni@gmail.com,"Product ID: 149, Product Qty: 1, Product SKU: Medusa Jellyfish Crop-XS, Product Name: Medusa Jellyfish Crop, Product Weight: 0.1000, Product Variation Details: Size: XS (0-2), Product Unit Price: 48.75, Product Total Price: 48.75|Product ID: 159, Product Qty: 1, Product SKU: Pantanal legging-Small, Product Name: Pantanal Legging, Product Weight: 0.3000, Product Variation Details: Size: S (4), Product Unit Price: 72.00, Product Total Price: 72.00|Product ID: 169, Product Qty: 1, Product SKU: Holi Fest Legging-XS, Product Name: Holi Fest Legging, Product Weight: 0.3000, Product Variation Details: Size: XS (0-2), Product Unit Price: 76.00, Product Total Price: 76.00"')



});