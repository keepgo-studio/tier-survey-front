front: next + vercel로
  client 측 프로젝트

  host, viewer, feedback 사이트


back: firebase


needed api
games
  riot - [x]


1. game 선택
2. 개최자/참가자 선택
3. riot id 로그인 (연습 필요)
4. 개최자는 
  새롭게 만드는 사람이라면 바로 qr코드 + password 입력창으로
  기존 유저라면 통계 url로 redirecting

  limit time 설정
  qr 코드 생성 (연습 필요)
    url -> /hash한 id/랜덤 넘버(0~100,000)를 hash한 값(hashNum)
    store에서 hashNum값이 같은지 확인
    password 입력해야 참석 가능
    limit_time 끝나면 파기
  
  통계 url -> /hashID/dashboard
    만약 해당 스트리머가 로그인하지 않았는데 그냥 이 링크로 접속하면 아무것도 안뜸
    qr 타이머가 돌고 잇는동안은 로딩창이 뜨게 하기

    qr 재생성 기능 (다시 limit timer 설정 페이지로 돌아감)
      1. 완전 재생성
      2. 기존 데이터 활용
  
  통계 사이트에서는
    1. table로 랭킹 (nickname, tier, level, 선호 챔피언, ) (연습 필요)
      - 닉네임 검색
    2. 티어 비율 pie chart
    3. 챔피언 비율 pie chart
    4. 
  
5. 참가자는
  qr스캔
    닉네임이 드러나느것을 동의할 때만 참석
    password 입력
  통계 url로 이동하기 버튼
    

FSD 구조를 적용
물론 필자의 입맛에 맞추어 약간의 변형이 있을 수 있음.

import 제약이 있다보니 index.ts라는 Barrel file pattern을 써야하는데
성능상 괜찮을지는 염두해 둬야겠다.

a ~ e까지 순서를 두는 import eslint를 만들고 싶었는데 아직은 방법을 모르겠다

[ ] tsconfig를 각 종류 폴더에 만들어서 독립된 환경 만들기 (import 할 때 헷갈림을 방지하기 위핢)
  [ ] index.ts만 include해서 엄격하게 import rule을 지키게 하자

[ ] App check을 위해 firebase init 필요
https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider