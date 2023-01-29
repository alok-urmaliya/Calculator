//configuring the calculator and it's keys 
const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".calculator__keys")

//code to test if the keys are working

// keys.addEventListener("click", e => {
//     if (e.target.matches("button")) {
//         const key = e.target
//         const action = key.dataset.action
//         if (!action) {
//             console.log("numbers key!")
//         }
//         if (
//             action === "add" ||
//             action === "subtract" ||
//             action === "multiply" ||
//             action === "divide"
//         ) {
//             console.log("operation key!")
//         }
//         if (action === "decimal") {
//             console.log("decimal key!")
//         }
//         if (action === "clear") {
//             console.log("clear key!")
//         }
//         if (action === "calculate") {
//             console.log("equals key!")
//         }
//     }
// })

const calculate = (n1, oper, n2) => {
    let result = ''

    if (oper == 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (oper == 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (oper == 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (oper == 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}
const display = calculator.querySelector('.calculator__display')
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        //removing is-depressed class from each key
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        const previousKeyType = calculator.dataset.previousKeyType
        //case1 : number key is pressed
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKeyType = 'number'
        }
        //case 2: decimal key is pressed
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + keyContent
            }
            //checking calculate to switch to a new number if previous action is calculate
            if (previousKeyType == 'operator' || previousKeyType == 'calculate') {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'
        }
        //case 3: clear key is pressed
        if (action === 'clear') {
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }
        //case 4: any operation key is pressed
        if (action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide") {
            //if user presses number > operator > number >operator.
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            if (firstValue && operator && previousKeyType !== 'operator') {
                display.textContent = calculate(firstValue, operator, secondValue)
            }

            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = display.textContent
            calculator.dataset.operator = action
        }
        // case 5: equals key is pressed
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum

            if (firstValue) {
                //added functionality to perform same operation when '=' key is clicked consecutively.
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }

            //backing up the second value
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        }
    }
})
