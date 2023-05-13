//* 1-1 변수 선언
{ var a; }

//* 1-2 변수 선언과 할당
{
  var a; // 변수 a 선언
  a = 'abc'; // 변수 a에 데이터 할당
  var a = 'abc'; // 변수 선언과 할당을 한 문장으로 표현
}

//* 1-3 불변성
{
  var a = 'abc';
  a = a + 'def';

  var b = 5;
  var c = 5;
  b = 7;
}

//* 1-4 참조형 데이터의 할당
{
  var obj1 = {
    a: 1,
    b: 'bbb'
  };
}

//* 1-5 참조형 데이터의 프로퍼티 재할당
{
  var obj1 = {
    a: 1,
    b: 'bbb',
  };
  obj1.a = 2;
}

//* 1-6 중첩된 참조형 데이터(객체)의 프로퍼티 할당
{
  var obj = {
    x: 3,
    arr: [3, 4, 5]
  };

  obj.arr = 'str';
}

//* 1-7 변수 복사
{
  var a = 10;
  var b = a;

  var obj1 = { c: 10, d: 'ddd' };
  var obj2 = obj1;
}

//* 1-8  변수 복사 이후 값 변경 결과 비교 (1) - 객체의 프로퍼티 변경 시
{
  var a = 10;
  var b = a;
  var obj1 = { c: 10, d: 'ddd' };
  var obj2 = obj1;

  b = 15;
  obj2.c = 20;

  a !== b;
  obj1 === obj2
}

//* 1-9 변수 복사 이후 값 변경 결과 비교 (2) - 객체 자체를 변경했을 때
{
  var a = 10;
  var b = a;
  var obj1 = { c: 10, d: 'ddd' };
  var obj2 = obj1;

  b = 15;
  obj2 = { c: 20, d: 'ddd' };
}

//* 1-10 객체의 가변성에 따른 문제점
{
  var user = {
    name: "Nochi",
    gender: 'male'
  };

  var changeName = function (user, newName) {
    var newUser = user;
    newUser.name = newName;
    return newUser;
  }

  var user2 = changeName(user, 'Ai');

  if (user !== user2) {
    console.log('유저 정보가 변경되었습니다.');
  }

  console.log(user.name, user2.name); // Ai Ai
  console.log(user === user2); // true
}

//* 1-11 객체의 가변성에 따른 문제점의 해결 방법
{
  var user = {
    name: 'Nochi',
    gender: 'male'
  };

  var changeName = function (user, newName) {
    return {
      name: newName,
      gender: user.gender
    };
  };

  var user2 = changeName(user, 'Ai');

  if (user !== user2) {
    console.log('유저 정보가 변경되었습니다.');
  }

  console.log(user.name, user2.name); // Nochi Ai
  console.log(user === user2); // false
}

//* 1-12 기존 정보를 복사해서 새로운 객체를 반환하는 함수(얕은 복사)
{
  var copyObject = function (target) {
    var result = {};
    for (var prop in target) {
      result[prop] = target[prop];
    }
    return result;
  }

  var user = {
    name: 'Nochi',
    gender: 'male'
  }

  var user2 = copyObject(user);
  user2.name = 'Ai'

  if (user !== user2) {
    console.log('유저 정보가 변경되었습니다.')
  }

  console.log(user.name, user2.name); // Nochi Ai
  console.log(user === user2); // false
}

//* 1-14 중첩된 객체에 대한 얕은 복사
{
  var user = {
    name: 'Nochi',
    urls: {
      naver: 'https://www.naver.com/',
      google: 'https://www.google.co.kr/'
    }
  };

  var user2 = copyObject(user);

  user2.name = 'Ai'
  console.log(user.name === user2.name) // false

  user.urls.naver = "naver";
  console.log(user.urls.naver === user2.urls.naver) // ture

  user2.urls.google = "";
  console.log(user.urls.google === user2.urls.google); // ture
}

//* 1-16 객체의 깊은 복사를 수행하는 범용 함수
{
  var copyObjectDeep = function (target) {
    var result = {};
    if (typeof target === 'object' && target !== null) {
      for (var prop in target) {
        result[prop] = copyObjectDeep(target[prop])
      }
    } else {
      result = target;
    }
    return result
  };

  var obj = {
    a: 1,
    b: {
      c: null,
      d: [1, 2]
    }
  };
  var obj2 = copyObjectDeep(obj)

  obj2.a = 3;
  obj2.b.c = 4;
  obj2.b.d[1] = 3;

  console.log(obj) // { a: 1, b: { c: null, d: [ 1, 2 ] } }
  console.log(obj2) // { a: 3, b: { c: 4, d: { '0': 1, '1': 3 } } }
}

//* 1-18 JSON을 활용한 간단한 깊은 복사
{
  var copyObjectViaJSON = function (target) {
    return JSON.parse(JSON.stringify(target))
  };
  var obj = {
    a: 1,
    b: {
      c: null,
      d: [1, 2],
      func1: function () { console.log(3); },
    },
    func2: function () { console.log(4); }

  }
  var obj2 = copyObjectViaJSON(obj);

  obj2.a = 3;
  obj2.b.c = 4;
  obj.b.d[1] = 3;

  console.log(obj)
  /**
  a: 1,
  b: { c: null, d: [ 1, 3 ], func1: [Function: func1] },
  func2: [Function: func2]
}
  */
  console.log(obj2) // { a: 3, b: { c: 4, d: [ 1, 2 ] } }
}

