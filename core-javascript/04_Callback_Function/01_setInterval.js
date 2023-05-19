//* 4-1 콜백 함수 예제 (1-1) setInterval
var count = 0;
var timer = setInterval(function () {
  console.log(count); // 0 1 2 3 4
  if (++count > 4) clearInterval(timer)
}, 300);

//* 4-2 콜백 함수 예저 (1-2) setInterval
var count = 0;
var cbFunc = function () {
  console.log(count);  // 0 1 2 3 4
  if (++count > 4) clearInterval(timer);
}
var timer = setInterval(cbFunc, 300);

