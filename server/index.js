const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));



app.post("/api/users/register", (req, res) => {
  //회원 가입 할때  필요한 정보들을  client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  //mongodb에서 오는 method
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  }); //status(200) : 성공했다는 method
});

app.post("/api/users/login", (req, res) => {
  //요청된 이메일을 데이터베이스에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    //findeOne => 몽고디비에서 지원하는 메소드
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에?? 쿠키에, 로컬스토리지에...저장할수도있고...

        //여기서는 쿠키에 저장해보자 대신 깔아야하는게 있다. cookie-parser
        res
          .cookie("x_auth", user.token)
          .status(200) // 성공했다는 method
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

//role 1 어드민       role 2 특정 부서 어드민
//role 0 -> 일반유저   role 0이 아니면 관리자
app.get("/api/users/auth", auth, (req, res) => {
  // 엔드포인트에서 request를 받은다음에 콜백함수를 실행전에 중간에서 해준다.

  //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 true 라는 말.

  res.status(200).json({
    //클라이언트에게 정보를 제공해 주면 된다.
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //role이 0이면 일반유저, 이외에는 관리자!
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});



const port = 4000;

app.listen(port, () => console.log(`Example app Listening on port ${port}!`));

// Router <- express에서 제공
//로그인이 되어있으면 token이 생성되어있다.
