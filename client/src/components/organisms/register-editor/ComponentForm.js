import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import { Common, Components, Option } from "./ComponentOptions";
import { onUpdateComponent } from "../../../modules/calculetEditor";
import {
  // PROPERTY_TYPE_STRING,
  // PROPERTY_TYPE_BOOLEAN,
  // PROPERTY_TYPE_SELECT,
  PROPERTY_OPTION_START_NUMBER,
  // PROPERTY_TYPE_DATE,
} from "../../../constants/calculetComponent";

// import DatePickerComponent from "./DatePickerComponent";
// import SelectComponent from "./SelectComponent";
// import CheckboxComponent from "./CheckboxComponent";
import Transformer from "./Transformer";

// /**
//  * 컴포넌트 속성 하나에 대한 정보를 받아서, 인풋 필드로 바꿔주는 함수
//  * @param {string} id 컴포넌트 속성들의 id 값
//  * @param {object} data 컴포넌트 속성에 대한 정보 (속성을 입력받는 인풋 타입이나 라벨 정보, 필수로 입력받아야 하는지 등등)
//  * @param {string} value 컴포넌트 속성의 value 값
//  * @param {function} onChange 컴포넌트 속성의 onChange 함수
//  * @returns
//  */
// function TransformField(props) {
//   const { type, defaultValue, ...properties } = props;
//   if (properties.value === undefined) {
//     properties.value = defaultValue;
//   }
//   switch (type) {
//     case PROPERTY_TYPE_STRING:
//       return <TextField {...properties} />;
//     case PROPERTY_TYPE_BOOLEAN:
//       return <CheckboxComponent {...properties} />;
//     case PROPERTY_TYPE_SELECT:
//       return <SelectComponent {...properties} />;
//     case PROPERTY_TYPE_DATE:
//       return <DatePickerComponent {...properties} />;
//     default:
//       return;
//   }
// }

/**
 * 컴포넌트 type에 따라 속성을 입력하는 필드들을 모은 컴포넌트
 * @param {string} componentId 컴포넌트 UUID
 * @param {string} componentType 컴포넌트 타입
 * @returns
 */
function ComponentForm({ componentId, componentType }) {
  const dispatch = useDispatch();
  const inputs = useSelector(
    (state) => state.calculetEditor.components[componentId]
  ); // 컴포넌트 속성에 대한 인풋값
  const [properties] = useState({
    ...Common,
    ...Components[componentType],
  });
  const [optionIdx, setOptionIdx] = useState(PROPERTY_OPTION_START_NUMBER + 1); // 단일 선택 컴포넌트에 대한 옵션 개수

  useEffect(() => {
    // option이 있는 컴포넌트의 optionIdx 값 초기화
    if (properties.options) {
      const inputOptions = Object.keys(inputs.options);
      const lastOptionNum = Number(inputOptions[inputOptions.length - 1]);
      setOptionIdx((optionIdx) => lastOptionNum + 1);
    }
  }, [inputs.options, properties.options]);

  // // 컴포넌트 속성 인풋 onChange 함수
  // const onInputsChange = useCallback(
  //   (e) => {
  //     let { id, value } = e.target; // id: componentOption의 key값 (속성 이름)
  //     if (id && properties[id].type === PROPERTY_TYPE_BOOLEAN) {
  //       value = e.target.checked;
  //     } else if (id === undefined) {
  //       id = e.target.name;
  //     }
  //     dispatch(onUpdateComponent({ componentId, targetId: id, value }));
  //   },
  //   [properties, componentId, dispatch]
  // );

  // TODO 입력 검증 필요
  // // 속성이 유효한지 확인하는 함수
  // const invalidComponentOption = useCallback(
  //   (data) => {
  //     for (const key in properties) {
  //       if (properties[key].required && !inputs[key]) {
  //         return false;
  //       }
  //     }
  //     if (!data.isInput && !data.isOutput) {
  //       return false;
  //     }
  //     return true;
  //   },
  //   [properties, inputs]
  // );

  // 옵션 추가하는 함수
  const addOption = useCallback(() => {
    dispatch(
      onUpdateComponent({
        componentId,
        targetId: "options",
        value: { ...inputs.options, [optionIdx]: {} },
      })
    );

    setOptionIdx((optionIdx) => optionIdx + 1);
  }, [inputs.options, optionIdx, setOptionIdx, componentId, dispatch]);

  // 옵션 삭제하는 함수
  const deleteOption = useCallback(
    (e) => {
      const target = e.target.parentElement;
      const { [target.id]: temp, ...rest } = inputs.options;
      dispatch(
        onUpdateComponent({ componentId, targetId: "options", value: rest })
      );
    },
    [inputs.options, componentId, dispatch]
  );

  // 옵션 onChange 함수
  const onOptionsChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      const [name, idx] = id.split(" "); // 속성 이름과 옵션 번호

      dispatch(
        onUpdateComponent({
          componentId,
          targetId: "options",
          value: {
            ...inputs.options,
            [idx]: { ...inputs.options[idx], [name]: value },
          },
        })
      );
    },
    [inputs.options, componentId, dispatch]
  );

  // console.log("속성 컴포넌트 정보", properties);
  // console.log("컴포넌트 옵션 정보", inputs);

  return (
    <Grid container sx={{ backgroundColor: "white" }}>
      <>
        {Object.entries(properties).map(([id, property], index) => (
          <Transformer
            data={{ ...property, id: id, value: inputs[id] }}
            key={index}
            updateValue={(newValue) => {
              dispatch(
                onUpdateComponent({
                  componentId,
                  targetId: id,
                  value: newValue,
                })
              );
            }}
          />
        ))}
      </>
      {properties.options && (
        <div>
          <button onClick={addOption}>옵션 추가</button>
          {Object.entries(inputs.options).map(([id, value], index) => (
            <div id={id} key={index}>
              {Object.entries(Option).map(([key, optionProperty]) => (
                <Transformer
                  data={{
                    ...optionProperty,
                    id: `${key} ${id}`,
                    value: inputs.options[id][key],
                    onChange: onOptionsChange,
                  }}
                  key={`${key}${id}`}
                />
              ))}
              <button onClick={deleteOption}>옵션 삭제</button>
            </div>
          ))}
        </div>
      )}
    </Grid>
  );
}

export default ComponentForm;
