//* 예제 4-7 메서드를 콜백 함수로 전달한 경우
var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    console.log(this, v, i);
  }
}

obj.logValues(1, 2)
[4, 5, 6].forEach(obj.logValues);

//* 예저 4-8 콜백 함수 내부의 this에 다른 값을 바인딩하는 방법(1) - 전통적인 방식
var obj1 = {
  name: 'obj1',
  func: function () {
    var self = this;
    return function () {
      console.log(self.name)
    };
  }
};

var callback = obj1.func();
setTimeout(callback, 1000); // obj1

//* 예제 4-9 콜백 함수 내부에서 this를 사용하지 않은 경우
var obj1 = {
  name: 'obj1',
  func: function () {
    console.log(obj1.name)
  }
};

setTimeout(obj1.func, 1000);

// obj

//* 예제 4-10 예제 4-8의 func 함수 재활용
var obj1 = {
  name: 'obj1',
  func: function () {
    var self = this;
    return function () {
      console.log(self.name)
    };
  }
};

var obj2 = {
  name: 'obj2',
  func: obj1.func
};

var obj3 = { name: 'obj3' };


var callback = obj1.func();
setTimeout(callback, 1000); // obj1

var callback2 = obj2.func();
setTimeout(callback2, 1500); // 0bj2

var callback3 = obj1.func.call(obj3);
setTimeout(callback3, 2000) // obj3

//* 예제 4-11 콜백 함수 내부의 this에 다른 값을 바인딩하는 방법(2) - bind 메서드 활용
var obj1 = {
  name: 'obj1',
  func: function () {
    console.log(this.name);
  }
};

setTimeout(obj1.func.bind(obj1), 1000); // obj1

var obj2 = { name: 'obj2' };
setTimeout(obj1.func.bind(obj2), 1500) // obj2