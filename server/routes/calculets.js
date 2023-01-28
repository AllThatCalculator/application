const express = require("express");
const router = express.Router();
const { postCalculet } = require("./calculets/register");
const { auth } = require("../middleware/auth");
const { errorHandler } = require("../middleware/errorHandler");
const { getCalculetInfo } = require("./calculets/getCalculetInfo");
const { userLike } = require("./calculets/userLike");
const { getCalculetList } = require("./calculets/calculetList");

/**
 * @swagger
 *  /api/calculets:
 *    get:
 *      tags: [calculets]
 *      summary: 계산기 전체 목록 불러오기
 *      description: DB에 저장된 계산기의 전체 목록을 카테고리별로 불러온다
 *      responses:
 *        200:
 *          $ref: "#/components/responses/getCalculetList"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get("/", errorHandler.dbWrapper(getCalculetList));

/**
 * @swagger
 *  /api/calculets/{calculetId}:
 *    get:
 *      tags: [calculets]
 *      summary: 계산기 불러오기
 *      description: id번 계산기를 DB에서 조회한 후 불러오기
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      responses:
 *        200:
 *          $ref: "#/components/responses/getCalculetInfo"
 *        404:
 *          description: 계산기를 찾지 못함
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.get(
  "/:calculetId",
  auth.checkFirebase,
  errorHandler.dbWrapper(getCalculetInfo)
);

/**
 * @swagger
 *  /api/calculets:
 *    post:
 *      tags: [calculets]
 *      summary: 계산기 임시 등록 <Auth>
 *      description: 계산기 등록 전, 보안 검사를 위해 임시 테이블에 등록한다
 *      requestBody:
 *        $ref: "#/components/requestBodies/postCalculet"
 *      responses:
 *        301:
 *          $ref: "#/components/responses/postCalculet"
 *        400:
 *          $ref: "#/components/responses/error"
 */
router.post(
  "/",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(postCalculet)
);

/**
 * @swagger
 *   /api/calculets/like/{calculetId}:
 *    put:
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      tags: [calculets]
 *      summary: 좋아요 등록 <Auth>
 *      description: 로그인한 유저에 대해 계산기 "좋아요" 등록
 *      responses:
 *        200:
 *          $ref: "#/components/responses/putResult"
 *        400:
 *          $ref: "#/components/responses/putResult"
 */
router.put(
  "/like/:calculetId",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(userLike.put)
);

/**
 * @swagger
 *   /api/calculets/unlike/{calculetId}:
 *    put:
 *      parameters:
 *        - $ref: "#/components/parameters/calculetId"
 *      tags: [calculets]
 *      summary: 좋아요 취소 <Auth>
 *      description: 로그인한 유저에 대해 계산기 "좋아요" 취소
 *      responses:
 *        200:
 *          $ref: "#/components/responses/putResult"
 *        400:
 *          $ref: "#/components/responses/putResult"
 */
router.put(
  "/unlike/:calculetId",
  [auth.firebase, auth.database],
  errorHandler.dbWrapper(userLike.remove)
);

module.exports = router;
