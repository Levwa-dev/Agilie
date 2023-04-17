const fs = require('fs')

const inputData = JSON.parse(fs.readFileSync('input.json'))
const {task4Scene:{n, m}, task4Actors} = inputData 

const result = {task4: taskFour(n, m, task4Actors)}

fs.writeFileSync('output.json', JSON.stringify(result))



function taskFour (n, m, actors) {
    if(n <= 0  || m <= 0) {
        return "Incorrect scene size!"
    }
    for(let {position} of actors) {
        if(position.n > n || position.n < 0 || position.m > m || position.m < 0){
            return "The position of the actor outside the size of the scene!"
        }
    }
    function setActors(scene, actors) {
        for(let i = 0; i < actors.length; i++){
            const { position: { n, m } } = actors[i]
            scene[n][m] = actors[i].name
        }
    }

    function createScene (n, m) {
        const scene = []
        for(let i = 0; i <= n; i++){
            const inner = []
            for(let j = 0; j <= m; j++){
                inner.push(j)
            }
            scene.push(inner)
        }
        setActors(scene, actors)
        return scene
    }
    
    function findAvaliablePosition ({n, m}, name, nextPosition, scene, positions) {
        const position = nextPosition(n, m)
        // Вихід з рекурсії, якщо вийшли за межі сцени, або на клітинці знаходиться актор
        if(scene[position.n] === undefined || scene[position.n][position.m] === undefined || typeof(scene[position.n][position.m]) === 'string') {
            return
        }
        positions.push({searchlightPosition:{n:position.n, m: position.m}, lightDirection: name})

        return findAvaliablePosition(position, name, nextPosition, scene, positions)
    }

    function getPositions (scene, actors) {
        const positions = []
        // Направлення пошуку 
        const positionUp = (n, m) => ({n: n - 1, m})
        const positionDown = (n, m) => ({n: n + 1, m})
        const positionRight = (n, m) => ({n, m: m + 1})
        const positionLeft = (n, m) => ({n, m: m - 1})

        for(let i = 0; i < actors.length; i++) {
            const {position, name} = actors[i]
            findAvaliablePosition(position, name, positionUp, scene, positions)
            findAvaliablePosition(position, name, positionDown, scene, positions)
            findAvaliablePosition(position, name, positionRight, scene, positions)
            findAvaliablePosition(position, name, positionLeft, scene, positions)
        }
        return positions
    }

    const scene = createScene(n,m)

    return getPositions(scene, actors)
}