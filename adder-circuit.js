document.addEventListener('DOMContentLoaded', () => {
	
	const AND_Gate = (A, B) => {return A && B;}

	const OR_Gate = (A, B) => {return A || B;}

	const NAND_Gate = (A, B) => {return !(A && B);}

	const XOR_Gate = (A, B) => { //XOR constructed using OR gate, NAND gate, and AND gate
		let orResult = OR_Gate(A,B);
		let nandResult = NAND_Gate (A,B);
		return AND_Gate(orResult,nandResult);
	}

	const halfAdder = (A, B) => {
		//halfAdder constructed using XOR gate and AND gate
		let sumOut = XOR_Gate(A,B);
		let carryOut = AND_Gate(A,B);
		return {sumOut: sumOut, carryOut: carryOut};
	}

	const fullAdder = (carryIn, A, B) => {
		//fullAdder constructed using two halfAdders;
		//the input for the first is A,B; 
		//input for the second is carryIn and sumOut of first half adder
		let firstHalfAdder = halfAdder(A,B);
		let secondHalfAdder = halfAdder(carryIn, firstHalfAdder.sumOut);
		let carryOut = OR_Gate(firstHalfAdder.carryOut,secondHalfAdder.carryOut);
		// console.table({A, B, firstHalfAdder, secondHalfAdder, carryOut});
		return {
			sumOut: secondHalfAdder.sumOut,
			carryOut: carryOut
		};
	}

	const addingMachine = (A, B) => {
		let carryIn = false; //The initial carryIn = false or 0 bit
		let results = [];
		let eachFullAdder;
		for (let x = 0; x < A.length; x++){
			eachFullAdder = fullAdder(carryIn, A[x], B[x]);
			results[x] = eachFullAdder.sumOut;
			carryIn = eachFullAdder.carryOut;
		}
		illuminateIndicators(results, carryIn);
	}

	const illuminateIndicators = (results, finalCarryIn) => {
		let eachIndicator;
		let ind8 = document.getElementById('ind8');
		for (let x=0; x<8; x++){
			eachIndicator = document.getElementById('ind'+ x);
			results[x] ? eachIndicator.className = "indicator lightOn" : eachIndicator.className = "indicator"; 
					}
		finalCarryIn ? ind8.className = "indicator lightOn" : ind8.className = "indicator";
		
	}

	const getSwitchValues = () => {
		let A = [];
		let B = [];
		const switches = [].slice.call(document.querySelectorAll('#switchRowA input'));
		for (let v = 0; v < switches.length; v++){
			A[v] = document.getElementById('A'+ v).checked;
			B[v] = document.getElementById('B'+ v).checked;
		}
		addingMachine(A, B);
	}
	const clickListener = () => {
		document.getElementById('projectBox').addEventListener('change', getSwitchValues);
	}

	const init = () => {
		clickListener();
		// $('#switchRowA label div').each(function(){$(this).attr("id",)});
	}

	init();

});
 // DOMcontentloaded

