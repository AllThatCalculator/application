import { useState } from "react";
import ModalCalculetInfo from "../calculet-block/ModalCalculetInfo";
import { useEffect } from "react";
import { Avatar, Divider, Grid, IconButton, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FlexBox } from "../global-components/FlexBox";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { CountButton } from "../atom-components/Buttons";
import useSx from "../../hooks/useSx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import PopupList from "../global-components/PopupList";
import Title from "../global-components/Title";
import putCalculetLike from "../../user-actions/putCalculetLike";
import putCalculetBookmark from "../../user-actions/putCalculetBookmark";
import { useSelector } from "react-redux";
import usePage from "../../hooks/usePage";

function CalculetHeader({ calculetObj, updateLog }) {
  const { boxSx } = useSx();
  const { loginPage } = usePage();

  const statistics = calculetObj.statistics;
  const userCalculet = calculetObj.userCalculet;
  const contributor = calculetObj.contributor;
  const title = calculetObj.title;
  // const [statistics, setStatistics] = useState(calculetObj.statistics);
  // const [userCalculet, setUserCalculet] = useState(calculetObj.userCalculet);
  // const [contributor, setContributor] = useState(calculetObj.contributor);
  // const [title, setTitle] = useState(calculetObj.title);

  // user id token
  const { idToken } = useSelector((state) => ({
    idToken: state.userInfo.idToken,
  }));

  /**
   * 좋아요 관련 정보
   * {int} number: 해당 계산기의 좋아요 수
   * {boolean} liked: 현재 유저가 좋아요를 눌렀는지 여부
   */
  const [likeObj, setLikeObj] = useState({
    number: statistics.like,
    liked: userCalculet.liked,
  });
  /**
   * 북마크 관련 정보
   * {int} number: 해당 계산기의 북마크 수
   * {boolean} bookmarked: 현재 유저가 북마크로 설정했는지 여부
   */
  const [bookmarkObj, setBookmarkObj] = useState({
    number: statistics.bookmark,
    bookmarked: userCalculet.bookmarked,
  });

  /**
   * 확률 정보 바뀌면 좋아요 수와 북마크 수 다시 변경되도록
   */
  useEffect(() => {
    setLikeObj({ number: statistics.like, liked: userCalculet.liked });
    setBookmarkObj({
      number: statistics.bookmark,
      bookmarked: userCalculet.bookmarked,
    });
  }, [statistics, userCalculet.bookmarked, userCalculet.liked]);

  /**
   * 좋아요 버튼 이벤트 함수
   * - 좋아요 수 변경, 아이콘 색 채움 여부 변경
   * - 추후 DB 갱신을 위한 백엔드와의 통신 필요
   */
  async function toggleLike() {
    // idToken 없으면, 로그인하러 가기
    if (!idToken) {
      loginPage();
      return;
    }

    await putCalculetLike(likeObj.liked, calculetObj.id, idToken)
      .then((result) => {
        setLikeObj((prev) => ({
          number: result.likeCnt,
          liked: !prev.liked,
        }));
      })
      .catch((result) => {
        setLikeObj((prev) => ({
          number: result.likeCnt,
          liked: prev.liked,
        }));
      });
  }

  /**
   * 북마크 버튼 이벤트 함수
   * - 북마크 수 변경, 아이콘 색 채움 여부 변경
   * - 추후 DB 갱신을 위한 백엔드와의 통신 필요
   */
  async function toggleBookmark() {
    // idToken 없으면, 로그인하러 가기
    if (!idToken) {
      loginPage();
      return;
    }
    await putCalculetBookmark(bookmarkObj.bookmarked, calculetObj.id, idToken)
      .then((result) => {
        setBookmarkObj((prev) => ({
          number: result.bookmarkCnt,
          bookmarked: !prev.bookmarked,
        }));
      })
      .catch((result) => {
        setBookmarkObj((prev) => ({
          number: result.bookmarkCnt,
          bookmarked: prev.bookmarked,
        }));
      });
  }
  /**
   * {bool} modalOpen 계산기 정보 팝업창 불러오기 상태
   */
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * i 버튼 누르면 계산기 정보 팝업창 열림
   * -> 팝업창 X 누르면 팝업창 닫힘
   */
  function onModalOpen() {
    setModalOpen(true);
  }
  function onModalClose() {
    setModalOpen(false);
  }

  ///////////////////////////////////////////////////////////////////////////////
  // ============프로필, 뷰 컴포넌트=================
  function HeaderInfoBox({ icon, text, number, isProfile }) {
    // 내용 컴포넌트
    function Typo({ content }) {
      return (
        <Typography
          color="primary"
          variant="body2"
          sx={{ minWidth: "fit-content" }}
        >
          {content}
        </Typography>
      );
    }
    return (
      <FlexBox sx={boxSx}>
        {/* 프로필 사진 없으면 (icon 빈 문자) 그냥 기본 프로필 이미지 보임 */}
        {isProfile ? (
          <Avatar sx={{ width: 28, height: 28 }} src={icon} />
        ) : (
          icon
        )}
        <Typo content={text} />
        {!isProfile && <Typo content={number} />}
      </FlexBox>
    );
  }
  // 프로필, 계산기 본 사람 수
  const infoList = [
    {
      icon: contributor.profileImgSrc,
      text: contributor.userName,
      isProfile: true,
      number: null,
    },
    {
      icon: <VisibilityIcon color="primary" />,
      text: "조회수",
      isProfile: false,
      number: statistics.view,
    },
  ];
  // =================계산기 이름, 정보=================
  function CalculetTitle() {
    return (
      <>
        <Title content={title} />
        <IconButton color="primary" onClick={onModalOpen}>
          <InfoOutlinedIcon />
        </IconButton>
      </>
    );
  }

  const StatisticsList = [
    {
      text: "좋아요",
      icon: <FavoriteBorderOutlinedIcon />,
      clickedIcon: <FavoriteOutlinedIcon />,
      number: likeObj.number,
      isClicked: likeObj.liked,
      onClick: toggleLike,
    },
    {
      text: "북마크",
      icon: <TurnedInNotOutlinedIcon />,
      clickedIcon: <TurnedInOutlinedIcon />,
      number: bookmarkObj.number,
      isClicked: bookmarkObj.bookmarked,
      onClick: toggleBookmark,
    },
    {
      text: "신고",
      icon: <FlagOutlinedIcon />,
      clickedIcon: <></>,
      number: statistics.report,
      isClicked: false,
      onClick: () => null,
    },
  ];

  function handleUrlShare() {
    const currUrl = window.location.href; // 현재 url
    navigator.clipboard.writeText(currUrl).then(() => {
      alert("링크를 복사하였습니다.");
    });
  }

  // 더보기
  const moreList = [
    [
      {
        name: "링크 공유",
        icon: <ShareIcon />,
        onClickFuntion: handleUrlShare,
      },
    ],
  ];
  const MorePopupLists = [
    {
      isMd: true,
      popupIcon: <MoreVertIcon />,
      popupTitle: "더보기",
      popupListData: moreList,
      popupContent: null,
    },
  ];

  return (
    <>
      {modalOpen && (
        <ModalCalculetInfo
          contributor={contributor.userName}
          contributorImgSrc={contributor.profileImgSrc}
          statistics={statistics}
          title={title}
          categoryMainId={calculetObj.categoryMainId}
          categorySubId={calculetObj.categorySubId}
          createdAt={calculetObj.createdAt}
          updateLog={updateLog}
          onClick={onModalClose}
        />
      )}
      {/* 계산기 타이틀, 계산기 정보 */}
      <Grid container>
        <CalculetTitle />
      </Grid>
      <Grid container sx={{ alignItems: "center" }}>
        {/* 사용자, 뷰 */}
        <Grid item xs>
          <FlexBox gap="1.2rem">
            {infoList.map((data, index) => (
              <HeaderInfoBox
                key={index}
                icon={data.icon}
                text={data.text}
                number={data.number}
                isProfile={data.isProfile}
              />
            ))}
          </FlexBox>
        </Grid>
        {/* 좋아요, 북마크, 신고 */}
        <Grid item>
          <FlexBox>
            {StatisticsList.map((data, index) => (
              <CountButton
                key={index}
                text={data.text}
                icon={data.icon}
                clickedIcon={data.clickedIcon}
                number={data.number}
                isClicked={data.isClicked}
                onClick={data.onClick}
              />
            ))}
            {MorePopupLists.map((popupData, index) => (
              <PopupList
                key={index}
                popupIcon={popupData.popupIcon}
                popupTitle={popupData.popupTitle}
                popupListData={popupData.popupListData}
                popupContent={popupData.popupContent}
              />
            ))}
          </FlexBox>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}

export default CalculetHeader;

// import { useState } from "react";
// import styled from "styled-components";
// import { BoxIcon } from "../atom-components/BoxIcon";
// import { BtnSmallIcon, BtnStatisticsIcon } from "../atom-components/ButtonIcon";
// import { Modal } from "../global-components/Modal";
// import ModalCalculetInfo from "../calculet-block/ModalCalculetInfo";
// import styles from "../styles";
// import { FlexColumnLayout, FlexRowLayout } from "../Layout";
// import { useEffect } from "react";

// const CalculetName = styled.div`
//   color: ${styles.styleColor.blue900};
//   ${styles.sytleText.text300};
// `;

// const WrapperBox = styled(FlexColumnLayout)`
//   ${styles.sytleText.text50};
// `;

// const WrapperLine = styled(FlexRowLayout)`
//   justify-content: space-between;
// `;

// const WrapperGroup = styled(FlexRowLayout)`
//   align-items: flex-end;
// `;

// const StyledHr = styled.div`
//   height: 1px;
//   background-color: ${styles.styleColor.blue50};
// `;

// function CalculetHeader({
//   title,
//   contributor,
//   contributorImgSrc,
//   statistics,
//   info,
// }) {
//   /**
//    * 좋아요 관련 정보
//    * {int} number: 해당 계산기의 좋아요 수
//    * {boolean} liked: 현재 유저가 좋아요를 눌렀는지 여부
//    */
//   const [likeObj, setLikeObj] = useState({
//     number: statistics.likeCnt,
//     liked: statistics.liked,
//   });
//   /**
//    * 북마크 관련 정보
//    * {int} number: 해당 계산기의 북마크 수
//    * {boolean} bookmarked: 현재 유저가 북마크로 설정했는지 여부
//    */
//   const [bookmarkObj, setBookmarkObj] = useState({
//     number: statistics.bookmarkCnt,
//     bookmarked: statistics.bookmarked,
//   });

//   /**
//    * 확률 정보 바뀌면 좋아요 수와 북마크 수 다시 변경되도록
//    */
//   useEffect(() => {
//     setLikeObj({ number: statistics.likeCnt, liked: statistics.liked });
//     setBookmarkObj({
//       number: statistics.bookmarkCnt,
//       bookmarked: statistics.bookmarked,
//     });
//   }, [statistics]);

//   /**
//    * 좋아요 버튼 이벤트 함수
//    * - 좋아요 수 변경, 아이콘 색 채움 여부 변경
//    * - 추후 DB 갱신을 위한 백엔드와의 통신 필요
//    */
//   async function toggleLike() {
//     if (likeObj.liked) {
//       setLikeObj((prev) => ({ number: prev.number - 1, liked: !prev.liked }));
//     } else {
//       setLikeObj((prev) => ({ number: prev.number + 1, liked: !prev.liked }));
//     }
//   }
//   /**
//    * 북마크 버튼 이벤트 함수
//    * - 북마크 수 변경, 아이콘 색 채움 여부 변경
//    * - 추후 DB 갱신을 위한 백엔드와의 통신 필요
//    */
//   async function toggleBookmark() {
//     if (bookmarkObj.bookmarked) {
//       setBookmarkObj((prev) => ({
//         number: prev.number - 1,
//         bookmarked: !prev.bookmarked,
//       }));
//     } else {
//       setBookmarkObj((prev) => ({
//         number: prev.number + 1,
//         bookmarked: !prev.bookmarked,
//       }));
//     }
//   }
//   /**
//    * {bool} modalOpen 계산기 정보 팝업창 불러오기 상태
//    */
//   const [modalOpen, setModalOpen] = useState(false);

//   /**
//    * i 버튼 누르면 계산기 정보 팝업창 열림
//    * -> 팝업창 X 누르면 팝업창 닫힘
//    */
//   function onModalOpen() {
//     setModalOpen(true);
//   }
//   function onModalClose() {
//     setModalOpen(false);
//   }

//   return (
//     <>
//       {modalOpen && (
//         <Modal
//           onClick={onModalClose}
//           contents={<ModalCalculetInfo info={info} />}
//         />
//       )}
//       <WrapperBox gap="10px">
//         <WrapperLine>
//           <WrapperGroup gap="10px">
//             <CalculetName>{title}</CalculetName>
//             <BtnSmallIcon
//               text="info"
//               icon="InfoCircle"
//               color="blue"
//               onClick={onModalOpen}
//             />
//           </WrapperGroup>
//         </WrapperLine>
//         <WrapperLine>
//           <WrapperGroup gap="10px">
//             <BoxIcon
//               text={contributor}
//               icon="PeopleCircle"
//               profile={contributorImgSrc}
//             />
//             <BoxIcon text="view" icon="EyeFill" number={statistics.viewCnt} />
//           </WrapperGroup>

//           <WrapperGroup gap="10px">
//             <BtnStatisticsIcon
//               text="좋아요"
//               icon="Heart"
//               number={likeObj.number}
//               isClicked={likeObj.liked}
//               onClick={toggleLike}
//             />
//             <BtnStatisticsIcon
//               text="북마크"
//               icon="BookmarkStar"
//               number={bookmarkObj.number}
//               isClicked={bookmarkObj.bookmarked}
//               onClick={toggleBookmark}
//             />
//             <BtnStatisticsIcon
//               text="신고"
//               icon="Flag"
//               number={statistics.reportCnt}
//               isClicked={false}
//               onClick={() => null}
//             />
//           </WrapperGroup>
//         </WrapperLine>
//       </WrapperBox>
//       <StyledHr />
//     </>
//   );
// }

// export default CalculetHeader;
