import { styled } from "styled-components";

import CameraSVG from "@/assets/icons/camera.svg";
import { Description as OriginDescription } from "@/components/profile/description";
import { Header } from "@/components/profile/header";
import { colorTheme } from "@/style/color-theme";
import { scaleUpDown } from "@/style/keyframes";

type PhotoDescriptionPageProps = {
  nextStep: () => void;
};

export const PhotoDescriptionPage = ({
  nextStep,
}: PhotoDescriptionPageProps) => {
  return (
    <ContentLayout>
      <Header text="프로필 사진을\n촬영해주세요!" />
      <ContentBox>
        <CameraIconBackground>
          <img
            width="100%"
            height="100%"
            src={CameraSVG}
            style={{ objectFit: "cover" }}
            onClick={() => nextStep()}
          />
        </CameraIconBackground>
        <Description text="눌러서 촬영시작!" className="image-description" />
      </ContentBox>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CameraIconBackground = styled.div`
  width: 40%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  box-shadow: 0 0 10px 10px ${colorTheme.orange400};
  animation-name: ${scaleUpDown};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const Description = styled(OriginDescription)`
  color: #f17547;
  font-weight: 500;
`;
