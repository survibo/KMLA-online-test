/**
 * Page content is centralized here so page-specific edits and future
 * API integration stay decoupled from layout JSX.
 */
export const homePageContent = {
  layout: {
    headerHeight: "11.5rem",
    footerHeight: "6.5rem",
    contentTopSpacing: "2.5rem",
    contentBottomSpacing: "2rem",
    featuredSectionMinHeight: "0px",
    carouselSectionMinHeight: "0px",
    favoritesSectionMinHeight: "0px",
  },
  profile: {
    name: "박강현",
    studentId: "231045",
  },
  headerActions: [
    { id: "search", icon: "search", label: "검색" },
    { id: "profile", icon: "user", label: "프로필" },
    { id: "menu", icon: "menu", label: "메뉴" },
  ],
  quickActions: [
    { id: "homepage", label: "홈페이지", icon: "globe" },
    { id: "library", label: "도서관", icon: "library" },
    { id: "application-status", label: "신청현황", icon: "clipboard-list" },
    { id: "wake-up-song", label: "기상송", icon: "music-4" },
  ],
  featuredCards: [
    {
      id: "announcement",
      title: "전체공지",
      badge: "N",
      message: "[5월 치킨알바 공지]",
      trailing: {
        type: "icon",
        icon: "bell",
      },
    },
    {
      id: "points",
      title: "상벌점 누계",
      message: "이번주는 벌점이 없습니다",
      trailing: {
        type: "value",
        value: "34pt",
      },
    },
  ],
  carousel: {
    total: 6,
    activeIndex: 0,
  },
  favorites: {
    title: "즐겨찾기",
    actionLabel: "더보기",
    posts: [
      {
        id: "free-board-floor-4",
        board: "자유게시판",
        title: "조용히 하세요 4층",
        likes: 6,
        comments: 2,
        isNew: false,
      },
      {
        id: "anonymous-opinion",
        board: "익명게시판",
        title: "안녕하세요 소신발언 하겠습니다",
        likes: 2,
        comments: 1,
        isNew: true,
      },
      {
        id: "executive-report",
        board: "행정위원회",
        title: "7월 행정위원회 공략 이행 보고",
        likes: null,
        comments: null,
        isNew: false,
      },
      {
        id: "question-board",
        board: "질문게시판",
        title: "궁금한게 있는데 이 문제는 어",
        likes: null,
        comments: null,
        isNew: true,
      },
      {
        id: "project-team",
        board: "방탈게시판",
        title: "안녕하세요 융합프로젝트 팀",
        likes: null,
        comments: null,
        isNew: true,
      },
    ],
  },
  bottomTabs: [
    { id: "home", icon: "home", label: "홈", isActive: true },
    { id: "box", icon: "box", label: "서비스" },
    {
      id: "documents",
      icon: "file-text",
      label: "문서",
      notificationDot: true,
    },
    {
      id: "messages",
      icon: "message-circle",
      label: "메시지",
      badgeCount: 2,
    },
    { id: "account", icon: "circle-user-round", label: "내 정보" },
  ],
};
