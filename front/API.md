# 필요한 API 명세서

## - 로그인
1. **Login0.tsx**
- Walkthrough 화면 종료 -> 
    이메일 입력후 로그인/회원가입 넘어가는 화면

  <img src='./md_asset/Login0.png' width='45%'>
  <img src='./md_asset/Login0_edit.png' width='45%' align='right'>


- **이메일 확인 API**
  - POST
  - Parameter : user_email
  - result 
    - 0 | `"Login"` : 로그인
    - 1 | `"Signup"` : 회원가입 
    - 400 : error
  - CRUD : READ


