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

## interface와 class 같은 이름

리액트등의 라이브러리를 뜯어보면서 같은 이름의 interface와 class를 연이어 쓰는 형태를 자주 볼 수 있었다. 처음엔 별 의미없는 것이라 생각해서 무시했는데, 계속 나와서 찾아봤다.

- [스택오버플로우 질문, 답](https://stackoverflow.com/questions/43055682/relationship-between-a-typescript-class-and-an-interface-with-the-same-name)
- interface와 class를 같은 이름으로 쓰면, 합쳐진다.
- interface 여러개를 같은 이름으로 써서 합치는 것와 같은 원리인 것 같다.
- class의 선언부(맨 위)에 복잡한 제네릭, 상속등을 좀 빼내주는 역할을 하는 것 같다. 더 알아봐야함

## readonly vs Readonly<T>

- Readonly utility type은 받은 T의 모든 property를 readonly로 만드는 것이다. 헷갈리지 말자

## 클래스 생성자 타입?

- 클래스 생성자를 타입으로 쓰려면 어떻게 해야할까?
- `new () => Class`
- `new (...args: any[]) => Class` 인자를 받는 생성자
