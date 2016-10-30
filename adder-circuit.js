document.addEventListener('DOMContentLoaded', () => {
	
	const AND_Gate = (A, B) => A && B;
	const OR_Gate = (A, B) => A || B;
	const NAND_Gate = (A, B) => !(A && B);
	const XOR_Gate = (A, B) =>  AND_Gate(OR_Gate(A, B), NAND_Gate (A, B));
	
	const halfAdder = (A, B) => {
		//halfAdder constructed using XOR gate and AND gate
		const sumOut = XOR_Gate(A, B);
		const carryOut = AND_Gate(A, B);
		return {sumOut, carryOut};
	}

	const fullAdder = (carryIn, A, B) => {
		//fullAdder constructed using two halfAdders;
		//the input for the first is A, B; 
		//input for the second is carryIn and sumOut of first half adder
		const firstHalfAdder = halfAdder(A, B);
		const secondHalfAdder = halfAdder(carryIn, firstHalfAdder.sumOut);
		const carryOut = OR_Gate(firstHalfAdder.carryOut, secondHalfAdder.carryOut);
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

	    // NOTE: Length of firstRow/secondRow should be of identical length
		A.map((_, i) => {
			eachFullAdder = fullAdder(carryIn, A[i], B[i]);
			results[i] = eachFullAdder.sumOut;
			carryIn = eachFullAdder.carryOut;
		});

		illuminateIndicators(results, carryIn);
	}

	const illuminateIndicators = (results, finalCarryIn) => {
		let eachIndicatorLight;
		const finalIndicatorLight = document.querySelector('.indicator'); //Return the left most indicator light
		
		results.map((_, i) => {
			eachIndicatorLight = document.getElementById('ind'+ i);
			return results[i] ?
			 		eachIndicatorLight.className = "indicator lightOn" :
			 		eachIndicatorLight.className = "indicator"; 
		});

		return finalCarryIn ?
				finalIndicatorLight.className = "indicator lightOn" :
				finalIndicatorLight.className = "indicator";
	}

	const getSwitchValues = () => {
		let A = []; let B = [];
		const switchesA = [].slice.call(document.querySelectorAll('#switchRowA input')).reverse();
		const switchesB = [].slice.call(document.querySelectorAll('#switchRowB input')).reverse();
		
		if (switchesA.length !== switchesB.length) return false;
		switchesA.map((_, i)  => {
			A.push(switchesA[i].checked);
			B.push(switchesB[i].checked);
		});
			
		addingMachine(A, B);
		convertValueToDecimal(A, B);
	}

	const convertValueToDecimal = (A, B) => {
		//Convert boolean arrays into binary integer to make the conversion back to base 10
		const decimalA = parseInt(A.map(Number).reverse().join(''), 2);
		const decimalB = parseInt(B.map(Number).reverse().join(''), 2);
		const decimalTotal = decimalA + decimalB;
		
		console.log(decimalA 
					+ " + " + decimalB 
					+ " = " + decimalTotal 
					+ " | Logic " 
					+ (decimalA + decimalB == decimalTotal)
		);
	}
	
	document.getElementById('projectBox').addEventListener('change', getSwitchValues);

}); // DOMcontentloaded

