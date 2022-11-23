import styled from "styled-components";
import styles from "../components/styles";
import WriteCode from "../components/register/WriteCode";
import { WriteInform } from "../components/register/WriteInform";
import UploadDoneBtn from "../components/register/UploadDoneBtn";
import { useState, useEffect, useCallback } from "react";
import { ContentLayout, White300Layout } from "../components/Layout";
import useInput from "../hooks/useInput";
import loadUserInfo from "../user-actions/userInfo";
import calculetCategory from "../user-actions/calculetCategory";

import { auth } from "../firebase";

/**
 * ContentLayout을 상속하는 RegisterLayout
 * - flex와 gap, padding 설정을 새로 함
 */
const RegisterLayout = styled(ContentLayout)`
  display: flex;
  flex-direction: column;
  gap: ${styles.styleLayout.basic300};
  padding: ${styles.styleLayout.basic350};
`;

/**
 * 계산기 등록 페이지 컴포넌트
 * - 여러 컴포넌트에서 관리하는 state들을 관리
 */
function Register() {
  const title = useInput("");
  const description = useInput("");

  // 대분류 옵션
  const [mainOption, setMainOption] = useState(null);

  // 소분류 옵션
  const [subOption, setSubOption] = useState(null);

  // 선택한 대분류 종류에 맞는 소분류 옵션 배열
  const [categorySubOption, setCategorySubOption] = useState(null);

  // 선택된 대분류, 소분류 네임
  const [categoryMain, setCategoryMain] = useState("");
  const [categorySub, setCategorySub] = useState("");

  // 선택된 대분류, 소분류 id
  const [categoryMainId, setCategoryMainId] = useState(null);
  const [categorySubId, setCategorySubId] = useState(null);

  // 소분류 선택 활성 여부
  const [isValidSub, setIsValidSub] = useState(false);

  const [srcCode, setSrcCode] = useState("<!DOCTYPE html>");
  const [manual, setManual] = useState("### write detail!");

  /**
   * 계산기 대분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * - 해당하는 대분류에 속하는 소분류 옵션을 세팅
   * @param {*} event
   */
  function changeCategoryMain(event) {
    // 대분류 타겟 value 값
    const targetValue = Number(event.target.value);
    // 대분류 옵션 네임
    const main = mainOption[targetValue].name;
    // 소분류 옵션 리스트
    const subOptionList = subOption[targetValue];

    setCategoryMain(main);
    setCategoryMainId(targetValue);
    setCategorySubOption(subOptionList);

    // 대분류가 단위변환기이거나 기타라면
    if (
      targetValue === subOptionList[0].value ||
      targetValue === mainOption.length - 1
    ) {
      setCategorySub(subOptionList[0].name);
      setCategorySubId(subOptionList[0].value);
      setIsValidSub(false);
    } else {
      setCategorySub(null);
      setCategorySubId(null);
      setIsValidSub(true);
    }
  }

  /**
   * 계산기 소분류 change 함수
   * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
   * @param {*} event
   */
  function changeCategorySub(event) {
    const targetValue = Number(event.target.value);
    if (categorySubOption) {
      const option = categorySubOption.filter((x) => x.value === targetValue);
      setCategorySub(option[0].name);
      setCategorySubId(targetValue);
    }
  }

  // 유저 정보
  const [userInfo, setUserInfo] = useState(null);

  /**
   * 사용자 정보 서버에 요청
   */
  const requestUserInfo = useCallback((userId) => {
    const request = loadUserInfo(userId);
    request.then((res) => {
      setUserInfo(res);
    });
  }, []);

  /**
   * 카테고리 서버에 요청 후, 데이터 가공
   */
  const loadCategory = useCallback(() => {
    const request = calculetCategory();
    request.then((res) => {
      setMainOption(res.categoryMain);
      setSubOption(res.categorySub);
    });
  }, []);

  /**
   * 카테고리 가져오기
   */
  useEffect(() => {
    requestUserInfo(auth.currentUser.uid);
    loadCategory();
  }, [requestUserInfo, loadCategory]);

  return (
    <White300Layout>
      <RegisterLayout>
        {userInfo && (
          <WriteInform
            title={title.value}
            description={description.value}
            mainOption={mainOption}
            categoryMain={categoryMain}
            categorySubOption={categorySubOption}
            categorySub={categorySub}
            isValidSub={isValidSub}
            profileImg={userInfo.profileImg}
            changeTitle={title.onChange}
            changeDescription={description.onChange}
            changeCategoryMain={changeCategoryMain}
            changeCategorySub={changeCategorySub}
          />
        )}
        <WriteCode
          srcCode={srcCode}
          manual={manual}
          setSrcCode={setSrcCode}
          setManual={setManual}
        />
        {userInfo && (
          <UploadDoneBtn
            id={auth.currentUser.uid}
            title={title.value}
            description={description.value}
            categoryMainId={categoryMainId}
            categorySubId={categorySubId}
            srcCode={srcCode}
            manual={manual}
          />
        )}
      </RegisterLayout>
    </White300Layout>
  );
}

export default Register;
