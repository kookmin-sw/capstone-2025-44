import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import FemaleSVG from "@/assets/images/female.svg";
import MaleSVG from "@/assets/images/male.svg";
import { Header } from "@/components/profile/header";
import { profileState } from "@/recoil/atoms/profile-state";
import { colorTheme } from "@/style/color-theme";

type GenderPageProps = {
  nextStep: () => void;
};

type GenderType = "male" | "female";

export const GenderPage = ({ nextStep }: GenderPageProps) => {
  const [gender, setGender] = useState<GenderType>();
  const [flipEffect, setFlipEffect] = useState<boolean>(false);

  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    if (gender !== undefined) {
      setProfile((profile) => ({
        ...profile,
        gender,
      }));
      setFlipEffect(true);
    }
  }, [gender]);

  useEffect(() => {
    if (flipEffect)
      setTimeout(() => {
        nextStep();
      }, 1300);
  }, [flipEffect]);

  return (
    <ContentLayout>
      <Header text="성별을 골라주세요!" />
      <GenderContainer>
        <GenderCardWrapper>
          <GenderCardInner
            onClick={() => setGender("female")}
            style={{
              ...(flipEffect &&
                gender === "female" && {
                  transition: "transform 1.3s",
                  transform: "rotateY(360deg)",
                  transformStyle: "preserve-3d",
                }),
            }}
          >
            <GenderCardFront width="100%" src={FemaleSVG} />
            <GenderCardBack style={{ backgroundColor: colorTheme.orange400 }} />
          </GenderCardInner>
          <span>여성</span>
        </GenderCardWrapper>
        <GenderCardWrapper>
          <GenderCardInner
            onClick={() => setGender("male")}
            style={{
              ...(flipEffect &&
                gender === "male" && {
                  transition: "transform 1.3s",
                  transform: "rotateY(360deg)",
                  transformStyle: "preserve-3d",
                }),
            }}
          >
            <GenderCardFront width="100%" src={MaleSVG} />
            <GenderCardBack style={{ backgroundColor: colorTheme.blue900 }} />
          </GenderCardInner>
          <span>남성</span>
        </GenderCardWrapper>
      </GenderContainer>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  margin-top: 86px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const GenderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const GenderCardWrapper = styled.div`
  width: 35vw;
  perspective: 1000px;
  aspect-ratio: 0.89;
  font-size: 1.38rem;
  & span {
    position: absolute;
    left: 50%;
    bottom: -40px;
    transform: translateX(-50%);
    font-size: 1.39rem;
  }
`;

const GenderCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
`;

const GenderCardFront = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  object-fit: cover;
  border-radius: 29px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const GenderCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  transition: transform 1.3s;
  border-radius: 29px;
  background-color: ${colorTheme.orange400};
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;
