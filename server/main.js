const express = require("express");
const mongoose = require("mongoose");
const calculets = require("./routes/calculets");
const users = require("./routes/users");
const record = require("./routes/record");
const { swaggerUi, specs } = require("./swagger");
const app = express();

require("dotenv").config();
const port = process.env.EXPRESS_PORT;

// mongoDB 연결
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * API 문서 path 등록하기
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * 계산기 관리 API
 */
app.use("/calculets", calculets);

/**
 * 로그인 관리 API
 */
app.use("/users", users);

/**
 * 계산 이력 관리 API
 */
app.use("/record", record);

/**
 * 서버 시작
 */
app.listen(port, () => {
  console.log(`listening ${port}`);
});
