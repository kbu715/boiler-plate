# boiler-plate

# nodemon

소스를 변경할 때 그걸 감지해서 자동으로 서버를 재시작해주는 tool

npm install nodemon --save-dev : nodemon을 로컬에서만 사용할 수 있게 해준다.

# Heroku 가입 / mongoURI 저장

안한다. 짜증난다.

# Bcrypt 비밀번호 암호화

npm install bcrypt --save

# 비밀번호까지 같다면 Token을 생성

토큰생성을 위해 JSONWEBTOKEN 라이브러리를 다운로드

npm install jsonwebtoken --save

# CookieParser

npm install cookie-parser --save

# auth authentication

1.페이지 이동 때마다 로그인 되어있는지, 관리자 유저인지등을 체크 2.글을 쓸때나 지울때 같은데 권한이 있는지 같은 것도 체크

클라이언트 쿠키에 있는 토큰을 DB에 보관돼 있는 토큰과 비교를 함으로써 인증을 시킨다.

# logout

로그아웃 하려는 유저를 데이터 베이스에서 찾아서 그 유저의 토큰을 지워준다.

# npx create-react-app .

client 안에다가 리액트를 설치하겠다.

# npm

노드 패키지 매니저

npm install -g : globally 하게 컴퓨터안에 bin/ directory안에 설치된다.

npx가 npm registry에서 create-react-app을 찾아서 다운로드 없이 실행시켜준다!!

1. 디스크 space를 낭비하지 않을 수 있다.
2. 항상 최신 버전을 사용 할 수 있다.

# webpack

src 폴더만 관리해준다. public은 제외.

# rfce (ES7 React/Redux/GraphQL/React-Native snippets)

함수형 컴포넌트 만드는 방법

# React Router Dom

페이지 이동을 할 때 React Router Dom 이라는 것을 사용한다.

# npm install react-router-dom --save

# npm install axios --save

# 두개의 다른 포트(client localhost:3000, server localhost:5000)를 가지고 있으면 아무 설정없이 request를 보낼 수 없다.

why? Cors정책때문에 (보안을 위해서!!!)

how to solve? 여러가지 방법이 있다. 그중에 우리는 Proxy 사용하는 방법으로 해결!

# npm install http-proxy-middleware --save

# src/setupProxy.js

# proxy server

1. 방화벽 기능
2. 웹필터 기능
3. 캐쉬 데이터, 공유 데이터 제공 기능

# proxy server 사용 이유!
1.회사에서 직원들이나 집안에서 아이들 인터넷 사용제어
2.캐쉬를 이용해 더 빠른 인터넷 이용 제공
3.더 나은 보안 제공
4.이용 제한된 사이트 접근 가능

# Concurrently 프론트와 백을 한번에 키자

# npm install concurrently --save

# CSS FRAMEWORK - Ant Design 을 써보자 npm install antd --save
사이즈가 큰 대신 스타일이 굉장히 깔끔하다. 쓰기가 굉장히 편하다

# Redux is a predictable state container for Javascript apps. 상태 관리 라이브러리

# Props vs State

State
1.parent component에서 child component로 data를 보내는게 아닌 그 component 안에서 데이터를 전달하려면 state로
2.State is mutable
3.State가 변하면 re-render 된다.

# redux는 state을 관리하는것