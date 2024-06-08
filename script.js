let solutions = new Set();
const checkBtn = document.querySelector('#check');
const resetBtn = document.querySelector('#reset');
const spans = document.querySelectorAll('#board>span');

for (let span of spans) {
  span.addEventListener('click', () => {
    span.classList.toggle('filled');
  });
}

const row1 = Array.from(document.querySelectorAll('[class^=c0]'));
const row2 = Array.from(document.querySelectorAll('[class^=c1]'));
const row3 = Array.from(document.querySelectorAll('[class^=c2]'));
const row4 = Array.from(document.querySelectorAll('[class^=c3]'));
const row5 = Array.from(document.querySelectorAll('[class^=c4]'));
const row6 = Array.from(document.querySelectorAll('[class^=c5]'));
const row7 = Array.from(document.querySelectorAll('[class^=c6]'));
const row8 = Array.from(document.querySelectorAll('[class^=c7]'));

resetBtn.addEventListener('click', () => {
  for (let span of spans) {
    span.classList.remove('filled');
  }
});

checkBtn.addEventListener('click', () => {
  checkAnswer();
});

function checkAnswer() {
  let row_1 = row1.map(item => +item.classList.contains('filled'));
  let row_2 = row2.map(item => +item.classList.contains('filled'));
  let row_3 = row3.map(item => +item.classList.contains('filled'));
  let row_4 = row4.map(item => +item.classList.contains('filled'));
  let row_5 = row5.map(item => +item.classList.contains('filled'));
  let row_6 = row6.map(item => +item.classList.contains('filled'));
  let row_7 = row7.map(item => +item.classList.contains('filled'));
  let row_8 = row8.map(item => +item.classList.contains('filled'));
  let matrix = [row_1, row_2, row_3, row_4, row_5, row_6, row_7, row_8];

  let number = 0;
  let counter = 0;
  let filledArray = [];
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      if (matrix[i][j] == 1) {
        counter++;
        filledArray.push([i, j]);
      }
    }
  }

  for (let pair of filledArray) {
    let rsum = 0;
    let csum = 0;
    let dsum = 0;
    let a = pair[0];
    let b = pair[1];
    let r = sameRow(a, b);
    let c = sameColumn(a, b);
    let d = sameDiag(a, b);
    for (let [x, y] of r) {
      rsum += matrix[x][y];
    }
    for (let [x, y] of c) {
      csum += matrix[x][y];
    }
    for (let [x, y] of d) {
      dsum += matrix[x][y];
    }
    if (rsum > 1 || csum > 1 || dsum > 1) {
      number++;
    }

  }

  if (number == 0 && counter == 8) {
    alert('yes');
    solutions.add(filledArray.join(','));
    document.querySelector('#sln').innerHTML = solutions.size;
  }
}

function sameRow(a, b) {
  let row = [];
  for (let i = 0; i <= 7; i++) {
    row.push([a, i]);
  }
  return row;
}

function sameColumn(a, b) {
  let column = [];
  for (let i = 0; i <= 7; i++) {
    column.push([i, b]);
  }
  return column;
}

function sameDiag(a, b) {
  let diag = [];
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      if (Math.abs(a - i) == Math.abs(b - j)) {
        diag.push([i, j]);
      }
    }
  }
  return diag;
}