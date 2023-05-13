//* 실행 컨텍스트와 콜 스택

var a = 1;
function outer() {
  function inner() {
    console.log(a); // undefined
    var a = 3;
  }
  inner();
  console.log(a); // 1
}

outer();
console.log(a); // 1