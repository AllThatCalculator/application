const { Op } = require("sequelize");
const { models, sequelize } = require("../../models");

/**
 * 유저/계산기에 대해 좋아요 여부 리턴
 * @param {string} userId 유저 uid
 * @param {string} calculetId 계산기 uuid
 * @returns 좋아요 여부 (true/false)
 */
function checkUserLikesCalculet(userId, calculetId) {
  return models.userCalculetLike
    .findOne({
      where: {
        user_id: {
          [Op.eq]: userId,
        },
        calculet_id: {
          [Op.eq]: calculetId,
        },
      },
    })
    .then((result) => {
      if (result === null) {
        return false;
      }
      return true;
    });
}

/**
 * 좋아요 취소 트랜잭션 수행
 */
async function removeLike(req, res) {
  const userId = res.locals.userId;
  const calculetId = req.params.calculetId;
  const calculet = await models.calculetStatistics.findByPk(calculetId);

  // 좋아요 체크 되어있지 않은 경우
  if (!(await checkUserLikesCalculet(userId, calculetId))) {
    res.status(200).send({ likeCnt: calculet.like_cnt });
    return;
  }

  try {
    /**
     * transaction
     * 1. user_calculet_like에 행 삭제
     * 2. 계산기의 like_cnt <- like_cnt - 1
     */
    await sequelize.transaction(async (t) => {
      await models.userCalculetLike.destroy({
        where: { user_id: userId, calculet_id: calculetId },
        transaction: t,
      });
      await calculet.decrement("like_cnt", {
        transaction: t,
      });
    });
    // success
    res.status(200).send({ likeCnt: calculet.like_cnt - 1 });
  } catch (error) {
    // failed
    console.error(error);
    res.status(400).send({ likeCnt: calculet.like_cnt });
  }
}

/**
 * 좋아요 등록 트랜잭션 수행
 */
async function putLike(req, res) {
  const userId = res.locals.userId;
  const calculetId = req.params.calculetId;
  const calculet = await models.calculetStatistics.findByPk(calculetId);

  // 이미 좋아요 체크 되어있는 경우
  if (await checkUserLikesCalculet(userId, calculetId)) {
    res.status(200).send({ likeCnt: calculet.like_cnt });
    return;
  }

  try {
    /**
     * transaction
     * 1. user_calculet_like에 행 추가
     * 2. 계산기의 like_cnt <- like_cnt + 1
     */
    await sequelize.transaction(async (t) => {
      await models.userCalculetLike.create(
        {
          user_id: userId,
          calculet_id: calculetId,
        },
        { transaction: t }
      );
      await calculet.increment("like_cnt", {
        transaction: t,
      });
    });
    // success
    res.status(200).send({ likeCnt: calculet.like_cnt + 1 });
  } catch (error) {
    // failed
    console.error(error);
    res.status(400).send({ likeCnt: calculet.like_cnt });
  }
}

exports.userLike = {
  mark: putLike,
  remove: removeLike,
  check: checkUserLikesCalculet,
};
