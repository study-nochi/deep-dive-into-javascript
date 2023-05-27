//* 콜백 지옥 예시 (1-1)
setTimeout(function (name) {
  var coffeeList = name;
  console.log(coffeeList)

  setTimeout(function (name) {
    coffeeList += ', ' + name;
    console.log(coffeeList)

    setTimeout(function (name) {
      coffeeList += ', ' + name;
      console.log(coffeeList)

      setTimeout(function (name) {
        coffeeList += ', ' + name;
        console.log(coffeeList)

      }, 500, '카페라떼');
    }, 500, '카페모카')
  }, 500, '아메리카노')
}, 500, '에스프레소');

//* 4-13 콜백 지옥 해결 - 기명함수로 변환
var coffeeList = '';

var addEspresso = function (name) {
  coffeeList = name;
  console.log(coffeeList)
  setTimeout(addAmericano, 500, '아메리카노');
};

var addAmericano = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
  setTimeout(addMocha, 500, '카페모카');
};

var addMocha = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
  setTimeout(addLatte, 500, '카페라떼');
};

var addLatte = function (name) {
  coffeeList += ', ' + name;
  console.log(coffeeList);
}

setTimeout(addEspresso, 500, '에스프레소');

//* 4-14 비동기 작업의 동기적 표현(1) - Promise(1)
new Promise(function (resolve) {
  setTimeout(function () {
    var name = 'Espresso';
    console.log(name);
    resolve(name);
  }, 500);
}).then(function (prevName) {
  return new Promise(function (resolve) {
    var name = prevName + ', Americano';
    console.log(name);
    resolve(name);
  }, 500)
}).then(function (prevName) {
  return new Promise(function (resolve) {
    var name = prevName + ', Cafe Mocha';
    console.log(name);
    resolve(name);
  }, 500)
}).then(function (prevName) {
  return new Promise(function (resolve) {
    var name = prevName + ', Cafe Latte';
    console.log(name);
    resolve(name);
  }, 500)
})

//* 4-15 비동기 작업의 동기적 표현(2) - Promise(2)
var addCoffee = function (name) {
  return function (prevName) {
    return new Promise(function (resolve) {
      var newName = prevName ? (prevName + ', ' + name) : name;
      console.log(newName);
      resolve(newName);
    }, 500);
  };
};

addCoffee('Espresso')()
  .then(addCoffee('Americano'))
  .then(addCoffee('CafeMocha'))
  .then(addCoffee('CafeLatte'));

//* 4-16 비동기 작업의 동기적 표현(3) - Generator
var addCoffee = function (prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? prevName + ', ' + name : name);
  }, 500);
};

var coffeeGenerator = function* () {
  var espresso = yield addCoffee('', 'Espresso');
  console.log(espresso);
  var americano = yield addCoffee(espresso, 'Americano');
  console.log(americano);
  var mocha = yield addCoffee(americano, 'Mocha');
  console.log(mocha);
  var latte = yield addCoffee(mocha, 'Latte');
  console.log(latte);
};

var coffeeMaker = coffeeGenerator();
coffeeMaker.next();

//* 비동기 작업의 동기적 표현(4) - Promise + Async/await

var addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name)
    }, 500)
  });
};

var coffeeMaker = async function () {
  var coffeeList = '';
  var _addCoffee = async function (name) {
    coffeeList += (coffeeList ? ',' : '') + await addCoffee(name)
  }
  await _addCoffee('Espresso');
  console.log(coffeeList)
  await _addCoffee('Americano');
  console.log(coffeeList)
  await _addCoffee('Mocha');
  console.log(coffeeList)
  await _addCoffee('Latte');
  console.log(coffeeList)
};

coffeeMaker();