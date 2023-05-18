//? web에서는 잘 동작하는데 Node.js에서는 다르게 나오기 때문에 web에서 실행하는걸 추천.

//* 3-2 전역 공간에서의 this(Node.js 환경) 
console.log(this); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
console.log(window); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}
console.log(this === window); // true

//* 3-3 전역변수와 전역객체(1)
var a = 1;
console.log(a); // 1
console.log(window.a); // 1
console.log(this.a); // 1

//* 3-4 전역변수와 전역객체(2)
var a = 1;
window.b = 2;
console.log(a, window.a, this.a); // 1 1 1
console.log(b, window.b, this.b); // 2 2 2

window.a = 3;
b = 4;
console.log(a, window.a, this.a); // 3 3 3 
console.log(b, window.b, this.b); // 4 4 4

//* 3-5 전역변수와 전역객체(3)
var a = 1;
delete window.a; // false
console.log(a, window.a, this.a); // 1 1 1

var b = 2;
delete b; // false
console.log(b, window.b, this.b); // 2 2 2

window.c = 3;
delete window.c; // true
console.log(c, window.c, this.c); // Uncaught ReferenceError: c is not defined

window.d = 4;
delete d; // true
console.log(d, window.d, this.d); // Uncaught ReferenceError: d is not defined

//* 3-6 함수로서 호출, 메서드로서의 호출
var func = function (x) {
  console.log(this, x);
};
func(1) // Window {window: Window, self: Window, document: document, name: '', location: Location, …} 1 

var obj = {
  method: func
}
obj.method(2) // {method: ƒ} 2

var obj = {
  method: function (x) { console.log(this, x) }
}
obj.method(1); // {method: ƒ} 1
obj['method'](2); // {method: ƒ} 2

var obj = {
  methodA: function () { console.log(this) },
  inner: {
    methodB: function () { console.log(this) }
  }
}

obj.methodA() // {inner: {…}, methodA: ƒ}
obj["methodA"]() // {inner: {…}, methodA: ƒ}

obj.inner.methodB() // {methodB: ƒ}
obj.inner['methodB']() // {methodB: ƒ}
obj['inner'].methodB() // {methodB: ƒ}
obj['inner']["methodB"]() // {methodB: ƒ}

//* 3-9 내부함수에서의 this
var obj1 = {
  outer: function () {
    console.log(this); // {outer: ƒ}
    var innerFunc = function () {
      console.log(this);
    }
    innerFunc(); // Window {window: Window, self: Window, document: document, name: '', location: Location, …}

    var obj2 = {
      innerMethod: innerFunc
    };
    obj2.innerMethod(); // {innerMethod: ƒ}
  }
}
obj1.outer()

//* 내부 함수에서의 this를 우회하는 방법
var obj = {
  outer: function () {
    console.log(this); // {outer: ƒ}
    var innerFunc1 = function () {
      console.log(this)
    }
    innerFunc1(); // Window

    var self = this;
    var innerFunc2 = function () {
      console.log(self);
    }
    innerFunc2(); // {outer: ƒ}
  }
}
obj.outer()

//* 3-11 this를 바인딩하지 않는 함수(화살표 함수)
var obj = {
  outer: function () {
    console.log(this); // {outer: ƒ}
    var innerFunc = () => {
      console.log(this);
    }
    innerFunc(); // {outer: ƒ}
  }
}
obj.outer()

//* 3-12 콜백 함수 내부에서의 this
setTimeout(function () { console.log(this) }, 300); // Window

[1, 2, 3, 4, 5].forEach(function (x) {
  console.log(this, x) // Window x
})

//* 3-13 생성자 함수
var Cat = function (name, age) {
  this.bark = "야옹";
  this.name = name;
  this.age = age;
}

var choco = new Cat('초코', 7);
var nabi = new Cat('나비', 5);
console.log(choco, nabi); // Cat {bark: '야옹', name: '초코', age: 7} Cat {bark: '야옹', name: '나비', age: 5}

//* 3-14 call 메서드(1)
var func = function (a, b, c) {
  console.log(this, a, b, c,);
}

func(1, 2, 3); // Window 1 2 3
func.call({ x: 1 }, 4, 5, 6)  // {x: 1} 4 5 6

//* 3-15 call 메서드(2)
var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y)
  }
};

obj.method(2, 3); // 1 2 3
obj.method.call({ a: 4 }, 5, 6) // 4 5 6

//* 3-16 apply 메서드
var func = function (a, b, c) {
  console.log(this, a, b, c);
}

func.apply({ x: 1 }, [4, 5, 6]) // {x: 1} 4 5 6

var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  }
};
obj.method.apply({ a: 4 }, [5, 6]) // 4 5 6

//* 3-17 call/apply 메서드의 활용 1-1) 유사배열객체에 배열 메서드를 적용
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

Array.prototype.push.call(obj, 'd');
console.log(obj); // {0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4}

var arr = Array.prototype.slice.call(obj);
console.log(arr) // (4) ['a', 'b', 'c', 'd']

