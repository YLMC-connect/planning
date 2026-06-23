// 열린문 커넥트 — App canvas composition
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#5B7AB0",
  "fontScale": 1,
  "radiusScale": 1,
  "buttonState": "auto",
  "mobilePreview": true
}/*EDITMODE-END*/;

// Shared context so any screen can override button enabled/disabled state from Tweaks
window.ButtonStateContext = window.ButtonStateContext || React.createContext('auto');

const PRIMARY_OPTIONS = [
  '#5B7AB0',  // calm blue (default)
  '#8FA882',  // sage
  '#D8835C',  // warm coral
  '#B89968',  // warm taupe
];

// Adjust primary-deep & soft when primary changes
function applyPrimary(hex) {
  const rgb = hex.match(/[0-9a-f]{2}/gi).map(h => parseInt(h, 16));
  // darken 18%
  const deep = rgb.map(v => Math.round(v * 0.78));
  // soft 12% tint of color over white
  document.documentElement.style.setProperty('--app-primary', hex);
  document.documentElement.style.setProperty('--app-primary-deep', `rgb(${deep.join(',')})`);
  document.documentElement.style.setProperty('--app-primary-soft', `rgba(${rgb.join(',')}, 0.14)`);
  document.documentElement.style.setProperty('--app-primary-tint',
    `rgb(${rgb.map(v => Math.round(v + (255 - v) * 0.78)).join(',')})`);
}

const ARTBOARD_WIDTH = 360;
const ARTBOARD_HEIGHT = 720;

function b(id, label, screen, props) {
  return { id, label, screen, props };
}

