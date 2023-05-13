//* 함수 선언문과 함수 표현식(1) - 원본 코드
{
  console.log(sum(1, 2));
  console.log(multiply(3, 4));

  function sum(a, b) {
    return a + b;
  }

  var multiply = function (a, b) {
    return a * b
  }
}

//* 함수 선언문과 함수 표현식(2) - 호이스팅을 마친 상태
{
  var sum = function sum(a, b) { // 함수 선언문은 전체를 호이스팅한다.
    return a + b;
  }
  var multiply; // 변수는 선언부만 끌어올린다.

  console.log(sum(1, 2));
  console.log(multiply(3, 4));



  multiply = function (a, b) { // 변수의 할당부는 원래 자리에 남겨둔다.
    return a * b
  }
}