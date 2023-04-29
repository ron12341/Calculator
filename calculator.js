"use strict"

class Calculator {
    constructor(prevOperandOutput, currOperandOutput) {
        this.prevOperandOutput = prevOperandOutput
        this.currOperandOutput = currOperandOutput
        this.clear()
    }

    clear() {
        this.prevOperand = ''
        this.currOperand = ''
        this.result = 0
        this.operation = undefined
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number == '.' && this.currOperand.includes('.'))
            return

        this.currOperand = this.currOperand.toString() + number.toString()
    }

    //set the operation and update prevOperand
    chooseOperation(operation) {
        if (this.currOperand == '')
            return

        //we can't compute if prevOperand is empty
        if (this.prevOperand == '')
            this.result = this.currOperand
        else
            this.compute()
        
        this.operation = operation
        this.prevOperand = this.prevOperand + ' ' + this.currOperand + ' ' + operation
        this.currOperand = ''
    }

    percent() {
        this.currOperand = parseFloat(this.currOperand) / 100
    }

    compute() {
        let computation
        const currResult = parseFloat(this.result)
        const curr = parseFloat(this.currOperand)

        if (isNaN(currResult) || isNaN(curr))
            return
        
        switch(this.operation) {
            case '+':
                computation = currResult + curr
                break
            case '-':
                computation = currResult - curr
                break
            case 'x':
                computation = currResult * curr
                break
            case '÷':
                computation = currResult / curr
                break
            default:
                return ''
        }

        this.result = computation
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay

        if(isNaN(integerDigits))
            integerDisplay = '0'
        else
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        
        if(decimalDigits != null)
            return integerDisplay + '.' + decimalDigits
        else
            return integerDisplay
    }
    
    //update the output
    updateDisplay() {
        currOperandOutput.innerText = this.currOperand
        prevOperandOutput.innerText = this.prevOperand
    }

    displayResult() {
        this.currOperand = this.result
        this.prevOperand = ''
        this.operation = undefined
        this.updateDisplay()
    }
}


//
// BUTTONS
//
const numberButtons = Array.from(document.querySelectorAll('.number-btn'));
const operationButtons = Array.from(document.querySelectorAll('.operation-btn'));
const equalsButton = document.querySelector('.equals-btn');
const clearButton = document.querySelector('.clear-btn');
const deleteButton = document.querySelector('.delete-btn');
const percentButton = document.querySelector('.percent-btn');
const prevOperandOutput = document.querySelector('.prev-operand');
const currOperandOutput = document.querySelector('.curr-operand');


const calculator = new Calculator( prevOperandOutput, currOperandOutput )


//
// Functions that will perform the command
//

let processNumber = (value) => {
    calculator.appendNumber(value);
        calculator.updateDisplay();
}

let processOperation = (operation) => {
    calculator.chooseOperation(operation);
        calculator.updateDisplay();
}

let processClear = () => {
    calculator.clear();
    calculator.updateDisplay();
}

let processEquals = () => {
    calculator.compute();
    calculator.displayResult();
}

let processDelete = () => {
    calculator.delete();
    calculator.updateDisplay();
}

let processPercent = () => {
    calculator.percent();
    calculator.updateDisplay();
}

//
//  ADD EVENT LISTENER "CLICK"
//
numberButtons.forEach( button => {
    button.addEventListener( 'click', () => {
        processNumber(button.innerText);
    })
})

operationButtons.forEach( button => {
    button.addEventListener( 'click', () => {
        processOperation(button.innerText);
    })
})

clearButton.addEventListener( 'click', () => {
    processClear();
})

equalsButton.addEventListener( 'click', () => {
    processEquals();
})

deleteButton.addEventListener( 'click', () => {
    processDelete();
})

percentButton.addEventListener( 'click', () => {
    processPercent();
})


//
//  ADD EVENT LISTENER "KEYUP"
//
function keyControl(e) {
    if(Number.isInteger( parseInt(e.key) ) || e.key === '.') {
        processNumber(e.key);

    } else if(e.key === '+' || e.key === '-') {
        processOperation(e.key);

    } else if(e.key === '/' || e.key === '÷') {
        processOperation("÷");

    } else if(e.key === '*' || e.key === 'x') {
        processOperation("x");

    } else if(e.keyCode === 8) {
        processDelete();

    } else if(e.key === '%') {
        processPercent();

    } else if(e.key === '=' || e.keyCode == 13) {
        processEquals();

    } else if(e.key === 'c') {
        processClear();
    }
}

document.addEventListener('keyup', keyControl);

