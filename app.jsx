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

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyPrimary(t.primary);
    document.documentElement.style.setProperty('--app-fs-scale', t.fontScale);
    document.documentElement.style.setProperty('--app-radius-scale', t.radiusScale);
  }, [t.primary, t.fontScale, t.radiusScale]);

  const W = 360, H = 720;

  return (
    <>
      <window.ButtonStateContext.Provider value={t.buttonState}>
      <DesignCanvas>
        <DCSection id="auth" title="온보딩" subtitle="첫 진입부터 가입까지 — 기본 / 에러 / 로딩 / 토스트">
          <DCArtboard id="splash" label="0 · 스플래시" width={W} height={H}><ScreenSplash/></DCArtboard>

          <DCArtboard id="login"         label="1 · 로그인 (FUNC-001)"      width={W} height={H}><ScreenLogin variant="default"/></DCArtboard>
          <DCArtboard id="login-error"   label="1-1 · 로그인 — 인증 에러"    width={W} height={H}><ScreenLogin variant="error"/></DCArtboard>
          <DCArtboard id="login-loading" label="1-2 · 로그인 — 로딩"        width={W} height={H}><ScreenLogin variant="loading"/></DCArtboard>
          <DCArtboard id="login-toast"   label="1-3 · 로그인 — 네트워크 토스트" width={W} height={H}><ScreenLogin variant="toast"/></DCArtboard>

          <DCArtboard id="terms"         label="3 · 약관 동의 (FUNC-003)"   width={W} height={H}><ScreenTerms/></DCArtboard>
          <DCArtboard id="terms-sheet"   label="3-1 · 약관 전문 보기"        width={W} height={H}><ScreenTermsSheet/></DCArtboard>

          <DCArtboard id="signup"           label="4 · 회원가입 (FUNC-002)"      width={W} height={H}><ScreenSignup variant="default"/></DCArtboard>
          <DCArtboard id="signup-id-dup"    label="4-1 · 회원가입 — 아이디 중복"  width={W} height={H}><ScreenSignup variant="id-dup"/></DCArtboard>
          <DCArtboard id="signup-pw-error"  label="4-2 · 회원가입 — 비밀번호 에러" width={W} height={H}><ScreenSignup variant="pw-error"/></DCArtboard>
          <DCArtboard id="signup-phone-fmt" label="4-3 · 회원가입 — 연락처 형식 에러" width={W} height={H}><ScreenSignup variant="phone-error"/></DCArtboard>
          <DCArtboard id="signup-phone-dup" label="4-4 · 회원가입 — 연락처 중복"   width={W} height={H}><ScreenSignup variant="phone-dup"/></DCArtboard>
          <DCArtboard id="signup-loading"   label="4-5 · 회원가입 — 로딩"         width={W} height={H}><ScreenSignup variant="loading"/></DCArtboard>
          <DCArtboard id="signup-complete"  label="4-6 · 회원가입 완료 — 자동 가입 (FUNC-002)" width={W} height={H}><ScreenSignupResult variant="matched"/></DCArtboard>
          <DCArtboard id="signup-pending"   label="4-7 · 회원가입 완료 — 승인 대기 (FUNC-002)" width={W} height={H}><ScreenSignupResult variant="pending"/></DCArtboard>
        </DCSection>

        <DCSection id="home" title="홈" subtitle="앱의 얼굴 · 알림">
          <DCArtboard id="home" label="홈 (FUNC-056 포함)" width={W} height={H}><ScreenHome/></DCArtboard>
          <DCArtboard id="notifications" label="알림 목록" width={W} height={H}><ScreenNotifications/></DCArtboard>
        </DCSection>

        <DCSection id="market" title="나눔" subtitle="목록 · 상세(권한별) · 작성 · 신고 · 예외">
          <DCArtboard id="market-list"          label="14 · 목록 — 나눔중 탭 (FUNC-010)"   width={W} height={H}><ScreenMarketList variant="default"/></DCArtboard>
          <DCArtboard id="market-list-all"      label="14-1 · 목록 — 전체 탭"               width={W} height={H}><ScreenMarketList variant="tab-all"/></DCArtboard>
          <DCArtboard id="market-list-reserved" label="14-2 · 목록 — 예약중 탭"             width={W} height={H}><ScreenMarketList variant="tab-reserved"/></DCArtboard>
          <DCArtboard id="market-list-done"     label="14-3 · 목록 — 나눔완료 탭"           width={W} height={H}><ScreenMarketList variant="tab-done"/></DCArtboard>
          <DCArtboard id="market-list-empty"    label="14-4 · 목록 — 빈 상태"               width={W} height={H}><ScreenMarketList variant="empty"/></DCArtboard>
          <DCArtboard id="market-list-err"      label="14-5 · 목록 — 네트워크 오류"         width={W} height={H}><ScreenMarketList variant="network-error"/></DCArtboard>

          <DCArtboard id="market-detail-own"    label="15 · 상세 — 본인 (FUNC-011)"        width={W} height={H}><ScreenMarketDetail variant="own"/></DCArtboard>
          <DCArtboard id="market-detail-resv"   label="15-1 · 상세 — 본인 예약중"          width={W} height={H}><ScreenMarketDetail variant="own-reserved"/></DCArtboard>
          <DCArtboard id="market-detail-done"   label="15-2 · 상세 — 본인 나눔완료"        width={W} height={H}><ScreenMarketDetail variant="own-done"/></DCArtboard>
          <DCArtboard id="market-detail-status" label="15-3 · 상태 변경 시트 (FUNC-014)"   width={W} height={H}><ScreenMarketDetail variant="status"/></DCArtboard>
          <DCArtboard id="market-detail-del"    label="15-4 · 삭제 확인 (FUNC-015)"        width={W} height={H}><ScreenMarketDetail variant="delete-confirm"/></DCArtboard>

          <DCArtboard id="market-detail-other"  label="16 · 상세 — 타인"                   width={W} height={H}><ScreenMarketDetail variant="other"/></DCArtboard>
          <DCArtboard id="market-detail-cmml"   label="16-A · 댓글 입력 — 멀티라인"          width={W} height={H}><ScreenMarketDetail variant="composer-multiline"/></DCArtboard>
          <DCArtboard id="market-detail-rep"    label="16-1 · 신고 시트 (FUNC-019)"         width={W} height={H}><ScreenMarketDetail variant="report"/></DCArtboard>
          <DCArtboard id="market-detail-rep2"   label="16-2 · 신고 — 기타 입력"              width={W} height={H}><ScreenMarketDetail variant="report-other-input"/></DCArtboard>
          <DCArtboard id="market-detail-repts"  label="16-3 · 신고 — 중복 Toast"            width={W} height={H}><ScreenMarketDetail variant="report-dup-toast"/></DCArtboard>

          <DCArtboard id="market-detail-deleted" label="17 · 예외 — 삭제된 게시글"           width={W} height={H}><ScreenMarketDetail variant="deleted"/></DCArtboard>
          <DCArtboard id="market-detail-blocked" label="17-1 · 예외 — 차단한 사용자 글 (FUNC-020)" width={W} height={H}><ScreenMarketDetail variant="blocked"/></DCArtboard>

          <DCArtboard id="market-create"        label="18 · 작성 (FUNC-012)"               width={W} height={H}><ScreenMarketCreate variant="create"/></DCArtboard>
          <DCArtboard id="market-create-fill"   label="18-1 · 작성 — 입력 완료"              width={W} height={H}><ScreenMarketCreate variant="create-filled"/></DCArtboard>
          <DCArtboard id="market-edit"          label="18-2 · 수정 (FUNC-013)"             width={W} height={H}><ScreenMarketCreate variant="edit"/></DCArtboard>
          <DCArtboard id="market-create-back"   label="18-3 · 작성 — 뒤로가기 경고"           width={W} height={H}><ScreenMarketCreate variant="back-warn"/></DCArtboard>
          <DCArtboard id="market-create-limit"  label="18-4 · 작성 — 5개 초과 Toast"        width={W} height={H}><ScreenMarketCreate variant="limit-toast"/></DCArtboard>
        </DCSection>

        <DCSection id="group" title="소모임" subtitle="목록 · 상세(권한별) · 개설 · 공지 · 멤버">
          <DCArtboard id="group-list"            label="20 · 목록 (FUNC-021)"             width={W} height={H}><ScreenGroupList variant="all"/></DCArtboard>
          <DCArtboard id="group-list-mine"       label="20-1 · 목록 — 내 소모임"            width={W} height={H}><ScreenGroupList variant="mine"/></DCArtboard>
          <DCArtboard id="group-list-mine-em"    label="20-2 · 목록 — 내 소모임 빈 상태"     width={W} height={H}><ScreenGroupList variant="mine-empty"/></DCArtboard>
          <DCArtboard id="group-list-err"        label="20-3 · 목록 — 네트워크 오류"         width={W} height={H}><ScreenGroupList variant="network-error"/></DCArtboard>

          <DCArtboard id="group-detail-leader"   label="21 · 상세 — 소모임장 (FUNC-022)"    width={W} height={H}><ScreenGroupDetail variant="leader"/></DCArtboard>
          <DCArtboard id="group-detail-closed"   label="21-1 · 상세 — 소모임장 + 모집완료"   width={W} height={H}><ScreenGroupDetail variant="leader-closed"/></DCArtboard>
          <DCArtboard id="group-detail-del"      label="21-2 · 삭제 확인 (FUNC-026)"        width={W} height={H}><ScreenGroupDetail variant="delete-confirm"/></DCArtboard>

          <DCArtboard id="group-detail-member"   label="21-3 · 상세 — 일반 멤버"             width={W} height={H}><ScreenGroupDetail variant="member"/></DCArtboard>
          <DCArtboard id="group-detail-leave"    label="21-4 · 탈퇴 확인 (FUNC-031)"        width={W} height={H}><ScreenGroupDetail variant="leave-confirm"/></DCArtboard>
          <DCArtboard id="group-detail-lvleader" label="21-5 · 소모임장 탈퇴 Toast"          width={W} height={H}><ScreenGroupDetail variant="leader-leave-toast"/></DCArtboard>

          <DCArtboard id="group-detail-non"      label="21-6 · 상세 — 비멤버"                width={W} height={H}><ScreenGroupDetail variant="non-member"/></DCArtboard>
          <DCArtboard id="group-detail-apply"    label="21-7 · 참여 신청 확인 (FUNC-025)"    width={W} height={H}><ScreenGroupDetail variant="apply-confirm"/></DCArtboard>
          <DCArtboard id="group-detail-full"     label="21-8 · 참여 — 인원 초과 Toast (FUNC-033)" width={W} height={H}><ScreenGroupDetail variant="full-toast"/></DCArtboard>
          <DCArtboard id="group-detail-nc"       label="21-9 · 상세 — 비멤버 + 모집완료"      width={W} height={H}><ScreenGroupDetail variant="non-closed"/></DCArtboard>

          <DCArtboard id="group-detail-deleted"  label="21-10 · 예외 — 삭제된 소모임"        width={W} height={H}><ScreenGroupDetail variant="deleted-exception"/></DCArtboard>

          <DCArtboard id="group-create"          label="22 · 개설 (FUNC-023)"              width={W} height={H}><ScreenGroupCreate variant="create"/></DCArtboard>
          <DCArtboard id="group-create-fill"     label="22-1 · 개설 — 입력 완료"             width={W} height={H}><ScreenGroupCreate variant="create-filled"/></DCArtboard>
          <DCArtboard id="group-edit"            label="22-2 · 수정 (FUNC-024)"            width={W} height={H}><ScreenGroupCreate variant="edit"/></DCArtboard>
          <DCArtboard id="group-edit-rangeerr"   label="22-3 · 수정 — 최대인원 범위 오류"     width={W} height={H}><ScreenGroupCreate variant="range-error"/></DCArtboard>
          <DCArtboard id="group-edit-membererr"  label="22-4 · 수정 — 현재 멤버수 미만"       width={W} height={H}><ScreenGroupCreate variant="member-error"/></DCArtboard>

          <DCArtboard id="group-notice"          label="23 · 공지 작성 (FUNC-028)"          width={W} height={H}><ScreenGroupNotices variant="create"/></DCArtboard>
          <DCArtboard id="group-notice-fill"     label="23-1 · 공지 작성 — 입력 완료"         width={W} height={H}><ScreenGroupNotices variant="create-filled"/></DCArtboard>
          <DCArtboard id="group-notice-edit"     label="23-2 · 공지 수정 (FUNC-029)"        width={W} height={H}><ScreenGroupNotices variant="edit"/></DCArtboard>
          <DCArtboard id="group-notice-del"      label="23-3 · 공지 삭제 확인 (FUNC-030)"    width={W} height={H}><ScreenGroupNotices variant="delete-confirm"/></DCArtboard>

          <DCArtboard id="group-members"         label="24 · 멤버 관리 (FUNC-027)"          width={W} height={H}><ScreenGroupMembers variant="default"/></DCArtboard>
          <DCArtboard id="group-members-kick"    label="24-1 · 강퇴 확인"                   width={W} height={H}><ScreenGroupMembers variant="kick-confirm"/></DCArtboard>
          <DCArtboard id="group-members-kickts"  label="24-2 · 강퇴 Toast"                  width={W} height={H}><ScreenGroupMembers variant="kick-toast"/></DCArtboard>
          <DCArtboard id="group-members-tr"      label="24-3 · 소모임장 이관 (FUNC-032)"     width={W} height={H}><ScreenGroupMembers variant="transfer"/></DCArtboard>
          <DCArtboard id="group-members-trcf"    label="24-4 · 이관 확인"                   width={W} height={H}><ScreenGroupMembers variant="transfer-confirm"/></DCArtboard>
        </DCSection>

        <DCSection id="pray" title="중보기도" subtitle="고정 12개 방 · 승인 후 입장 · 공통 기도제목 · 완료/응답">
          <DCArtboard id="pray-list"   label="25 · 중보기도 메인 (FUNC-040)" width={W} height={H}><ScreenPrayerList/></DCArtboard>
          <DCArtboard id="pray-detail" label="26 · 기도방 상세 — 기도 탭 (FUNC-041,043,044,045)" width={W} height={H}><ScreenPrayerDetail/></DCArtboard>
          <DCArtboard id="pray-answer" label="26-1 · 기도방 상세 — 응답 탭 (FUNC-048)" width={W} height={H}><ScreenPrayerDetail variant="answers"/></DCArtboard>
          <DCArtboard id="pray-apply" label="27 · 참여 신청 (FUNC-042)" width={W} height={H}><ScreenPrayerApply/></DCArtboard>
          <DCArtboard id="pray-approval" label="27-1 · 참가 신청 승인·거절 (FUNC-051)" width={W} height={H}><ScreenPrayerApproval/></DCArtboard>
          <DCArtboard id="pray-members" label="27-2 · 기도방 멤버 관리 (FUNC-052)" width={W} height={H}><ScreenPrayerMembers/></DCArtboard>
          <DCArtboard id="pray-moderation" label="27-3 · 기도제목 승인·수정·삭제 (FUNC-053)" width={W} height={H}><ScreenPrayerModeration/></DCArtboard>
          <DCArtboard id="pray-urgent-admin" label="27-4 · 긴급 기도제목 관리 (FUNC-054)" width={W} height={H}><ScreenPrayerUrgentManage/></DCArtboard>
          <DCArtboard id="pray-offline-match" label="27-5 · 오프라인 요청자 회원 매칭 (FUNC-055)" width={W} height={H}><ScreenPrayerOfflineMatch/></DCArtboard>
          <DCArtboard id="pray-request" label="28 · 내 기도제목 요청 현황 (FUNC-046)" width={W} height={H}><ScreenPrayerRequest/></DCArtboard>
          <DCArtboard id="pray-write" label="29 · 기도제목 등록·수정 (FUNC-046)" width={W} height={H}><ScreenPrayerWrite/></DCArtboard>
          <DCArtboard id="pray-answer-request" label="30 · 기도응답 완료 요청 (FUNC-047)" width={W} height={H}><ScreenPrayerWrite variant="answer-request"/></DCArtboard>
        </DCSection>

        <DCSection id="study" title="삶공부" subtitle="목록 · 상세 · 수강 신청 · 수강 내역">
          <DCArtboard id="study-list"   label="과정 목록" width={W} height={H}><ScreenStudyList/></DCArtboard>
          <DCArtboard id="study-detail" label="과정 상세" width={W} height={H}><ScreenStudyDetail/></DCArtboard>
          <DCArtboard id="study-apply" label="수강 신청" width={W} height={H}><ScreenStudyApply/></DCArtboard>
          <DCArtboard id="study-history" label="수강 내역" width={W} height={H}><ScreenStudyHistory/></DCArtboard>
        </DCSection>

        <DCSection id="me" title="마이페이지" subtitle="프로필 · 활동 · 차단 · 고객센터 · 약관 · 계정 · 타 성도 프로필">
          <DCArtboard id="me"               label="5 · 마이페이지 (FUNC-005)"      width={W} height={H}><ScreenMyPage variant="default"/></DCArtboard>
          <DCArtboard id="me-logout"        label="5-1 · 로그아웃 팝업 (FUNC-008)"  width={W} height={H}><ScreenLogoutConfirm/></DCArtboard>

          <DCArtboard id="me-edit"          label="6 · 프로필 수정 (FUNC-006)"     width={W} height={H}><ScreenEditProfile variant="default"/></DCArtboard>
          <DCArtboard id="me-edit-phone"    label="6-1 · 프로필 수정 — 연락처 중복"  width={W} height={H}><ScreenEditProfile variant="phone-dup"/></DCArtboard>
          <DCArtboard id="me-edit-curpw"    label="6-2 · 프로필 수정 — 현재 비밀번호 오류" width={W} height={H}><ScreenEditProfile variant="current-pw-error"/></DCArtboard>
          <DCArtboard id="me-edit-newpw"    label="6-3 · 프로필 수정 — 새 비밀번호 불일치" width={W} height={H}><ScreenEditProfile variant="pw-mismatch"/></DCArtboard>

          <DCArtboard id="me-activity"      label="7 · 활동 내역 — 나눔 게시글 (FUNC-034)" width={W} height={H}><ScreenActivity variant="posts"/></DCArtboard>
          <DCArtboard id="me-activity-c"    label="7-1 · 활동 내역 — 댓글"          width={W} height={H}><ScreenActivity variant="comments"/></DCArtboard>
          <DCArtboard id="me-activity-g"    label="7-2 · 활동 내역 — 소모임"         width={W} height={H}><ScreenActivity variant="groups"/></DCArtboard>
          <DCArtboard id="me-activity-em"   label="7-3 · 활동 내역 — 빈 상태"        width={W} height={H}><ScreenActivity variant="empty"/></DCArtboard>

          <DCArtboard id="me-blocked"       label="8 · 차단 사용자 (FUNC-035)"      width={W} height={H}><ScreenBlocked variant="default"/></DCArtboard>
          <DCArtboard id="me-blocked-cf"    label="8-1 · 차단 해제 — 확인 (FUNC-036)" width={W} height={H}><ScreenBlocked variant="confirm"/></DCArtboard>
          <DCArtboard id="me-blocked-ts"    label="8-2 · 차단 해제 — Toast"        width={W} height={H}><ScreenBlocked variant="toast"/></DCArtboard>
          <DCArtboard id="me-blocked-em"    label="8-3 · 차단 사용자 — 빈 상태"      width={W} height={H}><ScreenBlocked variant="empty"/></DCArtboard>

          <DCArtboard id="me-faq"           label="9 · FAQ (FUNC-037)"           width={W} height={H}><ScreenFAQ variant="default"/></DCArtboard>
          <DCArtboard id="me-faq-em"        label="9-1 · FAQ — 빈 상태"           width={W} height={H}><ScreenFAQ variant="empty"/></DCArtboard>

          <DCArtboard id="me-terms"         label="10 · 이용약관 (FUNC-038)"        width={W} height={H}><ScreenTerms2/></DCArtboard>
          <DCArtboard id="me-privacy"       label="10-1 · 개인정보처리방침 (FUNC-039)" width={W} height={H}><ScreenPrivacy/></DCArtboard>

          <DCArtboard id="me-withdraw"      label="12 · 회원 탈퇴 (FUNC-009)"       width={W} height={H}><ScreenWithdraw variant="default"/></DCArtboard>
          <DCArtboard id="me-withdraw-cf"   label="12-1 · 탈퇴 — 확인 팝업"         width={W} height={H}><ScreenWithdraw variant="confirm"/></DCArtboard>

          <DCArtboard id="user"             label="13 · 타 성도 프로필 (FUNC-007)"   width={W} height={H}><ScreenUserProfile variant="default"/></DCArtboard>
          <DCArtboard id="user-cf"          label="13-1 · 차단 — 확인 팝업"          width={W} height={H}><ScreenUserProfile variant="block-confirm"/></DCArtboard>
          <DCArtboard id="user-ts"          label="13-2 · 차단 — Toast"            width={W} height={H}><ScreenUserProfile variant="block-toast"/></DCArtboard>
          <DCArtboard id="user-blocked"     label="13-3 · 차단한 사용자 보기 (FUNC-020)" width={W} height={H}><ScreenUserProfile variant="blocked"/></DCArtboard>
          <DCArtboard id="user-withdrawn"   label="13-4 · 탈퇴한 사용자"            width={W} height={H}><ScreenUserProfile variant="withdrawn"/></DCArtboard>
        </DCSection>
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