const APP_SECTIONS = [
  {
    id: 'auth',
    title: '온보딩',
    subtitle: '첫 진입부터 가입까지 — 기본 / 에러 / 로딩 / 토스트',
    boards: [
      b('splash', '0 · 스플래시', ScreenSplash),
      b('login', '1 · 로그인 (FUNC-001)', ScreenLogin, { variant: 'default' }),
      b('login-error', '1-1 · 로그인 — 인증 에러', ScreenLogin, { variant: 'error' }),
      b('login-loading', '1-2 · 로그인 — 로딩', ScreenLogin, { variant: 'loading' }),
      b('login-toast', '1-3 · 로그인 — 네트워크 토스트', ScreenLogin, { variant: 'toast' }),
      b('terms', '3 · 약관 동의 (FUNC-003)', ScreenTerms),
      b('terms-sheet', '3-1 · 약관 전문 보기', ScreenTermsSheet),
      b('signup', '4 · 회원가입 (FUNC-002)', ScreenSignup, { variant: 'default' }),
      b('signup-id-dup', '4-1 · 회원가입 — 아이디 중복', ScreenSignup, { variant: 'id-dup' }),
      b('signup-pw-error', '4-2 · 회원가입 — 비밀번호 에러', ScreenSignup, { variant: 'pw-error' }),
      b('signup-phone-fmt', '4-3 · 회원가입 — 연락처 형식 에러', ScreenSignup, { variant: 'phone-error' }),
      b('signup-phone-dup', '4-4 · 회원가입 — 연락처 중복', ScreenSignup, { variant: 'phone-dup' }),
      b('signup-loading', '4-5 · 회원가입 — 로딩', ScreenSignup, { variant: 'loading' }),
      b('signup-complete', '4-6 · 회원가입 완료 — 자동 가입 (FUNC-002)', ScreenSignupResult, { variant: 'matched' }),
      b('signup-pending', '4-7 · 회원가입 완료 — 승인 대기 (FUNC-002)', ScreenSignupResult, { variant: 'pending' }),
    ],
  },
  {
    id: 'home',
    title: '홈',
    subtitle: '앱의 얼굴 · 알림',
    boards: [
      b('home', '홈 (FUNC-049,056 포함)', ScreenHome),
      b('notifications', '알림 목록', ScreenNotifications),
    ],
  },
  {
    id: 'market',
    title: '나눔',
    subtitle: '목록 · 상세(권한별) · 작성 · 신고 · 예외',
    boards: [
      b('market-list', '14 · 목록 — 나눔중 탭 (FUNC-010)', ScreenMarketList, { variant: 'default' }),
      b('market-list-all', '14-1 · 목록 — 전체 탭', ScreenMarketList, { variant: 'tab-all' }),
      b('market-list-reserved', '14-2 · 목록 — 예약중 탭', ScreenMarketList, { variant: 'tab-reserved' }),
      b('market-list-done', '14-3 · 목록 — 나눔완료 탭', ScreenMarketList, { variant: 'tab-done' }),
      b('market-list-empty', '14-4 · 목록 — 빈 상태', ScreenMarketList, { variant: 'empty' }),
      b('market-list-err', '14-5 · 목록 — 네트워크 오류', ScreenMarketList, { variant: 'network-error' }),
      b('market-detail-own', '15 · 상세 — 본인 (FUNC-011)', ScreenMarketDetail, { variant: 'own' }),
      b('market-detail-resv', '15-1 · 상세 — 본인 예약중', ScreenMarketDetail, { variant: 'own-reserved' }),
      b('market-detail-done', '15-2 · 상세 — 본인 나눔완료', ScreenMarketDetail, { variant: 'own-done' }),
      b('market-detail-status', '15-3 · 상태 변경 시트 (FUNC-014)', ScreenMarketDetail, { variant: 'status' }),
      b('market-detail-del', '15-4 · 삭제 확인 (FUNC-015)', ScreenMarketDetail, { variant: 'delete-confirm' }),
      b('market-detail-other', '16 · 상세 — 타인', ScreenMarketDetail, { variant: 'other' }),
      b('market-detail-cmml', '16-A · 댓글 입력 — 멀티라인', ScreenMarketDetail, { variant: 'composer-multiline' }),
      b('market-detail-rep', '16-1 · 신고 시트 (FUNC-019)', ScreenMarketDetail, { variant: 'report' }),
      b('market-detail-rep2', '16-2 · 신고 — 기타 입력', ScreenMarketDetail, { variant: 'report-other-input' }),
      b('market-detail-repts', '16-3 · 신고 — 중복 Toast', ScreenMarketDetail, { variant: 'report-dup-toast' }),
      b('market-detail-deleted', '17 · 예외 — 삭제된 게시글', ScreenMarketDetail, { variant: 'deleted' }),
      b('market-detail-blocked', '17-1 · 예외 — 차단한 사용자 글 (FUNC-020)', ScreenMarketDetail, { variant: 'blocked' }),
      b('market-create', '18 · 작성 (FUNC-012)', ScreenMarketCreate, { variant: 'create' }),
      b('market-create-fill', '18-1 · 작성 — 입력 완료', ScreenMarketCreate, { variant: 'create-filled' }),
      b('market-edit', '18-2 · 수정 (FUNC-013)', ScreenMarketCreate, { variant: 'edit' }),
      b('market-create-back', '18-3 · 작성 — 뒤로가기 경고', ScreenMarketCreate, { variant: 'back-warn' }),
      b('market-create-limit', '18-4 · 작성 — 5개 초과 Toast', ScreenMarketCreate, { variant: 'limit-toast' }),
    ],
  },
  {
    id: 'companion',
    title: '동행',
    subtitle: '소모임 · 봉사',
    boards: [
      b('group-list', '20 · 동행 > 소모임 목록 (FUNC-021)', ScreenGroupList, { variant: 'all' }),
      b('group-list-my-full', '20-1 · 동행 > 내 소모임 전체보기 (FUNC-021)', ScreenGroupList, { variant: 'my-full' }),
      b('service-list', '20-S · 동행 > 봉사 목록', ScreenServiceList),
      b('group-list-err', '20-2 · 동행 > 소모임 — 네트워크 오류', ScreenGroupList, { variant: 'network-error' }),
      b('group-detail-leader', '21 · 상세 — 소모임장 (FUNC-022)', ScreenGroupDetail, { variant: 'leader' }),
      b('group-detail-closed', '21-1 · 상세 — 소모임장 + 모집완료', ScreenGroupDetail, { variant: 'leader-closed' }),
      b('group-detail-del', '21-2 · 삭제 확인 (FUNC-026)', ScreenGroupDetail, { variant: 'delete-confirm' }),
      b('group-detail-member', '21-3 · 상세 — 일반 멤버', ScreenGroupDetail, { variant: 'member' }),
      b('group-detail-leave', '21-4 · 탈퇴 확인 (FUNC-031)', ScreenGroupDetail, { variant: 'leave-confirm' }),
      b('group-detail-lvleader', '21-5 · 소모임장 탈퇴 Toast', ScreenGroupDetail, { variant: 'leader-leave-toast' }),
      b('group-detail-non', '21-6 · 상세 — 비멤버', ScreenGroupDetail, { variant: 'non-member' }),
      b('group-detail-apply', '21-7 · 참여 신청 확인 (FUNC-025)', ScreenGroupDetail, { variant: 'apply-confirm' }),
      b('group-detail-full', '21-8 · 참여 — 인원 초과 Toast (FUNC-033)', ScreenGroupDetail, { variant: 'full-toast' }),
      b('group-detail-nc', '21-9 · 상세 — 비멤버 + 모집완료', ScreenGroupDetail, { variant: 'non-closed' }),
      b('group-detail-deleted', '21-10 · 예외 — 삭제된 소모임', ScreenGroupDetail, { variant: 'deleted-exception' }),
      b('group-create', '22 · 개설 (FUNC-023)', ScreenGroupCreate, { variant: 'create' }),
      b('group-create-fill', '22-1 · 개설 — 입력 완료', ScreenGroupCreate, { variant: 'create-filled' }),
      b('group-edit', '22-2 · 수정 (FUNC-024)', ScreenGroupCreate, { variant: 'edit' }),
      b('group-edit-rangeerr', '22-3 · 수정 — 최대인원 범위 오류', ScreenGroupCreate, { variant: 'range-error' }),
      b('group-edit-membererr', '22-4 · 수정 — 현재 멤버수 미만', ScreenGroupCreate, { variant: 'member-error' }),
      b('group-notice', '23 · 공지 작성 (FUNC-028)', ScreenGroupNotices, { variant: 'create' }),
      b('group-notice-fill', '23-1 · 공지 작성 — 입력 완료', ScreenGroupNotices, { variant: 'create-filled' }),
      b('group-notice-edit', '23-2 · 공지 수정 (FUNC-029)', ScreenGroupNotices, { variant: 'edit' }),
      b('group-notice-del', '23-3 · 공지 삭제 확인 (FUNC-030)', ScreenGroupNotices, { variant: 'delete-confirm' }),
      b('group-members', '24 · 멤버 관리 (FUNC-027)', ScreenGroupMembers, { variant: 'default' }),
      b('group-members-kick', '24-1 · 강퇴 확인', ScreenGroupMembers, { variant: 'kick-confirm' }),
      b('group-members-kickts', '24-2 · 강퇴 Toast', ScreenGroupMembers, { variant: 'kick-toast' }),
      b('group-members-tr', '24-3 · 소모임장 이관 (FUNC-032)', ScreenGroupMembers, { variant: 'transfer' }),
      b('group-members-trcf', '24-4 · 이관 확인', ScreenGroupMembers, { variant: 'transfer-confirm' }),
    ],
  },
  {
    id: 'pray',
    title: '기도',
    subtitle: '고정 12개 방 · 승인 후 입장 · 공통 기도제목 · 완료/응답',
    boards: [
      b('pray-list', '25 · 중보기도 메인 — 일반 성도 (FUNC-040)', ScreenPrayerList, { variant: 'general' }),
      b('pray-list-admin', '25-1 · 중보기도 메인 — 관리자 전용 (FUNC-040,053)', ScreenPrayerList, { variant: 'admin' }),
      b('pray-list-empty', '25-2 · 중보기도 메인 — 빈 상태', ScreenPrayerList, { variant: 'empty' }),
      b('pray-detail', '26 · 기도방 상세 — 기도 탭 (FUNC-041,043,044,045)', ScreenPrayerDetail),
      b('pray-answer', '26-1 · 기도방 상세 — 응답 탭 (FUNC-041,052)', ScreenPrayerDetail, { variant: 'answers' }),
      b('pray-status', '26-2 · 기도방 상세 — 현황 탭 (FUNC-041,043,044,045)', ScreenPrayerDetail, { variant: 'status' }),
      b('pray-detail-empty', '26-3 · 기도방 상세 — 기도제목 없음', ScreenPrayerDetail, { variant: 'pray-empty' }),
      b('pray-status-empty', '26-4 · 기도방 상세 — 현황 없음', ScreenPrayerDetail, { variant: 'status-empty' }),
      b('pray-detail-completed', '26-5 · 기도방 상세 — 기도 완료됨 (FUNC-044)', ScreenPrayerDetail, { variant: 'pray-completed' }),
      b('pray-status-leader', '26-6 · 기도방 상세 — 팀장 좋아요 (FUNC-050)', ScreenPrayerDetail, { variant: 'leader-status' }),
      b('pray-apply', '27 · 참여 신청 (FUNC-042)', ScreenPrayerApply),
      b('pray-approval', '27-1 · 참가 신청 승인·거절 (FUNC-051)', ScreenPrayerApproval),
      b('pray-members', '27-2 · 기도방 멤버 관리 (FUNC-056)', ScreenPrayerMembers),
      b('pray-members-exclude', '27-2-1 · 기도방 멤버 제외 확인 (FUNC-056)', ScreenPrayerMembers, { variant: 'exclude-confirm' }),
      b('pray-members-room-select', '27-2-2 · 관리 기도방 선택 (FUNC-056)', ScreenPrayerMembers, { variant: 'room-select' }),
      b('pray-moderation', '27-3 · 기도제목 검토 (FUNC-054)', ScreenPrayerModeration),
      b('pray-topic-admin', '27-4 · 기도제목 통합관리 (FUNC-055)', ScreenPrayerTopicManage),
      b('pray-urgent-admin', '27-5 · 긴급 기도제목 관리 (FUNC-057)', ScreenPrayerUrgentManage),
      b('pray-offline-match', '27-6 · 오프라인 요청 매칭 (FUNC-058)', ScreenPrayerOfflineMatch),
      b('pray-admin-empty', '27-7 · 중보기도 관리 — 처리할 항목 없음 (FUNC-053)', ScreenPrayerList, { variant: 'admin-empty' }),
      b('pray-request', '28 · 내 기도제목 요청 현황 (FUNC-046)', ScreenPrayerRequest),
      b('pray-write', '29 · 기도제목 등록·수정 (FUNC-046)', ScreenPrayerWrite),
      b('pray-answer-request', '30 · 기도응답 완료 요청 (FUNC-047)', ScreenPrayerWrite, { variant: 'answer-request' }),
      b('pray-answer-approval', '30-1 · 응답완료 승인·반려 (FUNC-048)', ScreenPrayerAnswerApproval),
    ],
  },
  {
    id: 'study',
    title: '삶공부',
    subtitle: '과정 목록 · 상세 · 신청 · 수강 상태 · 운영 관리',
    boards: [
      b('study-list', '31 · 삶공부 전체 과정 목록 (FUNC-060,062)', ScreenStudyList),
      b('study-detail', '32 · 삶공부 과정 상세 (FUNC-061,064~067)', ScreenStudyDetail),
      b('study-apply', '33 · 삶공부 수강 신청 (FUNC-063)', ScreenStudyApply),
      b('study-apply-complete', '33-1 · 수강 신청 완료 (FUNC-063)', ScreenStudyApply, { variant: 'complete' }),
      b('study-history', '34 · 삶공부 수강 상태 조회 (FUNC-064)', ScreenStudyHistory),
      b('study-admin', '35 · 삶공부 과정 운영 관리 (FUNC-059)', ScreenStudyAdminCourses),
      b('study-admin-sessions', '36 · 삶공부 수업 관리 (FUNC-065,067)', ScreenStudyAdminSessions),
    ],
  },
  {
    id: 'me',
    title: 'MY',
    subtitle: '홈 상단 진입 · 프로필 · 활동 · 차단 · 고객센터 · 약관 · 계정',
    boards: [
      b('me', '5 · 마이페이지 (FUNC-005,068)', ScreenMyPage, { variant: 'default' }),
      b('me-logout', '5-1 · 로그아웃 팝업 (FUNC-008)', ScreenLogoutConfirm),
      b('me-edit', '6 · 프로필 수정 (FUNC-006)', ScreenEditProfile, { variant: 'default' }),
      b('me-edit-phone', '6-1 · 프로필 수정 — 연락처 중복', ScreenEditProfile, { variant: 'phone-dup' }),
      b('me-edit-curpw', '6-2 · 프로필 수정 — 현재 비밀번호 오류', ScreenEditProfile, { variant: 'current-pw-error' }),
      b('me-edit-newpw', '6-3 · 프로필 수정 — 새 비밀번호 불일치', ScreenEditProfile, { variant: 'pw-mismatch' }),
      b('me-activity', '7 · 활동 내역 — 나눔 게시글 (FUNC-034)', ScreenActivity, { variant: 'posts' }),
      b('me-activity-c', '7-1 · 활동 내역 — 댓글', ScreenActivity, { variant: 'comments' }),
      b('me-activity-g', '7-2 · 활동 내역 — 소모임', ScreenActivity, { variant: 'groups' }),
      b('me-activity-em', '7-3 · 활동 내역 — 빈 상태', ScreenActivity, { variant: 'empty' }),
      b('me-prayer-history', '7-4 · 중보기도 활동 이력', ScreenPrayerVolunteerHistory),
      b('me-prayer-history-empty', '7-5 · 중보기도 활동 이력 — 빈 상태', ScreenPrayerVolunteerHistory, { variant: 'empty' }),
      b('me-study-completion', '7-6 · 삶공부 수료', ScreenStudyCompletionHistory),
      b('me-blocked', '8 · 차단 사용자 (FUNC-035)', ScreenBlocked, { variant: 'default' }),
      b('me-blocked-cf', '8-1 · 차단 해제 — 확인 (FUNC-036)', ScreenBlocked, { variant: 'confirm' }),
      b('me-blocked-ts', '8-2 · 차단 해제 — Toast', ScreenBlocked, { variant: 'toast' }),
      b('me-blocked-em', '8-3 · 차단 사용자 — 빈 상태', ScreenBlocked, { variant: 'empty' }),
      b('me-faq', '9 · FAQ (FUNC-037)', ScreenFAQ, { variant: 'default' }),
      b('me-faq-em', '9-1 · FAQ — 빈 상태', ScreenFAQ, { variant: 'empty' }),
      b('me-terms', '10 · 이용약관 (FUNC-038)', ScreenTerms2),
      b('me-privacy', '10-1 · 개인정보처리방침 (FUNC-039)', ScreenPrivacy),
      b('me-withdraw', '12 · 회원 탈퇴 (FUNC-009)', ScreenWithdraw, { variant: 'default' }),
      b('me-withdraw-cf', '12-1 · 탈퇴 — 확인 팝업', ScreenWithdraw, { variant: 'confirm' }),
      b('user', '13 · 타 성도 프로필 (FUNC-007)', ScreenUserProfile, { variant: 'default' }),
      b('user-cf', '13-1 · 차단 — 확인 팝업', ScreenUserProfile, { variant: 'block-confirm' }),
      b('user-ts', '13-2 · 차단 — Toast', ScreenUserProfile, { variant: 'block-toast' }),
      b('user-blocked', '13-3 · 차단한 사용자 보기 (FUNC-020)', ScreenUserProfile, { variant: 'blocked' }),
      b('user-withdrawn', '13-4 · 탈퇴한 사용자', ScreenUserProfile, { variant: 'withdrawn' }),
    ],
  },
];