//* 3-18 call/apply 메서드의 활용 1-2) arguments, NodeList에 배열 메서드를 적용
function a() {
  var argv = Array.prototype.slice.call(arguments);
  argv.forEach(function (arg) {
    console.log(arg);
  })
}
a(1, 2, 3); // 1 \n 2 \n 3


document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
var nodeList = document.querySelectorAll('div');
var nodeArr = Array.prototype.slice.call(nodeList);
nodeArr.forEach(function (node) {
  console.log(node);
})

//* 3-19 call/apply 메서드의 활용 1-3) 문자열에 배열 메서드 적용 예시
var str = 'abc def';
// Array.prototype.push.call(str, ', pushed string'); // Uncaught TypeError: Cannot assign to read only property 'length' of object '[object String]'

Array.prototype.concat.call(str, 'string'); // [String, 'string']
Array.prototype.every.call(str, function (char) { return char !== ' ' }); // false
Array.prototype.some.call(str, function (char) { return char === ' ' }); // true

var newArr = Array.prototype.map.call(str, function (char) { return char + '!' });
console.log(newArr); // (7) ['a!', 'b!', 'c!', ' !', 'd!', 'e!', 'f!']

var newStr = Array.prototype.reduce.apply(str, [
  function (string, char, i) { return string + char + i }, ''
])
console.log(newStr) // a0b1c2 3d4e5f6

//* 3-20 call/apply 메서드의 활용 1-4)ES6의 Array.from 메서드
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
var arr = Array.from(obj);
console.log(arr) // (3) ['a', 'b', 'c']

//* 3-21 call/apply 메서드의 활용 2) 생성자 내부에서 다른 생성자를 호출
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}

function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}

function Employee(name, gender, company) {
  Person.apply(this, [name, gender]);
  this.company = company;
}

var by = new Student('보영', 'female', '단국대'); // Student {name: '보영', gender: 'female', school: '단국대'}
var jn = new Employee('재난', 'male', '구골'); // Employee {name: '재난', gender: 'male', company: '구골'}

//* 3-22 call/apply 메서드의 활용 3-1) 최대/최소값을 구하는 코드를 직접 구현
var numbers = [10, 20, 3, 16, 45];
var max = min = numbers[0];

numbers.forEach(function (number) {
  if (number > max) {
    max = number;
  }
  if (number < min) {
    min = number;
  }
});

console.log(max, min) // 45 3

//* 3-23 call/apply 메서드의 활용 3-2) 여러 인수를 받는 메서드(Math.max/Math.min)에 apply를 적용
var numbers = [10, 20, 3, 16, 45];
var max = Math.max.apply(null, numbers)
var min = Math.min.apply(null, numbers)
console.log(max, min) // 45 3

//* 3-23 call/apply 메서드의 활용 3-3) ES6의 펼치기 연산자 활용
var numbers = [10, 20, 3, 16, 45];
var max = Math.max(...numbers)
var min = Math.min(...numbers)
console.log(max, min) // 45 3


//* 3-25 bind 메서드 - this 지정과 부분 적용 함수 구현
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d)
}
func(1, 2, 3, 4) // Window 1 2 3 4

var bindFunc1 = func.bind({ x: 1 });
bindFunc1(5, 6, 7, 8) // {x: 1} 5 6 7 8

var bindFunc2 = func.bind({ x: 1 }, 4, 5);
bindFunc2(6, 7) // {x: 1} 4 5 6 7
bindFunc2(8, 8) // {x: 1} 4 5 8 8

//* 3-26 bind 메서드 - name 프로퍼티
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d)
}

var bindFunc = func.bind({ x: 1 }, 4, 5);
console.log(func.name); // func
console.log(bindFunc.name); // bound func

//* 3-27 내부함수에 this 전달 - call vs. bind

var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }
    innerFunc.call(this);
  }
}
obj.outer()


var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    }.bind(this)
    innerFunc();
  }
}

obj.outer()

//* 3-28 bind 메서드 - 내부함수에 this 전달

var obj = {
  logThis: function () {
    console.log(this);
  },
  logThisLater1: function () {
    setTimeout(this.logThis, 500);
  },
  logThisLater2: function () {
    setTimeout(this.logThis.bind(this), 1000)
  }
}

obj.logThisLater1() // Window 
obj.logThisLater2() // {logThis: ƒ, logThisLater1: ƒ, logThisLater2: ƒ}

//* 3-29 화살표 함수 내부에서의 this
var obj = {
  outer: function () {
    console.log(this); // {outer: ƒ}
    var innerFunc = () => {
      console.log(this); //{outer: ƒ}
    };
    innerFunc()
  }
}
obj.outer()

//* 3-30 thisArg를 받는 경우 예시 - forEach 메서드
var report = {
  sum: 0,
  count: 0,
  add: function () {
    var args = Array.prototype.slice.call(arguments);
    args.forEach(function (entry) {
      this.sum += entry;
      ++this.count;
    }, this);
  },
  average: function () {
    return this.sum / this.count;
  }
};

report.add(60, 85, 95);
console.log(report.sum, report.count, report.average()); // 240 3 80

