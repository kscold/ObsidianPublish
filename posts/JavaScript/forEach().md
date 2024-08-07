- [[for]]문의 for ... of와 같이 주로 [[배열(Array)]]에 사용되는 [[메서드(Method)]]이다.

- 인자에 [[콜백 함수(Callback Function)]]를 넣어 사용한다.


## 문법

```js
배열(객체).forEach(function (item, index, array) {
	// item은 요소
	// index
	// array는 순회하는 원 데이터의 정보
})
```


## forEach()와 map()의 차이점

- forEach()와 [[map()]]의 가장 큰 차이점은 반환 값이다.
- forEach() 메서드는 반환 값을 가지지 않으며, 기존 배열을 수정한다. 

- 반면, [[map()]] 메서드는 새로운 배열을 반환하며, 기존 배열을 수정하지 않는다.


## 예시

```javascript
const array = ['1번', '2번', '3번'];

array.forEach((element)=>{
	console.log(element);
})

// >> 1번
// >> 2번
// >> 3번
```