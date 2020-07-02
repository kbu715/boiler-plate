const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt가 몇글자인지 나타냄
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this; //this가 userSchema를 가리킨다.
  if (user.isModified("password")) {
    //비밀번호가 변경될때만 비밀번호를 암호화해준다. 이렇게 안하면 다른 값이 변경되었을때도 암호화를 하게된다.
    //비밀번호를 암호화 시킨다. : salt를 이용해서 비밀번호를 암호화한다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); //에러가 나면 user.save()의 if(err)로 바로 이동.

      bcrypt.hash(user.password, salt, function (err, hash) {
        //hash argument : 암호화된 비밀번호
        if (err) return next(err);
        user.password = hash; // plain password를 hash된 비밀번호로 바꿔준다.
        next(); //돌아간다. user.save()로
      });
    });
  } else {
    next(); //이게 없으면 여기서 계속 머문다...
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword 1234     암호화된 비밀번호 $2b$10$SuyxSYe8RIW4AqnHg97OOOQVqlleM/o3yHa6UXVAfPrNr0xID2BWC
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  //jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken"); //toHexString() : 에러 잡기위해

  //user._id + 'secretToken' = token
  //'secretToken' -> user._id : secretToken으로 user._id를 알 수 있는것!

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
  // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
      //유저 아이디를 이용해서 유저를 찾은 다음에
      //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인


      user.findOne({"_id": decoded, "token": token}, function(err, user){
        if(err) return cb(err);
        cb(null, user)
      })
    })

}

const User = mongoose.model("User", userSchema);

module.exports = { User };
