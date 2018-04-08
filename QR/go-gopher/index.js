'use strict'
process.stdin.resume();
process.stdin.setEncoding('utf8');

const SIZE = 1000;
let input = '';
let T;
let A;
let emptyMatrix = true;
let matrix = Array(SIZE).fill().map(()=>Array(SIZE).fill(0));
let datas = 0;
let currentCase = 0;
let x, y;
let turn = 0;

process.stdin.on('data', (data) => {
  
  if(data === '-1 -1') {
    console.error('Test failed');
    process.exit(1);
  }

  if(data.startsWith('0 0')) {
    const parts = data.split('\n');
    if (currentCase < T) {
      currentCase ++;
      // next case
      A = undefined;
      matrix = Array(SIZE).fill().map(()=>Array(SIZE).fill(0));
      emptyMatrix = true;
      
      if(currentCase === T) {
        process.exit(0);
      }
    }
  }

  if(T === undefined) {
    const parts = data.split('\n');
    T = parseInt(parts[0]);
    A = parts[1];
  }

  processCase(data);

  // turn ++;
  // if(turn === 100){
  //   process.exit();
  // }
  // printMatrix();
  
});


const processCase = (data) => {
  if(A === undefined) {
    A = parseInt(data);
  }else {
    const parts = data.split(' ');
    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);
    matrix[x-1][y-1] = 1;
  }
  const coords = getCoords();
  console.log(coords);
}

const getCoords = () => {
  if(emptyMatrix) {
    x = 1;
    y = 1;
    emptyMatrix = false;
  } else {
    if(currentSquareFilled()){

      if(x < A - 2) {

        x += 1; // row filled

      } else { // row not filled

        x = 1;
        y += 1;
      }
    }
  }
  return `${x+1} ${y+1}`;
}

const center = (size) => (
  Math.ceil(size/2) - 1
)

const currentSquareFilled = () => { 
  return matrix[x-1][y-1] === 1 && matrix[x][y-1] === 1 && matrix[x+1][y-1] === 1 &&
    matrix[x-1][y] === 1 && matrix[x][y] === 1 && matrix[x+1][y] === 1 &&
    matrix[x-1][y+1] === 1 && matrix[x][y+1] === 1 && matrix[x+1][y+1] === 1;
}

const printMatrix = () => {
  let row = '';
  for(var i = 0; i < 5; i++) {
    row += ' ' + matrix[i][0];
  }
  console.error(row);
  row = '';
  for(var i = 0; i < 5; i++) {
    row += ' ' + matrix[i][1];
  }
  console.error(row);
  row = '';
  for(var i = 0; i < 5; i++) {
    row += ' ' + matrix[i][2];
  }
  console.error(row);
  row = '';
  for(var i = 0; i < 5; i++) {
    row += ' ' + matrix[i][3];
  }
  console.error(row);
  row = '';
  for(var i = 0; i < 5; i++) {
    row += ' ' + matrix[i][4];
  }
  console.error(row);
}