function renderArtboard(board) {
  const Screen = board.screen;
  return (
    <DCArtboard key={board.id} id={board.id} label={board.label} width={ARTBOARD_WIDTH} height={ARTBOARD_HEIGHT}>
      <Screen {...(board.props || {})} />
    </DCArtboard>
  );
}

const PREVIEW_TAB_ROUTES = {
  '홈': 'home',
  '나눔': 'market-list',
  '동행': 'group-list',
  '기도': 'pray-list',
  '삶공부': 'study-list',
};

const PREVIEW_TEXT_ROUTES = [
  ['login', '로그인', 'home'],
  ['login', '회원가입', 'terms'],
  ['terms', '전문 보기', 'terms-sheet'],
  ['terms', '다음', 'signup'],
  ['signup', '중복 확인', 'signup-id-dup'],
  ['signup', '가입 완료', 'signup-complete'],
  ['signup-complete', '홈으로 이동', 'home'],
  ['signup-pending', '로그인으로 돌아가기', 'login'],
  ['home', '내 정보 보기', 'me'],
  ['home', '내 소모임', 'group-list-my-full'],
  ['home', '내 기도', 'pray-detail'],
  ['home', '삶공부 진행', 'study-detail'],
  ['market-list', '글쓰기', 'market-create'],
  ['market-list', '예약중', 'market-list-reserved'],
  ['market-list', '나눔완료', 'market-list-done'],
  ['market-list', '전체', 'market-list-all'],
  ['market-list', '아이 장난감', 'market-detail-other'],
  ['market-list', '토스터기', 'market-detail-other'],
  ['market-list', '유아용 카시트', 'market-detail-other'],
  ['market-list', '어린이 동화책', 'market-detail-other'],
  ['market-list', '도자기 다세트', 'market-detail-other'],
  ['market-list', '아기 가을 옷', 'market-detail-other'],
  ['market-list-all', '나눔중', 'market-list'],
  ['market-list-all', '예약중', 'market-list-reserved'],
  ['market-list-all', '나눔완료', 'market-list-done'],
  ['market-list-all', '아이 장난감', 'market-detail-other'],
  ['market-list-reserved', '전체', 'market-list-all'],
  ['market-list-reserved', '나눔중', 'market-list'],
  ['market-list-reserved', '나눔완료', 'market-list-done'],
  ['market-list-reserved', '토스터기', 'market-detail-other'],
  ['market-list-done', '전체', 'market-list-all'],
  ['market-list-done', '나눔중', 'market-list'],
  ['market-list-done', '예약중', 'market-list-reserved'],
  ['market-list-done', '도자기 다세트', 'market-detail-other'],
  ['market-detail-own', '상태 변경', 'market-detail-status'],
  ['market-detail-own', '수정', 'market-edit'],
  ['market-detail-own', '삭제', 'market-detail-del'],
  ['market-detail-resv', '상태 변경', 'market-detail-status'],
  ['market-detail-resv', '수정', 'market-edit'],
  ['market-detail-resv', '삭제', 'market-detail-del'],
  ['market-detail-done', '삭제', 'market-detail-del'],
  ['market-detail-other', '신고', 'market-detail-rep'],
  ['market-detail-other', '차단', 'user-cf'],
  ['market-detail-rep', '기타', 'market-detail-rep2'],
  ['market-create', '등록', 'market-detail-own'],
  ['market-create-fill', '등록', 'market-detail-own'],
  ['market-edit', '저장', 'market-detail-own'],
  ['group-list', '전체보기', 'group-list-my-full'],
  ['group-list', '봉사', 'service-list'],
  ['group-list', '개설', 'group-create'],
  ['group-list', '토요 산악회', 'group-detail-leader'],
  ['group-list', '독서 나눔', 'group-detail-member'],
  ['group-list', '엄마들의 수다방', 'group-detail-member'],
  ['group-list', '화요 새벽기도회', 'group-detail-non'],
  ['group-list', '어르신 돌봄 봉사', 'group-detail-non'],
  ['group-list', '찬양 동아리', 'group-detail-closed'],
  ['group-list-my-full', '토요 산악회', 'group-detail-leader'],
  ['group-list-my-full', '독서 나눔', 'group-detail-member'],
  ['service-list', '소모임', 'group-list'],
  ['group-detail-leader', '수정', 'group-edit'],
  ['group-detail-leader', '공지', 'group-notice'],
  ['group-detail-leader', '멤버', 'group-members'],
  ['group-detail-leader', '삭제', 'group-detail-del'],
  ['group-detail-member', '탈퇴하기', 'group-detail-leave'],
  ['group-detail-non', '참여 신청하기', 'group-detail-apply'],
  ['group-create', '개설', 'group-detail-leader'],
  ['group-create-fill', '개설', 'group-detail-leader'],
  ['group-edit', '저장', 'group-detail-leader'],
  ['group-notice', '등록', 'group-detail-leader'],
  ['group-notice-fill', '등록', 'group-detail-leader'],
  ['group-notice-edit', '저장', 'group-detail-leader'],
  ['group-notice-edit', '삭제', 'group-notice-del'],
  ['group-members', '강퇴', 'group-members-kick'],
  ['group-members', '이관', 'group-members-tr'],
  ['me', '프로필 수정', 'me-edit'],
  ['me', '내 활동', 'me-activity'],
  ['me', '중보기도 활동 이력', 'me-prayer-history'],
  ['me', '삶공부 수료', 'me-study-completion'],
  ['me', '차단 관리', 'me-blocked'],
  ['me', 'FAQ', 'me-faq'],
  ['me', '약관', 'me-terms'],
  ['me', '개인정보 처리방침', 'me-privacy'],
  ['me', '로그아웃', 'me-logout'],
  ['me', '회원탈퇴', 'me-withdraw'],
  ['me-edit', '저장', 'me'],
  ['me-blocked', '차단 해제', 'me-blocked-cf'],
  ['me-withdraw', '탈퇴하기', 'me-withdraw-cf'],
  ['user', '차단', 'user-cf'],
  ['pray-list', '기도제목 등록', 'pray-write'],
  ['pray-list', '기도제목 등록하기', 'pray-write'],
  ['pray-list', '내 기도제목 전체보기', 'pray-request'],
  ['pray-list', '내 기도제목', 'pray-request'],
  ['pray-list', '중보기도 신청', 'pray-apply'],
  ['pray-list', '신청하기', 'pray-apply'],
  ['pray-list', '월요일 오전 기도방', 'pray-detail'],
  ['pray-list', '내 기도방', 'pray-detail'],
  ['pray-list-admin', '참가 신청', 'pray-approval'],
  ['pray-list-admin', '기도제목 검토', 'pray-moderation'],
  ['pray-list-admin', '기도방 멤버', 'pray-members'],
  ['pray-list-admin', '긴급 기도제목', 'pray-urgent-admin'],
  ['pray-list-admin', '오프라인 요청 매칭', 'pray-offline-match'],
  ['pray-list-admin', '기도제목 통합관리', 'pray-topic-admin'],
  ['pray-detail', '응답', 'pray-answer'],
  ['pray-detail', '현황', 'pray-status'],
  ['pray-answer', '기도', 'pray-detail'],
  ['pray-answer', '현황', 'pray-status'],
  ['pray-status', '기도', 'pray-detail'],
  ['pray-status', '응답', 'pray-answer'],
  ['pray-apply', '신청하기', 'pray-list'],
  ['pray-members', '변경', 'pray-members-room-select'],
  ['pray-members', '제외', 'pray-members-exclude'],
  ['pray-members-room-select', '선택한 기도방 보기', 'pray-members'],
  ['pray-topic-admin', '수술 후 회복', 'pray-answer-approval'],
  ['pray-topic-admin', '아버지의 마음', 'pray-moderation'],
  ['pray-request', '응답완료 요청하기', 'pray-answer-request'],
  ['pray-write', '기도제목 등록하기', 'pray-request'],
  ['pray-answer-request', '응답완료 요청하기', 'pray-request'],
  ['study-list', '생명의 삶', 'study-detail'],
  ['study-list', '새로운 삶', 'study-detail'],
  ['study-list', '경건의 삶', 'study-detail'],
  ['study-list', '확신의 삶', 'study-detail'],
  ['study-list', '하나님을 경험하는 삶', 'study-detail'],
  ['study-list', '생명언어의 삶', 'study-detail'],
  ['study-list', '부부의 삶', 'study-detail'],
  ['study-list', '말씀의 삶', 'study-detail'],
  ['study-list', '기도의 삶', 'study-detail'],
  ['study-list', '수강 현황', 'study-history'],
  ['study-detail', '수강 신청', 'study-apply'],
  ['study-detail', '수강 상태 보기', 'study-history'],
  ['study-detail', '수강 현황', 'study-history'],
  ['study-apply', '수강 신청하기', 'study-apply-complete'],
  ['study-apply-complete', '과정 목록', 'study-list'],
  ['study-apply-complete', '수강 상태 보기', 'study-history'],
  ['study-history', '생명의 삶', 'study-detail'],
  ['study-history', '수료 뱃지 보기', 'me-study-completion'],
  ['study-admin', '출결 입력', 'study-admin-sessions'],
  ['study-admin', '보강 일정', 'study-admin-sessions'],
  ['study-admin', '공지 읽음', 'study-admin-sessions'],
];

