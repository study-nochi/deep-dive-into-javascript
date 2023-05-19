//* 예제 4-3 콜백 함수 예제(2-1) Array.prototype.map
var newArr = [10, 20, 30].map(function (currentValue, index) {
  console.log(currentValue, index);
  return currentValue + 5;
})
console.log(newArr);
// 10 0
// 20 1
// 30 2
// [15, 25, 35]


//* 예제 4-4 콜백 함수 예제 (2-2) Array.prototype.map - 인자의 순서를 임의로 바꾸어 사용한 경우
var newArr2 = [10, 20, 30].map(function (index, currentValue) {
  console.log(index, currentValue);
  return currentValue + 5;
})
console.log(newArr2)

// 10 0
// 20 1
// 30 2
// [5, 6, 7]

//* 예제 4-5 콜백 함수 예제(2-3) Array.prototype.map - 구현
Array.prototype.map = function (callback, thisArg) {
  var mappedArr = [];
  for (var i = 0; i < this.length; i++) {
    var mappedValue = callback.call(thisArg || window, this[i], i, this);
    mappedArr[i] = mappedValue
  }
  return mappedArr;
}

