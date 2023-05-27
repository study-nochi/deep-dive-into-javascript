//* 5-1 외부 함수의 변수를 참조하는 내부 함수(1)
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  inner();
}
outer();

//* 5-2 외부 함수의 변수를 참조하는 내부 함수(2)
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner();
};
var outer2 = outer();
console.log(outer2);

//* 5-3 외부 함수의 변수를 참조하는 내부 함수(3)
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  }
  return inner;
};
var outer2 = outer();
console.log(outer2())
console.log(outer2())

  //* 5-4 return 없이도 클로저가 발생하는 다양한 경우
  // (1) setInterval / setTimeout
  (function () {
    var a = 0;
    var intervalId = null;
    var inner = function () {
      if (++a >= 10) {
        clearInterval(intervalId);
      }
      console.log(a);
    };
    intervalId = setInterval(inner, 1000);
  })();

// (2) eventListener
(function () {
  var count = 0;
  var button = document.createElement('button');
  button.innerText = 'click';
  button.addEventListener('click', function () {
    console.log(++count, 'times clicked');
  });
  document.body.appendChild(button);
})();

//* 5-5 클로저의 메모리 관리
//(1) return에 의한 클로저의 메모리 해제
var outer = (function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
})();
console.log(outer());
console.log(outer());
outer = null;
//(2) setInterval에 의한 클로저의 메모리 해제
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
      inner = null;
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();

//(3) eventListener에 의한 클로저의 메모리 해제
(function () {
  var count = 0;
  var button = document.createElement('button');
  button.innerText = 'click';

  var clickHandler = function () {
    console.log(++count, 'times clicked');
    if (count >= 10) {
      button.removeEventListener('click', clickHandler);
      clickHandler = null;
    }
  };
  button.addEventListener('click', clickHandler);
  document.body.appendChild(button);
})();

//* 5-6 콜백 함수와 클로저(1)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerHTML = fruit;
  $li.addEventListener('click', function () {
    alert('your choice is ' + fruit);
  });
  $ul.appendChild($li);
});
document.body.appendChild($ul);

//* 5-7 콜백 함수와 클로저(2)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');


var alertFruit = function (fruit) {
  alert('your choice is ' + fruit);
};

fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerHTML = fruit;
  $li.addEventListener('click', alertFruit);
  $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);

//* 5-8 콜백 함수와 클로저(3)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');


var alertFruit = function (fruit) {
  alert('your choice is ' + fruit);
};

fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerHTML = fruit;
  $li.addEventListener('click', alertFruit.bind(null, fruit));
  $ul.appendChild($li);
});
document.body.appendChild($ul);

//* 5-9 콜백 함수와 클로저(4)
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');


var alertFruitBuilder = function (fruit) {
  return function () {
    alert('your choice is ' + fruit);
  }
};

fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerHTML = fruit;
  $li.addEventListener('click', alertFruitBuilder(fruit));
  $ul.appendChild($li);
});
document.body.appendChild($ul);

//* 5-10 간단한 자동차 객체
var car = {
  fuel: Math.ceil(Math.random() * 10 + 10),
  power: Math.ceil(Math.random() * 3 + 2),
  moved: 0,
  run: function () {
    var km = Math.ceil(Math.random() * 6);
    var wasteFuel = km / this.power;
    if (this.fuel < wasteFuel) {
      console.log("don't move");
      return;
    }
    this.fuel -= wasteFuel;
    this.moved -= km;
    console.log(km + 'km 이동 (총 ' + this.moved + 'km)');
  }
}

car.fuel = 10000;
car.power = 100;
car.moved = 1000;

//* 5-11 클로저로 변수를 보호한 자동차 객체(1)
var createCar = function () {
  var fuel = Math.ceil(Math.random() * 10 + 10);
  var power = Math.ceil(Math.random() * 3 + 2);
  var moved = 0;
  return {
    get moved() {
      return moved;
    },
    run: function () {
      var km = Math.ceil(Math.random() * 6);
      var wasteFuel = km / power;
      if (fuel < wasteFuel) {
        console.log('이동불가');
        return;
      }
      fuel -= wasteFuel
      moved += km;
      console.log(km + 'km 이동 (총 ' + moved + 'km). 남은 연료: ' + fuel);
    }
  };
};
var car = createCar();
car.run();
console.log(car.moved);
console.log(car.fuel);
console.log(car.power);

car.fuel = 1000;
console.log(car.fuel);
car.run();

car.power = 100;
console.log(car.power);
car.run();

car.moved = 1000;
console.log(car.moved);
car.run();

