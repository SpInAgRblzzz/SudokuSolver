const fillButton = document.querySelector('.fill-matrix');
const resetButton = document.querySelector('.reset-matrix');
const modeButton = document.querySelector('.mode-switcher');

let stepMode = false;
let mult = 0;
const time = 250;
//функция получения введенной матрицы
function getMatrix() {
    let matrix = [];
    for (let row = 0; row < 9; row++) {
        let matrixRow = [];
        for (let column = 0; column < 9; column++) {
            const cell = document.querySelector(`.row-${row}.column-${column}`);
            const value = +cell.value;
            matrixRow.push(value);
            if (value) {
                cell.classList.add('user-filled');
            }
        }
        matrix.push(matrixRow);
    }
    return matrix;
}

//копирование сложной матрицы
function copyMatrix(matrix) {
    let newMatrix = [];
    for (let row = 0; row < 9; row++) {
        let matrixRow = [];
        for (let column = 0; column < 9; column++) {
            matrixRow.push(matrix[row][column]);
        }
        newMatrix.push(matrixRow);
    }
    return newMatrix;
}

//заполнение пустых ячеек
function fillEmpty(matrix) {
    let filledMatrix = copyMatrix(matrix);
    let emptyCells = 0;
    //перебор рядов
    for (let row = 0; row < 9; row++) {
        //перебор ряда
        for (let column = 0; column < 9; column++) {
            const item = filledMatrix[row][column];
            let rule = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            //проверка ряда
            for (let checkColumn = 0; checkColumn < 9; checkColumn++) {
                if (checkColumn !== column) {
                    const checkPosition = filledMatrix[row][checkColumn];
                    if (!Array.isArray(item) && item !== 0 && item === checkPosition) {
                        //alert('!!!ACHTUNG!!!');
                        return true;
                    };
                    if (rule.includes(checkPosition)) {
                        rule.splice(rule.indexOf(checkPosition), 1);
                    }
                }
            }

            //проверка колонки
            for (let checkRow = 0; checkRow < 9; checkRow++) {
                if (checkRow !== row) {
                    const checkPosition = filledMatrix[checkRow][column];
                    if (!Array.isArray(item) && item !== 0 && item === checkPosition) {
                        //alert('!!!ACHTUNG!!!');
                        return true;
                    };
                    if (rule.includes(checkPosition)) {
                        rule.splice(rule.indexOf(checkPosition), 1);
                    }
                }
            }

            //стартовые значения перебора блока
            let startBlockRow;
            if (row >= 0 && row <= 2) startBlockRow = 0;
            if (row >= 3 && row <= 5) startBlockRow = 3;
            if (row >= 6 && row <= 8) startBlockRow = 6;

            let startBlockColumn;
            if (column >= 0 && column <= 2) startBlockColumn = 0;
            if (column >= 3 && column <= 5) startBlockColumn = 3;
            if (column >= 6 && column <= 8) startBlockColumn = 6;

            //перебор блока
            for (let blockRow = startBlockRow; blockRow < startBlockRow + 3; blockRow++) {
                for (let blockColumn = startBlockColumn; blockColumn < startBlockColumn + 3; blockColumn++) {
                    if (blockRow !== row && blockColumn !== column) {
                        const checkPosition = filledMatrix[blockRow][blockColumn];
                        if (!Array.isArray(item) && item !== 0 && item === checkPosition) {
                            //alert('!!!ACHTUNG!!!');
                            return true;
                        };
                        if (rule.includes(checkPosition)) {
                            rule.splice(rule.indexOf(checkPosition), 1);
                        }
                    }
                }
            }

            //заполнение ячейки
            if (!Array.isArray(item) && item !== 0) {} else
                /*if (rule.length === 1) {
                    filledMatrix[row][column] = rule[0];

                    setTimeout((row, column, item) => {
                        const cell = document.querySelector(`.row-${row}.column-${column}`);
                        cell.value = item;
                        cell.classList.add('wow')
                    }, mult * time, row, column, rule[0]);
                    mult++;

                    return fillEmpty(filledMatrix);
                } else*/
                if (rule.length > 0) {
                    filledMatrix[row][column] = rule;
                    emptyCells++;
                } else
            if (rule.length === 0) {
                return true;
            }
        }
    }
    if (emptyCells) {
        return fillAttempt(filledMatrix);
    }
    return filledMatrix;
}


//подстановка значения
function fillAttempt(matrix) {
    //debugger
    const attemptMatrix = copyMatrix(matrix);
    //поиск пустого
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            const item = attemptMatrix[row][column];
            if (Array.isArray(item)) {
                for (let i = 0, len = item.length; i < len; i++) {
                    attemptMatrix[row][column] = item[i];

                    if (stepMode) {
                        setTimeout(fillCell, mult * time, row, column, item[i]);
                        mult++;
                    } else {
                        fillCell(row, column, item[i]);
                    }


                    const attemptResult = fillEmpty(attemptMatrix);
                    if (!Array.isArray(attemptResult)) {
                        continue
                    }
                    return attemptResult;
                }

                if (stepMode) {
                    setTimeout(clearCell, mult * time, row, column);
                    mult++;
                }

                return true;
            }
        }
    }
}

//решение судоку
function solveSudoku() {
    const inputMatrix = getMatrix();
    const filledMatrix = fillEmpty(inputMatrix);
    /*for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            document.querySelector(`.row-${row}.column-${column}`).value = filledMatrix[row][column];
        }
    }*/
    mult = 0;
}

//сброс матрицы
function resetMatrix() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell) {
        cell.value = '';
        cell.classList.remove('user-filled');
    });
}

function fillCell(row, column, item) {
    const cell = document.querySelector(`.row-${row}.column-${column}`);
    cell.value = item;
}

function clearCell(row, column) {
    const cell = document.querySelector(`.row-${row}.column-${column}`);
    cell.value = '';
}

function switchMode() {
    modeButton.classList.toggle('disabled');
    stepMode = !stepMode;
    console.log(stepMode)
}

fillButton.addEventListener('click', solveSudoku);
resetButton.addEventListener('click', resetMatrix)
modeButton.addEventListener('click', switchMode)
