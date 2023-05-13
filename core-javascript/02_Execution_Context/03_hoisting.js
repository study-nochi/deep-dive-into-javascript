//* 2-5 함수 선언의 호이스팅(1) - 원본 코드
{
  function a() {
    console.log(b);
    var b = 'bbb';
    console.log(b);
    function b() { }
    console.log(b);
  }
  a();
}

//* 2-6 함수 선언의 호이스팅(2) - 호이스팅을 마친 상태
{
  function a() {
    var b; // 수집 대상 1. 변수는 선언부만 끌어올린다.
    function b() { } // 수집 대상 2. 함수 선언은 전체를 끌어올린다.

    console.log(b); // (1)
    var b = 'bbb'; // 변수의 할당부는 원래 자리에 남겨둔다.
    console.log(b); // (2)
    console.log(b); // (3)
  }
  a();
}

//* 2-7 함수 선언의 호이스팅(3) - 함수 선언문을 함수 표현식으로 바꾼 코드
{
  function a() {
    var b;
    var b = function b() { }

    console.log(b); // [Function: b]
    var b = 'bbb';
    console.log(b); // bbb
    console.log(b); // bbb
  }
  a();
}