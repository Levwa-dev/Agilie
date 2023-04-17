const fs = require('fs')

const inputData = JSON.parse(fs.readFileSync('input.json'))
const {task1:{firstNumber, secondNumber}} = inputData

const result = {task1: taskOne(firstNumber, secondNumber)}

fs.writeFileSync('output.json', JSON.stringify(result))

function taskOne (numberOne, numberTwo) {
    
    const lastDigit = String(numberTwo).slice(-1)

    if(numberTwo % 2 !== 0 && lastDigit !== '1') {
        return 'Error'
    }

    let number
    const possibleNumbers = []

    if(lastDigit === '1') {
        number = (numberTwo - 1) / 10
        possibleNumbers.push(number)
    }

    while(number % 2 === 0) {
        number = number / 2
        possibleNumbers.push(number)
    }

    if(possibleNumbers.indexOf(numberOne) !== -1) {
        return true
    }

    return false
}