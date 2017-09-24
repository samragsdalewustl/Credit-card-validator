//Runs the luhn checkSum validation algorithm
function luhnCheck(number){
	//convert number to string
	var sNumber = number.toString();

	var checkSum = 0;

	//sum all odd digits
	for(var i = 1; i < sNumber.length-1; i += 2){
		//get character of the string and convert to int, add to sum
		checkSum += parseInt(sNumber.charAt(i));
		//console.log("int: " + sNumber.charAt(i));
	}
	//sum double each even digit
	for(var j = 0; j < sNumber.length-1; j += 2){
		var num = 2*parseInt(sNumber.charAt(j));

		//if 2*(even digit) is greater than 9, subtract 9
 		if(num > 9){
			num -= 9;
		}

		checkSum += num;
	}

	//compare the checkSum mod 10 to 10-(last digit)
	console.log(checkSum%10);
	if(checkSum%10 == 10-parseInt(sNumber.charAt(sNumber.length-1))){
		return true;
	}
	else{
		return false
	}
}

//object to hold different validations
//for multiple leading validations commas seperate values
//codes recieved from https://creditcardjs.com/credit-card-type-detection
//should use RegEx but this is quick and dirty
var validations = {};
validations["Amex"] = "34,37";
validations["JCB"] = "1800,2131"; //NEED TO ADJUST 3
validations["DinersClub"]  = "2014,2131,2149,38,300,301,302,303,304,405,309,36,39";
validations["Visa"] = "4";
validations["MasterCard"] = "51,52,53,54,55";
validations["Discover"] = "6011";
validations["UnionPay"] = "62,88";
validations["Laser"] = "6304, 6706, 6771, 6709";


//Takes cardnumber compares first digits against above dictionary of keys
//and returns card type
//If function cannot find a match returns string "N/A"
function getCardType(cardNumber){
	var sCardNumber = cardNumber.toString();

	//goes through each of the validations
	for(key in validations){
		//splits the strings into individual validation tokens
		var validators = validations[key].split(",");

		//goes through validation tokens
		for(i in validators){
			//slices necessary part of card number
			var checkPortion = sCardNumber.slice(0, validators[i].length);

			if(checkPortion == validators[i]){
				return key;
			}
		}
	}

	//if the key hasn't found a match returns "N/A"
	return "N/A";
}