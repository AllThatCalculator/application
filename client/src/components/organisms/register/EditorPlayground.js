import { useDispatch, useSelector } from "react-redux";
import { Box, Paper, Button, IconButton, Tooltip } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { SRC_CODE_LANGUAGES } from "../../../constants/register";
import { FlexBox, FlexColumnBox } from "../common/FlexBox";
import StyledScrollbar from "../../atoms/StyledScrollbar";
import EditorContainer from "./EditorContainer";
import SubTitle from "../common/SubTitle";
import CodeEditor from "./CodeEditor";
import {
  onClearComponentLayout,
  onUpdateUserFunction,
} from "../../../modules/calculetEditor";
import WarningDialog from "../common/WarningDialog";
import { useState } from "react";
import CodeEditorDrawer from "./CodeEditorDrawer";

function EditorPlayground({}) {
  const dispatch = useDispatch();
  const { components: userEditorComp } = useSelector((state) => ({
    // components
    components: state.calculetEditor,
  }));

  // redux) 편집창 초기화
  function onClickClearUserEditorComp() {
    dispatch(onClearComponentLayout());
  }
  // redux) 계산 함수 입력 이벤트
  function onChangeUserFunction(value) {
    dispatch(onUpdateUserFunction(value));
  }

  /**
   * {bool} modalOpen 편집창 초기화 경고 모달창
   */
  const [clearWarningModalOpen, setClearWarningModalOpen] = useState(false);
  function onClearWarningModalOpen() {
    setClearWarningModalOpen(true);
  }

  const [playgroundHeight, setPlaygroundHeight] = useState(100);

  return (
    <>
      <FlexColumnBox
        sx={{
          width: 1,
          height: 1,
        }}
      >
        <Box sx={{ px: 4, height: 1 }}>
          <FlexBox
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <SubTitle content="편집창" />
            <Tooltip title="편집창 초기화">
              <IconButton
                color="primary"
                size="small"
                sx={{
                  bgcolor: "atcBlue.200",
                  borderColor: "primary",
                  border: "1px solid",
                }}
                onClick={onClearWarningModalOpen}
              >
                <ReplayIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </FlexBox>
          {/* <div
          style={{
            display: isDragging ? "block" : "none",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              // top: "50%",
              transform: "translate(-50%, 250%)",
            }}
          >
            <Typography variant="h5">여기에 드래그 해주세요.</Typography>
          </div>
        </div> */}
          <StyledScrollbar>
            <FlexColumnBox
              gap={0.8}
              sx={{ width: "97%", height: playgroundHeight }}
            >
              <Paper
                elevation={10}
                sx={{
                  width: 1,
                  m: 2,
                }}
              >
                <EditorContainer />
              </Paper>
            </FlexColumnBox>
          </StyledScrollbar>
        </Box>
        <CodeEditorDrawer setPlaygroundHeight={setPlaygroundHeight}>
          <Box
            sx={{
              height: 1,
              overflow: "auto",
            }}
          >
            <FlexColumnBox
              gap={1}
              sx={{
                width: 1,
                height: 1,
                px: 4,
                pt: 1,
                pb: 8,
              }}
            >
              <FlexBox
                sx={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: 1,
                }}
              >
                <SubTitle
                  content="계산 함수 입력"
                  subContent="각각의 컴포넌트들이 제대로 작동되도록 함수를 입력해주세요."
                />
                <Button
                  variant="outlined"
                  sx={{
                    px: 2,
                    bgcolor: "atcBlue.200",
                    height: "fit-content",
                  }}
                >
                  코드 실행
                </Button>
              </FlexBox>
              <CodeEditor
                defaultLanguage={SRC_CODE_LANGUAGES}
                defaultValue={userEditorComp.userFunction}
                setData={onChangeUserFunction}
              />
            </FlexColumnBox>
          </Box>
        </CodeEditorDrawer>
      </FlexColumnBox>
      <WarningDialog
        isOpen={clearWarningModalOpen}
        setIsOpen={setClearWarningModalOpen}
        handleOnClick={onClickClearUserEditorComp}
        title="정말로 편집창을 초기화 하시겠습니까?"
        contentText="초기화 하시면 복구할 수 없습니다."
        actionText="초기화"
      />
    </>
  );
}
export default EditorPlayground;
