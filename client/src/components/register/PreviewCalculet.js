import { Divider, IconButton, Typography } from "@mui/material";
import CalculetBlock from "../calculet-block/CalculetBlock";
import { FlexBox } from "../global-components/FlexBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalculetHeader from "../calculet-block/CalculetHeader";
import useSx from "../../hooks/useSx";

/**
 * 계산기 미리보기
 * @param {*} title : 계산기 이름
 * @param {*} userName : 제작자 이름
 * @param {*} profileImgSrc : 제작자 프로필 사진
 * @param {*} srcCode : 계산기 소스 코드 (HTML)
 * @param {*} manual : 계산기 설명 (마크다운)
 * @param {*} handleIsPreview : 미리보기 버튼 핸들러
 */
function PreviewCalculet({
  title,
  userName,
  profileImgSrc,
  srcCode,
  manual,
  handleIsPreview,
}) {
  const { subTitleSx } = useSx();

  const calculetObj = {
    statistics: {
      bookmark: 0,
      like: 0,
      report: 0,
      view: 0,
      user: 0,
      calculation: 0,
    },
    userCalculet: {
      liked: false,
      bookmarked: false,
    },
    contributor: {
      userName: userName,
      profileImgSrc: profileImgSrc,
    },
    title: title,
  };
  return (
    <>
      <FlexBox sx={{ alignItems: "center" }}>
        <IconButton onClick={handleIsPreview}>
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ ...subTitleSx, color: "text.secondary" }}>
          편집 하기
        </Typography>
      </FlexBox>
      <Divider />
      <CalculetHeader
        // 계산기 블록 정보 & 팝업창 정보
        calculetObj={calculetObj}
        isPreview={true}
      />
      <CalculetBlock srcCode={srcCode} manual={manual} />
    </>
  );
}
export default PreviewCalculet;
