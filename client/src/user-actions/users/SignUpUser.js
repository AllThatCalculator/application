import axios from "axios";
import URL from "../../components/PageUrls";
import { handleUserInfoData } from "../../utils/handleDataToSubmit";

/**
 * 회원 가입 - 서버에 요청
 * @param {object}
 * dataToSubmit : 서버에 보낼 정보
 * userId : user id token
 */
async function signUpUser(dataToSubmit = {}, userId) {
  try {
    const response = await axios.post(
      `/api/users`,
      handleUserInfoData(dataToSubmit),
      {
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    switch (error.response.status) {
      case 409: // 이미 등록된 상태에서 한 번 더 요청 보냄 error
        window.location.href = URL.CALCULET;
        return;
      default:
        return error.response.data;
    }
  }
}
export default signUpUser;
