window.onload = init;

function init(){
	clickListener();
	// $('#switchRowA label div').each(function(){$(this).attr("id",)});
}

function clickListener(){
	// $('.switchRow').on('click', 'label div', getSwitchValues);
	$('#projectBox').on('click', getSwitchValues);
}

function getSwitchValues(){
	let A = {},
		B = {};
	let A_ID, B_ID;
	for (let v=0; v<8; v++){
		A_ID = 'A'+ v; B_ID = 'B'+ v;
		A[v] = document.getElementById(A_ID).checked;
		B[v] = document.getElementById(B_ID).checked;
	}
	addingMachine(A,B);
}

function illuminateIndicators(results, finalCarryIn){
	let ind_ID; 
	for (let x=0; x<8; x++){
		ind_ID = 'ind'+ x;
		if (results[x]){
			document.getElementById(ind_ID).className = "indicator lightOn";
		}
		else {
			document.getElementById(ind_ID).className = "indicator";
		}
	}
	if (finalCarryIn){
		document.getElementById('ind8').className = "indicator lightOn";
	}
	else {
		document.getElementById('ind8').className = "indicator";
	}
}

function addingMachine(A,B){
	let carryIn = false; //The initial carryIn = false or 0 bit
	let results = {};
	let eachFullAdder;
	for (let x=0; x < 8; x++){
		eachFullAdder = fullAdder(carryIn,A[x],B[x]);
		results[x] = eachFullAdder.sumOut;
		carryIn = eachFullAdder.carryOut;
	}
	// console.log(results);
	illuminateIndicators(results, carryIn);
}

function fullAdder(carryIn,A,B){//fullAdder constructed using two halfAdders; the input for the first is A,B; input for the second is carryIn and sumOut of first half adder
	let firstHalfAdder = halfAdder(A,B);
	let secondHalfAdder = halfAdder(carryIn, firstHalfAdder.sumOut);
	let carryOut = OR_Gate(firstHalfAdder.carryOut,secondHalfAdder.carryOut);
	// console.table({A: A, B: B, firstHalfAdder: firstHalfAdder, secondHalfAdder: secondHalfAdder, carryOut: carryOut});
	return {sumOut: secondHalfAdder.sumOut, carryOut: carryOut};
}

function halfAdder(A, B){//halfAdder constructed using XOR gate and AND gate
	let sumOut = XOR_Gate(A,B);
	let carryOut = AND_Gate(A,B);
	return {sumOut: sumOut, carryOut: carryOut};
}

function XOR_Gate(A,B){ //XOR constructed using OR gate, NAND gate, and AND gate
	let orResult = OR_Gate(A,B);
	let nandResult = NAND_Gate (A,B);
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