function MobilePreview({ sections }) {
  const boards = React.useMemo(
    () => sections.flatMap(section => section.boards.map(board => ({ ...board, section }))),
    [sections]
  );
  const byId = React.useMemo(() => Object.fromEntries(boards.map(board => [board.id, board])), [boards]);
  const [currentId, setCurrentId] = React.useState('home');
  const [history, setHistory] = React.useState([]);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [viewport, setViewport] = React.useState({ w: window.innerWidth, h: window.innerHeight });
  const current = byId[currentId] || byId.home || boards[0];
  const Screen = current.screen;
  const previewScale = Math.min(
    1,
    Math.max(0.72, Math.min((viewport.w - 48) / ARTBOARD_WIDTH, (viewport.h - 140) / ARTBOARD_HEIGHT))
  );

  React.useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const go = React.useCallback((nextId) => {
    if (!byId[nextId] || nextId === currentId) return;
    setHistory(prev => [...prev, currentId]);
    setCurrentId(nextId);
    setPickerOpen(false);
  }, [byId, currentId]);

  const back = React.useCallback(() => {
    setHistory(prev => {
      if (!prev.length) {
        setCurrentId('home');
        return prev;
      }
      const next = prev.slice(0, -1);
      setCurrentId(prev[prev.length - 1]);
      return next;
    });
  }, []);

  const routeFromText = React.useCallback((text) => {
    const matches = PREVIEW_TEXT_ROUTES
      .filter(([from, needle]) => from === currentId && text.includes(needle))
      .sort((a, b) => b[1].length - a[1].length);
    return matches[0]?.[2];
  }, [currentId]);

  const onPreviewClick = (e) => {
    if (e.target.closest('[data-preview-ui]')) return;

    if (e.target.closest('.back')) {
      e.preventDefault();
      e.stopPropagation();
      back();
      return;
    }

    const tab = e.target.closest('.tabbar button');
    if (tab) {
      const next = PREVIEW_TAB_ROUTES[tab.textContent.trim()];
      if (next) {
        e.preventDefault();
        e.stopPropagation();
        go(next);
      }
      return;
    }

    let el = e.target;
    while (el && !el.classList?.contains('phone')) {
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (text && text.length <= 90) {
        const next = routeFromText(text);
        if (next) {
          e.preventDefault();
          e.stopPropagation();
          go(next);
          return;
        }
      }
      el = el.parentElement;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0eee9',
      display: 'grid',
      placeItems: 'center',
      padding: '72px 24px 32px',
      fontFamily: DC.font,
      position: 'relative',
      boxSizing: 'border-box',
    }}>
      <div data-preview-ui style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 10px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.92)',
        boxShadow: '0 10px 30px rgba(0,0,0,.16)',
      }}>
        <button onClick={() => setPickerOpen(true)} style={{
          height: 32,
          padding: '0 14px',
          border: 0,
          borderRadius: 999,
          background: '#1E2920',
          color: '#fff',
          font: 'inherit',
          fontSize: 13,
          fontWeight: 800,
        }}>화면 선택</button>
        <div style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13, fontWeight: 700, color: '#3d3830' }}>
          {current.label}
        </div>
      </div>

      <div style={{ width: ARTBOARD_WIDTH * previewScale, height: ARTBOARD_HEIGHT * previewScale }}>
        <div onClickCapture={onPreviewClick} style={{
          width: ARTBOARD_WIDTH,
          height: ARTBOARD_HEIGHT,
          transform: `scale(${previewScale})`,
          transformOrigin: 'top left',
          boxShadow: '0 24px 70px rgba(0,0,0,.28)',
          overflow: 'hidden',
          background: '#fff',
        }}>
          <Screen key={current.id} {...(current.props || {})} />
        </div>
      </div>

      {pickerOpen && (
        <div data-preview-ui style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: 'rgba(30,35,28,.42)',
          display: 'grid',
          placeItems: 'center',
          padding: 24,
        }} onClick={() => setPickerOpen(false)}>
          <div style={{
            width: 'min(760px, 92vw)',
            maxHeight: '78vh',
            overflow: 'auto',
            borderRadius: 18,
            background: '#fff',
            boxShadow: '0 24px 80px rgba(0,0,0,.28)',
            padding: 18,
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 18, fontWeight: 900 }}>화면 선택</div>
              <button onClick={() => setPickerOpen(false)} style={{
                width: 34,
                height: 34,
                border: 0,
                borderRadius: 999,
                background: 'rgba(0,0,0,.06)',
                font: 'inherit',
                fontWeight: 900,
              }}>×</button>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              {sections.map(section => (
                <div key={section.id}>
                  <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 900, color: '#6a6258' }}>{section.title}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 8 }}>
                    {section.boards.map(board => (
                      <button key={board.id} onClick={() => go(board.id)} style={{
                        minHeight: 42,
                        padding: '9px 11px',
                        borderRadius: 10,
                        border: board.id === current.id ? '1.5px solid var(--app-primary)' : '1px solid rgba(30,41,32,.12)',
                        background: board.id === current.id ? 'var(--app-primary-soft)' : '#fff',
                        color: '#1E2920',
                        textAlign: 'left',
                        font: 'inherit',
                        fontSize: 12,
                        fontWeight: board.id === current.id ? 850 : 650,
                      }}>{board.label}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DesignSystemPage({ onClose }) {
  const colors = [
    ['Primary', '#5B7AB0', '주요 버튼 / 선택 상태'],
    ['Deep sage', '#516B4A', '홈·기도 강조 그라데이션'],
    ['Light sage', '#B5C4A4', '부드러운 보조 톤'],
    ['Amber', '#D2A24C', '대기 / 주의'],
    ['Rose', '#C97C6E', '반려 / 위험'],
    ['Premium bg', 'linear-gradient(180deg, #F8F7F0 0%, #EEF1EA 100%)', '앱 배경'],
  ];
  const icons = [
    ['홈', Icon.home],
    ['나눔', Icon.gift],
    ['동행', Icon.people],
    ['기도', Icon.pray],
    ['삶공부', Icon.book],
    ['MY', Icon.user],
    ['등록', Icon.plus],
    ['이동', Icon.chevron],
  ];

  const cardStyle = {
    background: 'rgba(255,255,255,0.92)',
    border: '1px solid rgba(255,255,255,0.74)',
    borderRadius: 24,
    boxShadow: '0 18px 48px -32px rgba(20,30,18,0.34), 0 1px 3px rgba(20,30,18,0.05)',
    padding: 22,
  };

  return (
    <div data-preview-ui style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F8F7F0 0%, #EEF1EA 100%)',
      fontFamily: DC.font,
      color: '#1E2920',
      padding: '74px 28px 44px',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap: 20, marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 900, color:'#47608E', marginBottom: 8 }}>YLMC CONNECT</div>
            <h1 style={{ margin: 0, fontSize: 34, lineHeight: 1.15, letterSpacing: -0.4 }}>디자인 시스템</h1>
            <p style={{ margin: '10px 0 0', color:'rgba(30,41,32,0.64)', fontSize: 15, lineHeight: 1.6 }}>
              기존의 따뜻한 아이보리·세이지 톤을 유지하고, Lucide 아이콘과 깊이 있는 카드 규칙으로 정리합니다.
            </p>
          </div>
          <button onClick={onClose} style={{
            height: 38,
            padding: '0 16px',
            border: 0,
            borderRadius: 999,
            background: '#1E2920',
            color: '#fff',
            font: 'inherit',
            fontSize: 13,
            fontWeight: 850,
            boxShadow: '0 10px 28px rgba(0,0,0,.16)',
          }}>닫기</button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1.1fr .9fr', gap: 18 }}>
          <section style={cardStyle}>
            <h2 style={{ margin:'0 0 14px', fontSize: 18 }}>Color</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 12 }}>
              {colors.map(([name, value, usage]) => (
                <div key={name} style={{ border:'1px solid rgba(30,41,32,0.08)', borderRadius: 18, overflow:'hidden', background:'#fff' }}>
                  <div style={{ height: 72, background: value }} />
                  <div style={{ padding: 12 }}>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>{name}</div>
                    <div style={{ marginTop: 3, fontSize: 11, color:'rgba(30,41,32,0.54)' }}>{value}</div>
                    <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.35, color:'rgba(30,41,32,0.66)' }}>{usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={{ margin:'0 0 14px', fontSize: 18 }}>Typography</h2>
            <div style={{ fontWeight: 900, fontSize: 32, letterSpacing: -0.4 }}>Pretendard</div>
            <div style={{ marginTop: 8, color:'rgba(30,41,32,0.64)', lineHeight: 1.55 }}>50~60대 사용자를 기준으로 본문은 작게 줄이지 않고, 여백과 굵기로 위계를 만듭니다.</div>
            <div style={{ marginTop: 18, display:'grid', gap: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 900 }}>화면 제목 22 / 900</div>
              <div style={{ fontSize: 16, fontWeight: 850 }}>카드 제목 16 / 850</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color:'rgba(30,41,32,0.72)' }}>본문 14 / line-height 1.55</div>
              <div style={{ fontSize: 12, color:'rgba(30,41,32,0.50)' }}>보조 정보 12</div>
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={{ margin:'0 0 14px', fontSize: 18 }}>Lucide Icons</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 12 }}>
              {icons.map(([label, RenderIcon]) => (
                <div key={label} style={{
                  minHeight: 96,
                  borderRadius: 18,
                  background: '#FAFBF7',
                  border: '1px solid rgba(30,41,32,0.08)',
                  display:'grid',
                  placeItems:'center',
                  gap: 6,
                  color:'#47608E',
                }}>
                  {RenderIcon(28)}
                  <div style={{ fontSize: 12, fontWeight: 800, color:'#1E2920' }}>{label}</div>
                </div>
              ))}
            </div>
          </section>

          <section style={cardStyle}>
            <h2 style={{ margin:'0 0 14px', fontSize: 18 }}>Components</h2>
            <div style={{ display:'grid', gap: 12 }}>
              <div style={{
                padding: 18,
                borderRadius: 20,
                background: 'linear-gradient(130deg, #516B4A 0%, #7F9B72 56%, #B5C4A4 100%)',
                color:'#fff',
                boxShadow: '0 18px 36px -22px rgba(63,91,58,0.74), inset 0 1px 0 rgba(255,255,255,0.20)',
              }}>
                <div style={{ fontSize: 12, fontWeight: 850, opacity: .86 }}>강조 카드</div>
                <div style={{ marginTop: 7, fontWeight: 900, fontSize: 17 }}>오늘의 기도제목</div>
                <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.5, opacity: .88 }}>깊은 그라데이션과 부드러운 그림자로 홈의 중심 정보를 강조합니다.</div>
              </div>
              <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
                <button className="btn btn-primary" style={{ height: 46 }}>주요 버튼</button>
                <button className="btn btn-soft" style={{ height: 46 }}>보조 버튼</button>
                <span className="badge badge-primary">승인</span>
                <span className="badge badge-amber">대기</span>
                <span className="badge badge-rose">반려</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [designSystemOpen, setDesignSystemOpen] = React.useState(false);

  React.useEffect(() => {
    applyPrimary(t.primary);
    document.documentElement.style.setProperty('--app-fs-scale', t.fontScale);
    document.documentElement.style.setProperty('--app-radius-scale', t.radiusScale);
  }, [t.primary, t.fontScale, t.radiusScale]);

  return (
    <>
      <window.ButtonStateContext.Provider value={t.buttonState}>
      {designSystemOpen ? (
        <DesignSystemPage onClose={() => setDesignSystemOpen(false)} />
      ) : t.mobilePreview ? (
        <MobilePreview sections={APP_SECTIONS} />
      ) : (
        <DesignCanvas>
          {APP_SECTIONS.map(section => (
            <DCSection key={section.id} id={section.id} title={section.title} subtitle={section.subtitle}>
              {section.boards.map(renderArtboard)}
            </DCSection>
          ))}
        </DesignCanvas>
      )}
      </window.ButtonStateContext.Provider>

      <button data-preview-ui onClick={() => setTweak('mobilePreview', !t.mobilePreview)} style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 120,
        height: 36,
        padding: '0 14px',
        border: 0,
        borderRadius: 999,
        background: t.mobilePreview ? '#1E2920' : '#fff',
        color: t.mobilePreview ? '#fff' : '#1E2920',
        font: 'inherit',
        fontSize: 13,
        fontWeight: 850,
        boxShadow: '0 10px 28px rgba(0,0,0,.16)',
        cursor: 'pointer',
      }}>
        {t.mobilePreview ? '캔버스 보기' : '모바일 프리뷰'}
      </button>

      <button data-preview-ui onClick={() => setDesignSystemOpen(true)} style={{
        position: 'fixed',
        top: 58,
        right: 16,
        zIndex: 120,
        height: 36,
        padding: '0 14px',
        border: 0,
        borderRadius: 999,
        background: designSystemOpen ? '#1E2920' : '#fff',
        color: designSystemOpen ? '#fff' : '#1E2920',
        font: 'inherit',
        fontSize: 13,
        fontWeight: 850,
        boxShadow: '0 10px 28px rgba(0,0,0,.16)',
        cursor: 'pointer',
      }}>
        디자인 시스템
      </button>

      <TweaksPanel title="Tweaks">
        <TweakSection label="컬러" />
        <TweakColor label="포인트 색상" value={t.primary}
                    options={PRIMARY_OPTIONS}
                    onChange={(v) => setTweak('primary', v)} />
        <TweakSection label="타이포" />
        <TweakRadio label="글자 크기" value={String(t.fontScale)}
                    options={['0.95', '1', '1.08']}
                    onChange={(v) => setTweak('fontScale', Number(v))} />
        <TweakSection label="모서리" />
        <TweakRadio label="둥글기" value={String(t.radiusScale)}
                    options={['0.7', '1', '1.2']}
                    onChange={(v) => setTweak('radiusScale', Number(v))} />
        <TweakSection label="상태" />
        <TweakToggle label="모바일 프리뷰" value={t.mobilePreview}
                     onChange={(v) => setTweak('mobilePreview', v)} />
        <TweakRadio label="버튼 상태" value={t.buttonState}
                    options={['auto', 'enabled', 'disabled']}
                    onChange={(v) => setTweak('buttonState', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
