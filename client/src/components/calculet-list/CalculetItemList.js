import React, { useCallback, useEffect } from "react";
import { FlexColumnBox } from "../global-components/FlexBox";
import { ButtonBase, Divider, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import usePage from "../../hooks/usePage";
import { ItemButton } from "../atom-components/Buttons";
import useSx from "../../hooks/useSx";
import useGetCategoryName from "../../hooks/useGetCategoryName";

/**
 * 대분류1, 소분류*, 계산기* 목록들을 나열하여 반환하는 컴포넌트
 * @param {object} item 나열할 대분류, 소분류, 계산기 정보
 * @param {*} contentsShortcut 바로가기 버튼에 대한 정보 (ref 참조 위함)
 * @param {*} setIsActive 바로가기 버튼 활성화 함수
 * @param {*} scrollPosition 현재 스크롤 Y 위치
 */
function CalculetItemList({
  item,
  contentsShortcut,
  setIsActive,
  scrollPosition,
}) {
  const { calculetIdPage } = usePage();
  const { subTitleSx } = useSx();
  const { getCategoryMainName, getCategorySubName } = useGetCategoryName(); // 카테고리 가져오기

  function NoItem() {
    return (
      <Typography variant="body2" color="text.disabled">
        존재하지 않습니다.
      </Typography>
    );
  }

  /**
   * 각 바로가기 버튼에 맞는 대분류의 위치 얻기
   * @param {int} index 바로가기 버튼의 index
   */
  const locationRef = useCallback(
    (index) => {
      // return Math.round(
      //   contentsShortcut[index].itemRef.element.current.getBoundingClientRect()
      //     .top +
      //     window.pageYOffset -
      //     80
      // );
    },
    // [contentsShortcut]
    []
  );

  /**
   * Ref의 위치와 스크롤 Y 위치를 비교하여, 스크롤 Y 에 따라 바로가기 버튼 활성화
   * @param {int} index 바로가기 버튼의 index
   */
  const checkScroll = useCallback(
    (index) => {
      const scrollY = Math.round(scrollPosition);
      return (
        scrollY >= locationRef(index) &&
        contentsShortcut[index] &&
        scrollY < locationRef(index + 1)
      );
    },
    [contentsShortcut, locationRef, scrollPosition]
  );
  const onHandlerSetIsActive = useCallback(() => {
    for (let i = 0; i < contentsShortcut.length; i++)
      if (checkScroll(i)) setIsActive(i);
  }, [checkScroll, contentsShortcut.length, setIsActive]);
  /**
   * useEffect 경고 막기 위함
   */
  useEffect(() => {
    onHandlerSetIsActive();
  }, [onHandlerSetIsActive]);

  /**
   * 계산기 나열
   * @param {object} calculet 계산기 정보 (id, title)
   */
  function handleCalculet(calculet) {
    return (
      <Grid key={calculet.id} item xs={1} sm={1} md={1}>
        <ItemButton
          fullWidth
          sx={{
            height: "100%",
            alignContent: "center",
            justifyContent: "space-between",
            p: "1.2rem 1.6rem",
          }}
          onClick={() => calculetIdPage(calculet.id)}
        >
          <Typography variant="body2">{calculet.title}</Typography>
          <KeyboardArrowRightIcon />
        </ItemButton>
      </Grid>
    );
  }
  /**
   * 소분류 카테고리 나열
   * @param {object} sub 소분류 카테고리 정보 (categorySub, subItems)
   * @param {string} mainId 해당 소분류의 대분류가 '기타 : 99999' 인지 확인 & 소분류 구분하기 위한 대분류 id
   */
  function handleSubList(sub, mainId) {
    const subId = Number(sub[0]); // sub id
    const subItems = sub[1]; // each sub's sub objects

    return (
      <FlexColumnBox key={"sub" + subId} gap="2.4rem" sx={{ width: "100%" }}>
        {mainId !== 99999 && (
          <FlexColumnBox gap="0.8rem">
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                fontWeight: "bold",
              }}
            >
              {getCategorySubName(mainId, subId)}
            </Typography>
            <Grid
              container
              spacing={4}
              columns={{ xs: 1, sm: 2, md: 3 }}
              sx={{ alignContent: "stretch" }}
            >
              {Object.keys(subItems).length !== 0 ? (
                Object.values(subItems).map((calculet) =>
                  handleCalculet(calculet)
                )
              ) : (
                <Grid item xs={1} sm={1} md={1}>
                  <NoItem />
                </Grid>
              )}
            </Grid>
          </FlexColumnBox>
        )}
        {mainId === 99999 && (
          <FlexColumnBox gap="0.8rem">
            <Grid
              container
              spacing={4}
              columns={{ xs: 1, sm: 2, md: 3 }}
              sx={{ alignContent: "stretch" }}
            >
              {Object.keys(subItems).length !== 0 ? (
                Object.values(subItems).map((calculet) =>
                  handleCalculet(calculet)
                )
              ) : (
                <NoItem />
              )}
            </Grid>
          </FlexColumnBox>
        )}
      </FlexColumnBox>
    );
  }
  /**
   * 대분류 카테고리 나열
   * @param {object} main 대분류 카테고리 정보 (categoryMain, mainItemss)
   * @param {int} mainIndex 대분류 카테고리 인덱스
   */
  function handleMainList(main, mainIndex) {
    const mainId = Number(main[0]); // main id
    const mainItems = main[1]; // each main's sub objects
    return (
      <FlexColumnBox key={"main" + mainId} gap="4.8rem">
        <FlexColumnBox gap="2.4rem" sx={{ width: "100%" }}>
          {/* 대분류 버튼 */}
          <ButtonBase
            sx={{ maxWidth: "fit-content", gap: "1.2rem" }}
            ref={contentsShortcut[mainIndex].itemRef.element}
          >
            <Typography sx={{ ...subTitleSx }}>
              {getCategoryMainName(mainId)}
            </Typography>
            <KeyboardArrowRightIcon />
          </ButtonBase>
          {
            /* 각 대분류의 소분류 */
            Object.entries(mainItems).map((sub) => handleSubList(sub, mainId))
          }
        </FlexColumnBox>
        <Divider />
      </FlexColumnBox>
    );
  }
  return (
    <FlexColumnBox gap="4.8rem" sx={{ width: "100%" }}>
      {Object.keys(item).length !== 0 &&
        Object.entries(item).map((main, mainIndex) =>
          // [key, value] 형태로 map
          handleMainList(main, mainIndex)
        )}
    </FlexColumnBox>
  );
}
export default CalculetItemList;

