import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { ProfileEditModal } from "./profile-edit/profile-edit-modal";

import DotMenuSVG from "@/assets/icons/dots-menu.svg";
import FemaleSVG from "@/assets/icons/female.svg";
import KnotWhiteBackSVG from "@/assets/icons/knot-white-back.svg";
import LocationWhiteBackSVG from "@/assets/icons/location-white-back.svg";
import MaleSVG from "@/assets/icons/male.svg";
import PersonSVG from "@/assets/icons/person-white-back.svg";
import NotregisteredUserSVG from "@/assets/images/deleted-user-back-exist.svg";
import { DropDownMenu } from "@/components/common/drop-down-menu";
import { Modal } from "@/components/common/modal";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { useSignOut } from "@/hooks/queries/useSignOut";
import { useWithdrawal } from "@/hooks/queries/useWithdrawal";
import { colorTheme } from "@/style/color-theme";

export const MypageListProfile = () => {
  const { data: myProfile } = useGetProfile();
  const { data: bankAccount } = useGetBankData();
  // TODO: 연동
  const { mutate: signOut } = useSignOut();
  const { mutate: withdrawal } = useWithdrawal();
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const [profileModal, setProfileModal] = useState<boolean>(false);

  const [withdrawalModal, setWithDrawalModal] = useState<boolean>(false);
  const [signOutModal, setSignOutModal] = useState<boolean>(false);

  return (
    <Wrapper>
      <ProfileImg
        src={
          myProfile?.profileImage.length
            ? myProfile?.profileImage
            : NotregisteredUserSVG
        }
        onClick={() => setProfileModal(true)}
      />
      <ColumnBox>
        <ProfileRowBox>
          <Name>{myProfile?.nickName}</Name>
          <OtherStateIcon
            src={myProfile?.gender == "male" ? MaleSVG : FemaleSVG}
          />
          <SexAge>
            {myProfile?.gender == "male" ? "남" : "여"} /{" "}
            {Number(myProfile?.ageRange) * 10}대
          </SexAge>
          <MenuBox>
            <MenuSVG src={DotMenuSVG} onClick={() => setShow(!show)} />
            {show && (
              <>
                <DropDownMenu>
                  <DropDownMenu.MenuItem
                    onClick={() => {
                      setShow(false);
                      setSignOutModal(true);
                    }}
                  >
                    로그아웃하기
                  </DropDownMenu.MenuItem>
                  <DropDownMenu.MenuItem
                    onClick={() => {
                      setShow(false);
                      setWithDrawalModal(true);
                    }}
                  >
                    탈퇴하기
                  </DropDownMenu.MenuItem>
                  <DropDownMenu.MenuItem
                    onClick={() => {
                      navigate("/notion/terms");
                    }}
                  >
                    이용약관보기
                  </DropDownMenu.MenuItem>
                  <DropDownMenu.MenuItem
                    onClick={() => {
                      navigate("/notion/policy");
                    }}
                  >
                    개인정보보호정책
                  </DropDownMenu.MenuItem>
                </DropDownMenu>
              </>
            )}
          </MenuBox>
        </ProfileRowBox>
        {show && <MenuBackground onClick={() => setShow(false)} />}
        <StateOrangeBox>
          <PriceStateBox>
            <KnotIconImg src={KnotWhiteBackSVG} />
            <KnotPriceState>{bankAccount?.totalBudget}</KnotPriceState>
            <KnotPriceWon>타임</KnotPriceWon>
          </PriceStateBox>
          <OtherStateColumnBox>
            <PriceStateBox style={{ width: "5rem" }}>
              <OtherStateIcon src={LocationWhiteBackSVG} />
              <div>{myProfile?.address}</div>
            </PriceStateBox>
            <PriceStateBox style={{ width: "5rem" }}>
              <OtherStateIcon src={PersonSVG} />
              <div>도움횟수 {myProfile?.dealCount}</div>
            </PriceStateBox>
          </OtherStateColumnBox>
        </StateOrangeBox>
      </ColumnBox>

      {/** Modal */}
      {profileModal && (
        <ProfileEditModal
          profileData={myProfile!}
          onClose={() => setProfileModal(false)}
        />
      )}
      {withdrawalModal && (
        <Modal onClose={() => setWithDrawalModal(false)}>
          <Modal.Title text="탈퇴하시겠습니까?" />
          <Modal.Button color="orange" onClick={() => withdrawal()}>
            탈퇴하기
          </Modal.Button>
        </Modal>
      )}
      {signOutModal && (
        <Modal onClose={() => setSignOutModal(false)}>
          <Modal.Title text="로그아웃\n하시겠습니까?" />
          <Modal.Button color="orange" onClick={() => signOut()}>
            로그아웃
          </Modal.Button>
        </Modal>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${colorTheme.blue100};
  border-top-left-radius: 0.83rem;
  border-top-right-radius: 0.83rem;
  padding: 1.44rem 0 1.4rem 4.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.3%;
`;
//padding: 1.44rem 0 1.4rem 9%; -> padding: 1.44rem 0 1.4rem 4.5% 
//http://localhost:3000/mypage 프로필 사진 위치 왼쪽으로 이동
const ProfileImg = styled.img`
  width: 5rem;
  aspect-ratio: 1;
  border-radius: 0.56rem;
  border: 4px solid ${colorTheme.orange400};
  object-fit: cover;
`;
//기존 width 4.33rem -> 5
//http://localhost:3000/mypage 프로필사진 크기 조절
//border: 3px solid ${colorTheme.orange400}; < 프로필 사진 테두리 두께 조절
//기존 3px -> 4px

const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 9px;
`;

const ProfileRowBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 1%;
  white-space: nowrap;
`;

const Name = styled.div`
  font-size: 1.4rem;
`;
//기존 1.39rem-> 1.4
//http://localhost:3000/mypage 이름 크기 조절

const SexAge = styled.div`
  font-size: 1.4rem;
  color: ${colorTheme.shade};
`;
//기존 0.56rem -> 1.4
//http://localhost:3000/mypage 성별 나이 크기 조절

const MenuBox = styled.div`
  position: absolute;
  right: 3.3%;
  height: 32px;
`;
//기존 25px ->32
//http://localhost:3000/mypage 점세개 메뉴 크기 조절

const MenuSVG = styled.img`
  height: 100%;
`;

const MenuBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(217, 217, 217, 0.8);
  left: 0;
  top: 0;
`;

const StateOrangeBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 1.11rem;
  border-bottom-left-radius: 1.11rem;
  width: 100%;
  background-color: ${colorTheme.orange300};
  color: white;
  padding: 7px 6% 7px 4.5%;
`;

const PriceStateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 3%;
  font-size: 0.72rem;
`;
//기존 0.5rem -> 0.72
//http://localhost:3000/mypage 위치, 도움횟수 크기 조절

const KnotIconImg = styled.img`
  width: 1.39rem;
  height: 1.39rem;
`;

const KnotPriceState = styled.div`
  font-size: 1.39rem;
  font-weight: bold;
`;

const KnotPriceWon = styled.div`
  font-size: 1rem;
  width: 2.8rem;
`;
//기존 0.722rem -> 1
//http://localhost:3000/mypage 타임 크기 조절

const OtherStateColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.61rem;
  gap: 5px;
`;

const OtherStateIcon = styled.img`
  width: 1.3rem;
  height: 1.3rem;
`;
//기존 width: 0.5rem; -> 1.3rem
//기존 height: 0.68rem; -> 1.3rem
//http://localhost:3000/mypage 성별, 위치, 도움횟수 왼쪽 아이콘 크기 조절