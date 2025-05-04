import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { type Swiper as SwiperCore } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { BirthModal } from "./birth-modal";
import { InputWrapper } from "./input-wrapper";
import { RetakePhotoPage } from "./retake-photo";

import { ProfileData } from "@/api/types/profile-type";
import LocationSVG from "@/assets/icons/location.svg";
import { Modal } from "@/components/common/modal";
import { MyProfileModal } from "@/components/common/profile-modal";
import { useEditProfile } from "@/hooks/queries/useEditProfile";
import { profileEditState } from "@/recoil/atoms/profile-edit-state";
import { colorTheme } from "@/style/color-theme";
import { calculateAge } from "@/utils/date-utils";
import { devLog } from "@/utils/dev-log";
import "swiper/css";
import "swiper/css/pagination";
import "./location-swiper.css";
// eslint-disable-next-line import/order

type ProfileEditModalProps = {
  profileData: ProfileData;
  onClose: () => void;
};

const ADDRESS = ["정릉 1동", "정릉 2동", "정릉 3동", "정릉 4동"];

export const ProfileEditModal = ({
  profileData,
  onClose,
}: ProfileEditModalProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [birthEditMode, setBirthEditMode] = useState<boolean>(false);
  const [photoEditMode, setPhotoEditMode] = useState<boolean>(false);

  const [profileEdit, setProfileEdit] = useRecoilState(profileEditState);

  const activeIdx = useRef<number>(0);

  useEffect(() => {
    setProfileEdit(() => ({
      nickName: profileData.nickName,
      gender: profileData.gender,
      address: profileData.address,
      birth: profileData.birth,
      fileByte: profileData.profileImage,
    }));
  }, [profileData]);

  const { mutate } = useEditProfile();

  return (
    <>
      {editMode ? (
        <Modal
          onClose={() => {
            setProfileEdit(() => ({
              nickName: profileData.nickName,
              gender: profileData.gender,
              address: profileData.address,
              birth: profileData.birth,
              fileByte: profileData.profileImage,
            }));
            setEditMode(false);
          }}
        >
          <ModalInner>
            <FormContainer>
              <InputWrapper>
                <NicknameInput
                  type="text"
                  maxLength={5}
                  defaultValue={profileEdit.nickName}
                  onBlur={(e) =>
                    setProfileEdit((prev) => ({
                      ...prev,
                      nickName: e.target.value,
                    }))
                  }
                />
              </InputWrapper>
              <RowBox>
                <InputWrapper>
                  <GenderInput
                    onClick={() =>
                      setProfileEdit((prev) => ({
                        ...prev,
                        gender: prev.gender === "male" ? "female" : "male",
                      }))
                    }
                  >
                    {profileEdit.gender === "male" ? "남" : "여"}
                  </GenderInput>
                </InputWrapper>
                <InputWrapper>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setBirthEditMode(true);
                    }}
                  >
                    {calculateAge(profileEdit.birth)}세
                  </button>
                </InputWrapper>
              </RowBox>
              <Image
                src={profileEdit.fileByte}
                onClick={() => setPhotoEditMode(true)}
              />
              <InputWrapper>
                <Swiper
                  initialSlide={ADDRESS.indexOf(profileData.address)}
                  onSlideChange={(event: SwiperCore) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    activeIdx.current = event.realIndex as number;
                    setProfileEdit((prev) => ({
                      ...prev,
                      address: ADDRESS[activeIdx.current],
                    }));
                  }}
                  slidesPerView={1}
                  spaceBetween={100}
                  loop={true}
                  pagination={true}
                  navigation={{
                    nextEl: ".next",
                  }}
                  modules={[Pagination, Navigation]}
                  bulletclass="swiper-bullet"
                  bulletactiveclass="swiper-acitve-bullet"
                >
                  {ADDRESS.map((location) => (
                    <SwiperSlide key={location} className="next">
                      <LocationImage />
                      {location}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </InputWrapper>
            </FormContainer>
            <Modal.Button
              color="orange"
              onClick={() => {
                const isChanged =
                  profileEdit.fileByte !== profileData.profileImage;
                mutate({
                  ...profileEdit,
                  fileByte: isChanged
                    ? profileEdit.fileByte.replace(
                        "data:image/jpeg;base64,",
                        "",
                      )
                    : null,
                });
                setEditMode(false);
                // setReadyModal(true);
                devLog(profileEdit);
              }}
            >
              편집 완료하기
            </Modal.Button>
          </ModalInner>
        </Modal>
      ) : birthEditMode ? (
        <BirthModal
          onClose={() => {
            setBirthEditMode(false);
            setEditMode(true);
          }}
        />
      ) : (
        <MyProfileModal
          profileData={profileData}
          onEdit={() => setEditMode(true)}
          onClose={() => onClose()}
        />
      )}
      {photoEditMode && (
        <RetakePhotoPage onClose={() => setPhotoEditMode(false)} />
      )}
    </>
  );
};

const ModalInner = styled.div`
  width: 85%;
  max-width: 480px;
  margin: auto;
`;

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  margin-bottom: 1.2rem;
  flex-direction: column;
  gap: 0.72rem;
  justify-content: center;
  align-items: center;
`;

const NicknameInput = styled.input`
  background-color: transparent;
  border: 0;
  text-align: center;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  & > div {
    flex: 1;
  }
`;

const GenderInput = styled.div`
  overflow: hidden;
  transition: all 1s;

  &:active {
    transition: all 0.7s;
    transform: translateX(10%);
  }
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 1.17rem;
  border: 10px solid ${colorTheme.blue100};
  object-fit: cover;
`;

const LocationImage = styled.div`
  display: inline-block;
  width: 0.9rem;
  aspect-ratio: 1;
  background-image: url(${LocationSVG});
  background-size: contain;
  background-repeat: no-repeat;
`;
