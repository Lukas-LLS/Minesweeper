let isOver = false

function setupBoard() {
    const dimension = 8
    let bombs = 12
    let board = document.getElementById("board")

    for (let i = 0; i < dimension; i++) {
        let row = document.createElement("div")
        row.classList.add("row")

        for (let j = 0; j < dimension; j++) {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            cell.id = `${i}${j}`

            if (bombs > 0 && Math.random() < bombs / (dimension * dimension - i * dimension - j)) {
                cell.classList.add("bomb")
                bombs--
            }

            cell.addEventListener("click", (event) => {
                if (!event.altKey || cell.classList.contains("clicked") || isOver) {
                    return
                }

                if (cell.classList.contains("flag")) {
                    cell.classList.remove("flag")
                    cell.children[0].remove()
                } else {
                    cell.classList.add("flag")
                    let flag = document.createElement("img")
                    flag.src = "assets/flag.png"
                    flag.classList.add("flag-img")
                    cell.appendChild(flag)
                }
            })

            cell.addEventListener("click", (event) => {
                if (event.altKey || cell.classList.contains("clicked") || isOver) {
                    return
                }

                if (cell.classList.contains("flag")) {
                    return
                }

                if (cell.classList.contains("bomb")) {
                    for (let k = 0; k < dimension; k++) {
                        for (let l = 0; l < dimension; l++) {
                            let currentCell = document.getElementById(`${k}${l}`);
                            if (currentCell.classList.contains("bomb")) {
                                currentCell.classList.add("clicked")
                                let bomb = document.createElement("img")
                                bomb.src = "assets/bomb.png"
                                bomb.classList.add("bomb-img")
                                if (currentCell.children.length === 0) {
                                    currentCell.appendChild(bomb)
                                }
                            }
                        }
                    }
                    isOver = true
                    setTimeout(() => alert("You lost!"), 10)
                    return
                }

                let bombs = 0
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        if (i + k < 0 || i + k >= dimension || j + l < 0 || j + l >= dimension) {
                            continue
                        }
                        if (document.getElementById(`${i + k}${j + l}`).classList.contains("bomb")) {
                            bombs++
                        }
                    }
                }
                cell.classList.add("clicked")

                let text = document.createElement("p")
                text.classList.add("text")

                switch (bombs) {
                    case 1:
                        text.classList.add("one")
                        break
                    case 2:
                        text.classList.add("two")
                        break
                    case 3:
                        text.classList.add("three")
                        break
                    case 4:
                        text.classList.add("four")
                        break
                    case 5:
                        text.classList.add("five")
                        break
                    case 6:
                        text.classList.add("six")
                        break
                    case 7:
                        text.classList.add("seven")
                        break
                    case 8:
                        text.classList.add("eight")
                        break
                }

                text.innerText = bombs.toString()

                if (cell.children.length === 0) {
                    cell.appendChild(text)
                }

                let won = true
                for (let k = 0; k < dimension; k++) {
                    for (let l = 0; l < dimension; l++) {
                        if (!document.getElementById(`${k}${l}`).classList.contains("clicked") && !document.getElementById(`${k}${l}`).classList.contains("bomb")) {
                            won = false
                        }
                    }
                }

                if (won) {
                    setTimeout(() => alert("You won!"), 10)
                    isOver = true
                }

                if (bombs === 0) {
                    for (let k = -1; k <= 1; k++) {
                        for (let l = -1; l <= 1; l++) {
                            if (i + k < 0 || i + k >= dimension || j + l < 0 || j + l >= dimension) {
                                continue
                            }
                            document.getElementById(`${i + k}${j + l}`).click()
                        }
                    }
                }
            })

            row.appendChild(cell)
        }

        board.appendChild(row)
    }
}
