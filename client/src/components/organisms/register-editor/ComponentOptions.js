import {
  PROPERTY_TYPE_STRING,
  PROPERTY_TYPE_BOOLEAN,
  PROPERTY_TYPE_SELECT,
  PROPERTY_OPTION_START_NUMBER,
  // PROPERTY_TYPE_DATE,
} from "../../../constants/calculetComponent";

/**
 * 컴포넌트들에 공통으로 쓰이는 속성
 * key : 속성 이름 (mui에서 쓰이는 속성 이름과 동일)
 * value :
 *   - type : PROPERTY_TYPE_STRING - text field, PROPERTY_TYPE_BOOLEAN - checkbox, PROPERTY_TYPE_SELECT - select box
 *   - value : 기본값
 *   - label : 페이지에 표시되는 이름
 *   - required : 필수로 입력되어야 하는 속성인지
 *   - options : select box에 표시되는 옵션들
 *     - value : 옵션 id (mui에 넘어갈 value)
 *     - label : 페이지에 표시되는 이름
 */
const Common = {
  id: {
    type: PROPERTY_TYPE_STRING,
    label: "변수명",
    value: "",
    required: true,
  },
  label: {
    type: PROPERTY_TYPE_STRING,
    label: "설명",
    value: "",
    required: true,
  },
  required: {
    type: PROPERTY_TYPE_BOOLEAN,
    label: "필수 여부",
    value: false,
    required: false,
  },
  disabled: {
    type: PROPERTY_TYPE_BOOLEAN,
    label: "비활성화",
    value: false,
    required: false,
  },
};

/**
 * 옵션이 있는 컴포넌트의 옵션에 대한 속성 정보
 */
const Option = {
  value: {
    type: PROPERTY_TYPE_STRING,
    label: "value",
    value: "",
    required: true,
  },
  label: {
    type: PROPERTY_TYPE_STRING,
    label: "label",
    value: "",
    required: true,
  },
};

/**
 * 옵션이 있는 컴포넌트의 기본 옵션에 대한 속성 정보
 */
const DefaultOption = {
  id: PROPERTY_OPTION_START_NUMBER,
  value: {
    ...Option.value,
    disabled: true,
  },
  label: {
    ...Option.label,
    disabled: true,
  },
};

/**
 * 텍스트 컴포넌트에 들어가는 공통 속성 정보
 */
const TextOption = {
  isInput: {
    type: PROPERTY_TYPE_BOOLEAN,
    label: "입력 여부",
    value: false,
    required: false,
  },
  isOutput: {
    type: PROPERTY_TYPE_BOOLEAN,
    label: "출력 여부",
    value: false,
    required: false,
  },
  copyButton: {
    type: PROPERTY_TYPE_BOOLEAN,
    label: "복사 버튼",
    value: false,
    required: false,
  },
};

/**
 * 컴포넌트 속성들에 대한 정보를 담은 객체
 */
const Components = {
  typography: {
    ...TextOption,
    variant: {
      type: PROPERTY_TYPE_SELECT,
      label: "종류",
      options: [
        { value: "body1", label: "본문 1" },
        { value: "body2", label: "본문 2" },
        { value: "button", label: "굵은 글씨" },
        { value: "caption", label: "설명 글씨" },
        { value: "h1", label: "제목 1" },
        { value: "h2", label: "제목 2" },
        { value: "h3", label: "제목 3" },
        { value: "h4", label: "제목 4" },
        { value: "h5", label: "제목 5" },
        { value: "h6", label: "제목 6" },
        { value: "overline", label: "얇은 글씨" },
        { value: "subtitle1", label: "소제목 1" },
        { value: "subtitle2", label: "소제목 2" },
        { value: "string", label: "텍스트" },
      ],
      required: false,
      value: "body1",
    },
    content: {
      type: PROPERTY_TYPE_STRING,
      label: "내용",
      value: "",
      required: true,
    },
  },
  textField: {
    ...TextOption,
    type: {
      type: PROPERTY_TYPE_SELECT,
      label: "타입",
      options: [
        { value: "text", label: "문자열" },
        { value: "email", label: "이메일" },
        { value: "tel", label: "전화번호" },
        { value: "number", label: "숫자" },
        { value: "password", label: "비밀번호" },
      ],
      required: false,
      value: "text",
    },
    placeholder: {
      type: PROPERTY_TYPE_STRING,
      label: "placeholder",
      value: "",
      required: false,
    },
    value: {
      type: PROPERTY_TYPE_STRING,
      label: "기본값",
      value: "",
      required: false,
    },
  },
  // datePicker: {
  //   value: {
  //     type: PROPERTY_TYPE_DATE,
  //     label: "기본값",
  //     value: "",
  //     required: false,
  //   },
  // },
  select: {
    options: [DefaultOption],
  },
  multiSelect: {
    options: [DefaultOption],
  },
  checkbox: {
    value: {
      type: PROPERTY_TYPE_BOOLEAN,
      label: "체크 여부",
      value: false,
      required: false,
    },
  },
  multiCheckbox: {
    options: [DefaultOption],
  },
  radio: {
    options: [DefaultOption],
  },
  inputHelper: {
    target: {
      type: PROPERTY_TYPE_STRING,
      label: "입력될 입력창의 변수명",
      value: "",
      required: true,
    },
    options: [DefaultOption],
  },
  calculetButton: {},
};

export { Common, Option, Components };
