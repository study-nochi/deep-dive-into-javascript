# 자바스크립트 공부

## 코어 자바스크립트: 핵심 개념과 동작 원리로 이해하는 자바스크립트 프로그래밍

```js
// 3-2 전역 공간에서의 this(Node.js 환경) 
// 결과가 책과 다르게 나옴
console.log(this); // {}
console.log(global); // <ref *1> Object [global]
console.log(this === global); // false
```