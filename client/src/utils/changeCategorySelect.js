/**
 * 계산기 대분류 change 함수
 * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
 * - 해당하는 대분류에 속하는 소분류 옵션을 세팅
 */
function changeCategoryMain(value, setCategoryMainId, setCategorySubId) {
  const targetValue = value !== "" ? Number(value) : "";
  setCategoryMainId(targetValue);
  setCategorySubId(""); // 초기화
}

/**
 * 계산기 소분류 change 함수
 * - value에 먼저 접근한 후, value에 맞는 name을 찾아서 저장
 */
function changeCategorySub(value, setCategorySubId) {
  const targetValue = value !== "" ? Number(value) : "";
  setCategorySubId(targetValue);
}
export { changeCategoryMain, changeCategorySub };