const fillButton = document.querySelector('.fill-matrix');
const resetButton = document.querySelector('.reset-matrix');
const switchMode = document.querySelector('.mode-switcher');

function getMatrix(){
    let matrix = [];
    for(let row = 0; row < 9; row++){
        let matrixRow = [];
        for(let column = 0; column < 9; column++){
            matrixRow.push(+document.querySelector(`.row-${row}.column-${column}`).value);
        }
        matrix.push(matrixRow);
    }    
    return matrix;
}

    