// import Heading from "../atom-components/Heading";
// import { FlexColumnLayout, FlexRowLayout } from "../Layout";
// import styles from "../styles";
// import CalculetItem from "./CalculetItem";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import React, { useCallback, useEffect } from "react";
// import URL from "../PageUrls";

// const Wrapper = styled(FlexRowLayout)`
//   flex-wrap: wrap;
// `;
// /**
//  * 대분류1, 소분류*, 계산기* 목록들을 나열하여 반환하는 컴포넌트
//  * @param {object} item 나열할 대분류, 소분류, 계산기 정보
//  * @param {*} contentsShortcut 바로가기 버튼에 대한 정보 (ref 참조 위함)
//  * @param {*} setIsActive 바로가기 버튼 활성화 함수
//  * @param {*} scrollPosition 현재 스크롤 Y 위치
//  */
// function CalculetItemList({
//   item,
//   contentsShortcut,
//   setIsActive,
//   scrollPosition,
// }) {
//   const navigate = useNavigate();

//   /**
//    * 각 바로가기 버튼에 맞는 대분류의 위치 얻기
//    * @param {int} index 바로가기 버튼의 index
//    */
//   const locationRef = useCallback(
//     (index) => {
//       return Math.round(
//         contentsShortcut[index].itemRef.element.current.getBoundingClientRect()
//           .top +
//           window.pageYOffset -
//           80
//       );
//     },
//     [contentsShortcut]
//   );
//   /**
//    * Ref의 위치와 스크롤 Y 위치를 비교하여, 스크롤 Y 에 따라 바로가기 버튼 활성화
//    * @param {int} index 바로가기 버튼의 index
//    */
//   const checkScroll = useCallback(
//     (index) => {
//       const scrollY = Math.round(scrollPosition);
//       return (
//         scrollY >= locationRef(index) &&
//         contentsShortcut[index] &&
//         scrollY < locationRef(index + 1)
//       );
//     },
//     [contentsShortcut, locationRef, scrollPosition]
//   );
//   const onHandlerSetIsActive = useCallback(() => {
//     for (let i = 0; i < contentsShortcut.length; i++)
//       if (checkScroll(i)) setIsActive(i);
//   }, [checkScroll, contentsShortcut.length, setIsActive]);
//   /**
//    * useEffect 경고 막기 위함
//    */
//   useEffect(() => {
//     onHandlerSetIsActive();
//   }, [onHandlerSetIsActive]);

//   /**
//    * 계산기 나열
//    * @param {object} calculet 계산기 정보 (id, title)
//    */
//   function handleCalculet(calculet) {
//     return (
//       <CalculetItem
//         key={calculet.id}
//         content={calculet.title}
//         onClick={() => navigate(URL.CALCULET + calculet.id)}
//       />
//     );
//   }
//   /**
//    * 소분류 카테고리 나열
//    * @param {object} sub 소분류 카테고리 정보 (categorySub, subItems)
//    * @param {string} categoryMain 해당 소분류의 대분류가 '기타' 인지 확인하기 위한 대분류 이름
//    */
//   function handleSubList(sub, categoryMain) {
//     return (
//       <FlexColumnLayout key={sub.categorySub}>
//         {categoryMain !== "기타" && (
//           <Heading
//             key={sub.categorySub}
//             content={sub.categorySub}
//             h={2}
//             isLine={true}
//           />
//         )}
//         <Wrapper>
//           {sub.subItems.length ? (
//             sub.subItems.map((calculet) => handleCalculet(calculet))
//           ) : (
//             <CalculetItem content="존재하지 않습니다." item={false} />
//           )}
//         </Wrapper>
//       </FlexColumnLayout>
//     );
//   }
//   /**
//    * 대분류 카테고리 나열
//    * @param {object} main 대분류 카테고리 정보 (categoryMain, mainItemss)
//    * @param {int} mainIndex 대분류 카테고리 인덱스
//    */
//   function handleMainList(main, mainIndex) {
//     const etcGap = main.categoryMain !== "기타" ? "28px" : "0px";
//     return (
//       <FlexColumnLayout gap={etcGap} key={main.categoryMain}>
//         <Heading
//           key={main.categoryMain}
//           ref={contentsShortcut[mainIndex].itemRef.element}
//           content={main.categoryMain}
//           h={1}
//           color={styles.styleColor.blue900}
//           isLine={main.categoryMain === "기타" && true}
//         />
//         {main.mainItems.length ? (
//           main.mainItems.map((sub) => handleSubList(sub, main.categoryMain))
//         ) : (
//           <CalculetItem content="존재하지 않습니다." item={false} />
//         )}
//       </FlexColumnLayout>
//     );
//   }
//   return (
//     <FlexColumnLayout gap="56px">
//       {item.map((main, mainIndex) => handleMainList(main, mainIndex))}
//     </FlexColumnLayout>
//   );
// }
// export default CalculetItemList;
