const express = require("express");
const calculets = require("./routes/calculets");
const users = require("./routes/users");
const { swaggerUi, specs } = require("./swagger");
const app = express();
const port = 5000;

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
 * 서버 시작
 */
app.listen(port, () => {
  console.log(`listening ${port}`);
});
