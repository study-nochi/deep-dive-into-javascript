//* 1-19 자동으로 undefined를 부여하는 경우
{
  var a;
  console.log(a); // undefined

  var obj = { a: 1 };
  console.log(obj.a); // 1
  console.log(obj.b); // undefined
  // console.log(b); // ReferenceError: b is not defined

  var func = function () { };
  var c = func(); // undefined
  console.log(c); // undefined
}

//* 1-20 undefined와 배열
{
  var arr1 = [];
  arr1.length = 3;
  console.log(arr1) // [ <3 empty items> ]

  var arr2 = new Array(3);
  console.log(arr2); // [ <3 empty items> ]

  var arr3 = [undefined, undefined, undefined];
  console.log(arr3) // [ undefined, undefined, undefined ]
}

{
  var arr1 = [undefined, 1];
  var arr2 = [];
  arr2[1] = 1;

  arr1.forEach(function (v, i) { console.log(v, i); })
  arr2.forEach(function (v, i) { console.log(v, i); })

  arr1.map(function (v, i) { return v + i })
  arr2.map(function (v, i) { return v + i })

  arr1.filter(function (v) { return !v })
  arr2.filter(function (v) { return !v })

  arr1.reduce(function (p, c, i) { return p + c + i }, "")
  arr2.reduce(function (p, c, i) { return p + c + i }, "")
}

//* undefined와 null의 비교
{
  var n = null;
  console.log(typeof n);

  console.log(n == undefined); // true;
  console.log(n == null) // true;

  console.log(n === undefined); // false;
  console.log(n === null) // true;
}