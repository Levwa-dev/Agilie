const fs = require('fs')

const inputData = JSON.parse(fs.readFileSync('input.json'))
const {task2} = inputData

const result = {task2: taskTwo(task2)}

fs.writeFileSync('output.json', JSON.stringify(result))

function taskTwo (arr) {
    if(arr.lenght <= 0) {
        return -1
    }
    let slow = arr[0]
    let fast = arr[0]

    do {
        slow = arr[slow]
        fast = arr[arr[fast]]
    } while (fast !== slow);
   
    slow = arr[0]

    while(fast !== slow) {
        slow = arr[slow]
        fast = arr[fast]
    }
    return slow
}
