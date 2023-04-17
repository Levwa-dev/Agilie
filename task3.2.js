const fs = require('fs')

const inputData = JSON.parse(fs.readFileSync('input.json'))
const {task3_2TShirts, task3_2Participants} = inputData

const result = {task3_2: taskThreePointTwo(task3_2TShirts, task3_2Participants)}

fs.writeFileSync('output.json', JSON.stringify(result))

function taskThreePointTwo (tShirts, participants) {
    const tShirtsCopy = [...tShirts]
    const participantsCopy = [...participants]

    const resultList = []

    for(let tShirt of tShirtsCopy) {
        const {size} = tShirt
        const participantsWithCurrentSize = []

        for(let i = 0; i < participantsCopy.length; i++) { // Отримуємо всіх учасників, які обрали поточний розмір.
            if(participantsCopy[i].size.includes(size)) {
                participantsCopy[i].size.length === 1 ? 
                    participantsWithCurrentSize.unshift(participantsCopy[i]) 
                    :  
                    participantsWithCurrentSize.push(participantsCopy[i])
                participantsCopy.splice(i, 1)
                i--
            }
        }
        for(let participantWithtShirt of participantsWithCurrentSize) { // Додаємо учасників до результуючого списку з отриманим розміром.
            if(tShirt.quantity === 0 && participantWithtShirt.size.length === 1) { // Якщо не вистачило футболки, додаємо до результату учасника з поміткою.
                resultList.push({...participantWithtShirt, size, withouttShirt: true})
            }

            if(tShirt.quantity > 0 && participantWithtShirt.size.length === 1) {
                resultList.push({...participantWithtShirt, size, withouttShirt: false})
                tShirt.quantity = tShirt.quantity - 1
            }
                // Якщо обрано дві футболки
            if(tShirt.quantity > 0 && participantWithtShirt.size.length === 2) { // Поточний розмір в наявності, обираємо поточний розмір.
                resultList.push({...participantWithtShirt, size, withouttShirt: false})
                tShirt.quantity = tShirt.quantity - 1
            }

            if(tShirt.quantity === 0 && participantWithtShirt.size.length === 2) { // Футболки поточного розміру закінчились
                const otherSize = participantWithtShirt.size.find(item => item !== size)
                const index = tShirtsCopy.findIndex(item => item.size === otherSize)
                if(tShirtsCopy[index].quantity > 0) { // Перевіряємо кількість футболок іншого розміру, якщо футболки є в наявності, додаємо до результуючого списку.
                    resultList.push({...participantWithtShirt, size:otherSize, withouttShirt: false})
                    tShirtsCopy[index].quantity = tShirtsCopy[index].quantity - 1
                }
                else { 
                    resultList.push({...participantWithtShirt, size, withouttShirt: true})
                }
            }
        }
    }
    return resultList
}