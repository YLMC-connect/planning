// 열린문 커넥트 — App canvas composition
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#5B7AB0",
  "fontScale": 1,
  "radiusScale": 1,
  "buttonState": "auto"
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
      b('home', '홈 (FUNC-056 포함)', ScreenHome),
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
    id: 'group',
    title: '소모임',
    subtitle: '목록 · 상세(권한별) · 개설 · 공지 · 멤버',
    boards: [
      b('group-list', '20 · 목록 (FUNC-021)', ScreenGroupList, { variant: 'all' }),
      b('group-list-mine', '20-1 · 목록 — 내 소모임', ScreenGroupList, { variant: 'mine' }),
      b('group-list-mine-em', '20-2 · 목록 — 내 소모임 빈 상태', ScreenGroupList, { variant: 'mine-empty' }),
      b('group-list-err', '20-3 · 목록 — 네트워크 오류', ScreenGroupList, { variant: 'network-error' }),
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
    title: '중보기도',
    subtitle: '고정 12개 방 · 승인 후 입장 · 공통 기도제목 · 완료/응답',
    boards: [
      b('pray-list', '25 · 중보기도 메인 — 일반 성도 (FUNC-040)', ScreenPrayerList, { variant: 'general' }),
      b('pray-list-admin', '25-1 · 중보기도 메인 — 관리자 전용', ScreenPrayerList, { variant: 'admin' }),
      b('pray-detail', '26 · 기도방 상세 — 기도 탭 (FUNC-041,043,044,045)', ScreenPrayerDetail),
      b('pray-answer', '26-1 · 기도방 상세 — 응답 탭 (FUNC-048)', ScreenPrayerDetail, { variant: 'answers' }),
      b('pray-status', '26-2 · 기도방 상세 — 현황 탭 (FUNC-041,043,044,045)', ScreenPrayerDetail, { variant: 'status' }),
      b('pray-apply', '27 · 참여 신청 (FUNC-042)', ScreenPrayerApply),
      b('pray-approval', '27-1 · 참가 신청 승인·거절 (FUNC-051)', ScreenPrayerApproval),
      b('pray-members', '27-2 · 기도방 멤버 관리 (FUNC-052)', ScreenPrayerMembers),
      b('pray-members-exclude', '27-2-1 · 기도방 멤버 제외 확인 (FUNC-052)', ScreenPrayerMembers, { variant: 'exclude-confirm' }),
      b('pray-moderation', '27-3 · 기도제목 승인·반려 (FUNC-053)', ScreenPrayerModeration),
      b('pray-topic-admin', '27-4 · 기도제목 통합관리 (FUNC-053)', ScreenPrayerTopicManage),
      b('pray-urgent-admin', '27-5 · 긴급 기도제목 관리 (FUNC-054)', ScreenPrayerUrgentManage),
      b('pray-offline-match', '27-6 · 오프라인 요청자 회원 매칭 (FUNC-055)', ScreenPrayerOfflineMatch),
      b('pray-request', '28 · 내 기도제목 요청 현황 (FUNC-046)', ScreenPrayerRequest),
      b('pray-write', '29 · 기도제목 등록·수정 (FUNC-046)', ScreenPrayerWrite),
      b('pray-answer-request', '30 · 기도응답 완료 요청 (FUNC-047)', ScreenPrayerWrite, { variant: 'answer-request' }),
    ],
  },
  {
    id: 'study',
    title: '삶공부',
    subtitle: '목록 · 상세 · 수강 신청 · 수강 내역',
    boards: [
      b('study-list', '과정 목록', ScreenStudyList),
      b('study-detail', '과정 상세', ScreenStudyDetail),
      b('study-apply', '수강 신청', ScreenStudyApply),
      b('study-history', '수강 내역', ScreenStudyHistory),
    ],
  },
  {
    id: 'me',
    title: '마이페이지',
    subtitle: '프로필 · 활동 · 차단 · 고객센터 · 약관 · 계정 · 타 성도 프로필',
    boards: [
      b('me', '5 · 마이페이지 (FUNC-005)', ScreenMyPage, { variant: 'default' }),
      b('me-logout', '5-1 · 로그아웃 팝업 (FUNC-008)', ScreenLogoutConfirm),
      b('me-edit', '6 · 프로필 수정 (FUNC-006)', ScreenEditProfile, { variant: 'default' }),
      b('me-edit-phone', '6-1 · 프로필 수정 — 연락처 중복', ScreenEditProfile, { variant: 'phone-dup' }),
      b('me-edit-curpw', '6-2 · 프로필 수정 — 현재 비밀번호 오류', ScreenEditProfile, { variant: 'current-pw-error' }),
      b('me-edit-newpw', '6-3 · 프로필 수정 — 새 비밀번호 불일치', ScreenEditProfile, { variant: 'pw-mismatch' }),
      b('me-activity', '7 · 활동 내역 — 나눔 게시글 (FUNC-034)', ScreenActivity, { variant: 'posts' }),
      b('me-activity-c', '7-1 · 활동 내역 — 댓글', ScreenActivity, { variant: 'comments' }),
      b('me-activity-g', '7-2 · 활동 내역 — 소모임', ScreenActivity, { variant: 'groups' }),
      b('me-activity-em', '7-3 · 활동 내역 — 빈 상태', ScreenActivity, { variant: 'empty' }),
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

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyPrimary(t.primary);
    document.documentElement.style.setProperty('--app-fs-scale', t.fontScale);
    document.documentElement.style.setProperty('--app-radius-scale', t.radiusScale);
  }, [t.primary, t.fontScale, t.radiusScale]);

  return (
    <>
      <window.ButtonStateContext.Provider value={t.buttonState}>
      <DesignCanvas>
        {APP_SECTIONS.map(section => (
          <DCSection key={section.id} id={section.id} title={section.title} subtitle={section.subtitle}>
            {section.boards.map(renderArtboard)}
          </DCSection>
        ))}
      </DesignCanvas>
      </window.ButtonStateContext.Provider>

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
        <TweakRadio label="버튼 상태" value={t.buttonState}
                    options={['auto', 'enabled', 'disabled']}
                    onChange={(v) => setTweak('buttonState', v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
