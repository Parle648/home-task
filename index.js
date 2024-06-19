const fs = require('fs');

let max = 0,
  min = 0,
  amount = 0,
  median = 0;

const plusArrayBuffer = [[]],
  minusArrayBuffer = [[]]

fs.readFile('./10m.txt', (err, data) => {
  const numbers = data.toString().split('\n');
  numbers.forEach((number, index) => {
    // min and max
    if (index === 0) {
      min = +number
    }
    if (+number > max) {
      max = + number
    }
    if (+number < min) {
      min = +number
    }

    // average
    amount += +number
    
    // order
    if (+numbers[index + 1] - +number > 0) {
      plusArrayBuffer[plusArrayBuffer.length - 1].push(+number);

      const lastArr = minusArrayBuffer[minusArrayBuffer.length - 1]
      if (+number - lastArr[lastArr.length - 1] < 0) {
        minusArrayBuffer[minusArrayBuffer.length - 1].push(+number);
        minusArrayBuffer.push([])
      }
    } 

    if (+numbers[index + 1] - +number < 0) {
      const lastArr = plusArrayBuffer[plusArrayBuffer.length - 1]
      if (+number - lastArr[lastArr.length - 1] > 0) {
        plusArrayBuffer[plusArrayBuffer.length - 1].push(+number);
        minusArrayBuffer[minusArrayBuffer.length - 1].push(+number);
        plusArrayBuffer.push([])
      } else {
        minusArrayBuffer[minusArrayBuffer.length - 1].push(+number)
      }
    }

  })

  // find the biggest orders
  let leng = 0;

  const result = (plusArrayBuffer.reduce((res, arr) => {
    if (arr.length > leng) {
      leng = arr.length
      return res = JSON.stringify(arr)
    }
    return res += ''
  }, ''));

  let leng2 = 0;

  const result2 = (minusArrayBuffer.reduce((res, arr) => {
    if (arr.length > leng2) {
      leng2 = arr.length
      return res = JSON.stringify(arr)
    }
    return res += ''
  }, ''));

  // median
  if(numbers.length % 2 !== 0) {
    median = +numbers[Math.floor(numbers.length / 2)];
  } else {
    median = (+numbers[numbers.length / 2] + +numbers[numbers.length / 2 - 1]) / 2;
  };
  
  console.log('\n from low to biggest', result, '\n from biggest to low', result2);
  console.log(`\n max = ${max}\n`, `min = ${min}\n`, `median = ${median}\n`,`average = ${amount / numbers.length}\n`);
})