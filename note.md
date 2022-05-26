# 타입스크립트 관련 배운거(정확히 설명 못해도 일단 적어두기)

## 제네릭 클래스 관련

Component를 props와 state의 타입을 받는 제네릭 클래스로 변경했는데, props, state가 필요 없는데도 줘야하나 고민. 하지만 generic도 default type을 줄 수 있다.  
그랬더니 props와 state에서 오류가 났다. 빈 객체 `{}`로 초기화를 하고 있었는데, 빈 객체 타입으로 인식되어 생긴 오류같다. type assertion을 이용해 해결.

## 객체 순회

`Object.entries()`를 이용해 객체 요소를 순회하고 싶었음. 문제는, `[key: string, value: unknown]`형식으로 받아오는데, key 타입이 string이라 해당 key를 이용해 객체를 이용하는게 불가능했다. type assertion을 이용해 해결했다. `for (let [key, value] of Object.entries(newState) as Array<[K, any]>)`

## DOM 관련 에러

eventTarget, Element등등... closest를 못쓴다거나, dataset에 접근이 안된다거나 하는 것들을 보면 전부 type관련 문제다. 일단 Element, HTMLElement로 type assertions을 하는 등으로 해결했으나... event type과 DOM요소의 type에 대해 좀더 찾아봐야한다.

## 모듈 관련

- tsconfig의 commonjs는 nodejs환경을 의미, 브라우저 환경은 es로 시작하는 것 사용
- import할 때 js확장자를 붙여야 한다.

## 자동완성

- 타입, 인터페이스, 제네릭을 이용해서 자동완성을 받아볼 수 있다.
- 특정 상황에서 자동완성을 받아볼 수가 없으면 뭔가 잘못 개발했다고 봐도 될까?
