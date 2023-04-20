import { useState } from "react";

/**
 * useState를 이용한, 입력 상태 관리 함수 컴포넌트
 * @param {object} initialValue 입력 초기값 객체로 들어옴
 *
 */
function useInputs(initialValue) {
  const [values, setValues] = useState(initialValue);

  // 입력 event
  function onChange(event) {
    const { id, value } = event.target;

    setValues({
      ...values, // 기존의 input 객체를 복사한 뒤
      [id]: value, // id 키를 가진 input만의 value로 설정
    });
  }

  return { values, onChange };
}
export default useInputs;