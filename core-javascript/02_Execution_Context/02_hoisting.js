//* 2-2 매개 변수와 변수에 대한 호이스팅(1) - 원본 코드
{
  function a(x) {
    console.log(x); 
    var x;
    console.log(x); 
    var x = 2;
    console.log(x) 
  }
  a(1);
}

//* 2-3 매개 수와 변수에 대한 호이스팅(1) - 매개변수를 변수 선언/할당과 같다고 간주해서 변환한 상태.
{
  function a(x) {
    var x = 1; // 수집 대상1(매개 변수 선언)
    console.log(x); // (1)
    var x; // 수집 대상2 (변수 선언))
    console.log(x); // (2)
    var x = 2; // 수집 대상 3(변수 선언)
    console.log(x) // (3)
  }
  a(1);
}

//* 2-4 매개변수와 변수에 대한 호이스팅(3) - 호이스팅을 마친 상태
{
  function a(x) {
    var x; // 수집 대상 1의 변수 선언 부분
    var x; // 수집 대상 2의 변수 선언 부분
    var x; // 수집 대상 3의 변수 선언 부분 

    var x = 1; // 수집 대상 1의 할당 부분
    console.log(x); // 1
    console.log(x); // 1
    var x = 2; // 수집 대상 3의 할당 부분
    console.log(x) // 2
  }
  a(1);
}