//* 5-12 클로저로 변수를 보호한 자동차 객체(2)
var createCar = function () {
  var fuel = Math.ceil(Math.random() * 10 + 10);
  var power = Math.ceil(Math.random() * 3 + 2);
  var moved = 0;
  var publicMembers = {
    get moved() {
      return moved;
    },
    run: function () {
      var km = Math.ceil(Math.random() * 6);
      var wasteFuel = km / power;
      if (fuel < wasteFuel) {
        console.log('이동불가');
        return;
      }
      fuel -= wasteFuel
      moved += km;
      console.log(km + 'km 이동 (총 ' + moved + 'km). 남은 연료: ' + fuel);
    }
  }
  Object.freeze(publicMembers);
  return publicMembers;
};
var car = createCar();
car.run();
console.log(car.moved);
console.log(car.fuel);
console.log(car.power);

car.fuel = 1000;
console.log(car.fuel);
car.run();

car.power = 100;
console.log(car.power);
car.run();

car.moved = 1000;
console.log(car.moved);
car.run();

//* 5-13 bind 메서드를 활용한 부분 적용 함수

var add = function () {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};
var addPartial = add.bind(null, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10))

//* 5-14 부분 적용 함수 구현(1)
var partial = function () {
  var originalPartialArgs = arguments;
  var func = originalPartialArgs[0];
  if (typeof func !== 'function') {
    throw new Error('첫 번째 인자가 함수가 아닙니다.');
  }
  return function () {
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

var add = function () {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};

var addPartial = partial(add, 1, 2, 3, 4, 5);
console.log(addPartial(6, 7, 8, 9, 10));

var dog = {
  name: '강아지',
  greet: partial(function (prefix, suffix) {
    return prefix + this.name + suffix;
  }, '왈왈, ')
};
dog.greet('입니다.');

//* 5-15 부분 적용 함수 구현(2)
Object.defineProperty(window, '_', {
  value: 'EMPTY_SPACE',
  writable: false,
  configurable: false,
  enumerable: false
});

var partial2 = function () {
  var originalPartialArgs = arguments;
  var func = originalPartialArgs[0];
  if (typeof func !== 'function') {
    throw new Error('첫 번째 인자가 함수가 아닙니다.');
  }
  return function () {
    var partialArgs = Array.prototype.slice.call(originalPartialArgs, 1);
    var restArgs = Array.prototype.slice.call(arguments);
    for (var i = 0; i < partialArgs.length; i++) {
      if (partialArgs[i] === _) {
        partialArgs[i] = restArgs.shift();
      }
    }
    return func.apply(this, partialArgs.concat(restArgs));
  };
};

var add = function () {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
};

var addPartial = partial2(add, 1, 2, _, 4, 5, _, _, 8, 9);
console.log(addPartial(3, 6, 7, 10));

var dog = {
  name: '강아지',
  greet: partial(function (prefix, suffix) {
    return prefix + this.name + suffix;
  }, '왈왈, ')
};
dog.greet('hungry!');

//* 5-16 부분 적용 함수 - 디바운스
var debounce = function (eventName, func, wait) {
  var timeoutId = null;
  return function (event) {
    var self = this;
    console.log(eventName, 'event 발생');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};

var moveHandler = function (e) {
  console.log('move event 처리');
};

var wheelHandler = function (e) {
  console.log('wheel event 처리');
};

document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('wheel', moveHandler, 700));

//* 5-17 커링 함수(1)
var curry3 = function (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8));
console.log(getMaxWith10(25));

var getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8))
console.log(getMinWith10(25))

var curry5 = function (func) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return func(a, b, c, d, e);
          }
        }
      }
    }
  }
}

// var curr5 = func => a => b => c => d => e => func(a,b,c,d,e);

var getMax = curry5(Math.max);
console.log(getMax(1)(2)(3)(4)(5));

//--------------------------------------

var getInformation = function (baseUrl) {
  return function (path) {
    return function (id) {
      return fetch(baseUrl + path + '/' + id)
    }
  }
}

var getInformation = baseUrl => path => id => fetch(baseUrl + path + '/' + id);

//--------------------------------------
var imageUrl = 'http://imageAddress.com/';
var productUrl = 'http://productAddress.com/';

// 이미지 타입별 요청 함수 준비
var getImage = getInformation(imageUrl);
var getEmoticon = getImage('emoticon');
var getIcon = getImage('icon');

// 제품 타입별 요청 함수 준비
var getProduct = getInformation(productUrl);
var getFruit = getProduct('fruit');
var getVegetable = getProduct('vegetable');

// 실제 요청
var emoticon1 = getEmoticon(100);
var emoticon2 = getEmoticon(200);
var icon1 = getIcon(205);
var icon2 = getIcon(234);
var fruit1 = getFruit(300);
var fruit2 = getFruit(400);
var vegetable1 = getVegetable(456);
var vegetable2 = getVegetable(789);

//* Redux Middleware 'Logger'
const logger = store => next => action => {
  console.log('dispatching', action);
  console.log('next state', store.getState());
  return next(action);
};

//* Redux Middleware 'thunk'
const thunk = store => next => action => {
  return typeof action === 'function' 
    ? action(dispatch, store.getState) :next(action);
};

