import axios from "axios";
import { handleErrorUserActions } from "../../utils/handleUserActions";

/**
 * calculet_info_temp에 계산기 임시 등록 post 요청 보내는 함수
 */
async function postRegisterCalculetTemp(dataToSubmit = {}, userId) {
  let data;
  try {
    await axios
      .post(`/api/calculets`, dataToSubmit, {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      })
      .then((response) => {
        data = response.data;
      });
    return data;
  } catch (error) {
    handleErrorUserActions(error.response);
  }
}

export default postRegisterCalculetTemp;
