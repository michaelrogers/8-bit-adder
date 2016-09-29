window.onload = init;

function init(){
	clickListener();
	// $('#switchRowA').each()
	// $('#switchRowA label div').each(function(){
	// 	$(this).attr("id",)
	// })
}

function clickListener(){
	$('.switchRow').on('mouseup', 'label div', function() {
		getSwitchValues();
	});
	$('#projectBox').on('mouseup', function() {getSwitchValues();});
}

function getSwitchValues(){
	var A = {};
	var B = {};
	for (let v=0; v<8; v++){
		var A_ID = 'A'+ v;
		var B_ID = 'B'+ v;
		A[v] = document.getElementById(A_ID).checked;
		B[v] = document.getElementById(B_ID).checked;

	}
	addingMachine(A,B);
	
}

function illuminateIndicators(results, finalCarryIn){
	for (let x=0; x< 8; x++){
		var i_ID = 'i'+ x;
		if (results[x]){
			document.getElementById(i_ID).className = "indicator lightOn";
		}
		else {
			document.getElementById(i_ID).className = "indicator";
		}
	}
	if (finalCarryIn){
		document.getElementById('i8').className = "indicator lightOn";
	}
	else {
		document.getElementById('i8').className = "indicator";
	}
}

function addingMachine(A,B){
	var carryIn = false; //The initial carryIn = false or 0 bit
	var results = {};
	for (let x=0; x < 8; x++){
		var eachFullAdder = fullAdder(carryIn,A[x],B[x]);
		results[x] = eachFullAdder.sumOut;
		carryIn = eachFullAdder.carryOut;
	}
	console.log(results);
	illuminateIndicators(results, carryIn);
}

function fullAdder(carryIn,A,B){//fullAdder constructed using two halfAdders; the input for the first is A,B; input for the second is carryIn and sumOut of first half adder
	var firstHalfAdder = halfAdder(A,B);
	var secondHalfAdder = halfAdder(carryIn, firstHalfAdder.sumOut);
	var carryOut = OR_Gate(firstHalfAdder.carryOut,secondHalfAdder.carryOut);
	console.table({A: A, B: B, firstHalfAdder: firstHalfAdder, secondHalfAdder: secondHalfAdder, carryOut: carryOut});
	return {sumOut: secondHalfAdder.sumOut, carryOut: carryOut};
}

function halfAdder(A, B){//halfAdder constructed using XOR gate and AND gate
	var sumOut = XOR_Gate(A,B);
	var carryOut = AND_Gate(A,B);
	return {sumOut: sumOut, carryOut: carryOut};

}

function XOR_Gate(A,B){ //XOR constructed using OR gate, NAND gate, and AND gate
	var orResult = OR_Gate(A,B);
	var nandResult = NAND_Gate (A,B);
	return AND_Gate(orResult,nandResult);
}

function AND_Gate(A,B){
	return A && B;
}

function OR_Gate(A,B){
	return A || B;
}

function NAND_Gate (A,B){
	return !(A && B);
}