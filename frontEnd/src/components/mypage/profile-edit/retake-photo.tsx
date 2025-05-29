import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { Button } from "@/components/common/button";
import Camera from "@/components/common/camera/camera";
import { profileEditState } from "@/recoil/atoms/profile-edit-state";

type RetakePhotoPageProps = {
  onClose: () => void;
};

export const RetakePhotoPage = ({ onClose }: RetakePhotoPageProps) => {
  const [dataUri, setDataUri] = useState("");

  const setProfile = useSetRecoilState(profileEditState);

  const submit = () => {
    if (!dataUri.length) return;
    setProfile((prev) => ({
      ...prev,
      fileByte: dataUri,
    }));
    onClose();
  };

  return (
    <Background>
      <ContentLayout>
        <ButtonContainer>
          {dataUri.length === 0 ? (
            <Button
              onClick={() => {
                setDataUri("");
                onClose();
              }}
            >
              이전
            </Button>
          ) : (
            <Button onClick={() => setDataUri("")}>다시찍기</Button>
          )}
          <Button color={dataUri.length ? "orange" : "blue"} onClick={submit}>
            완료
          </Button>
        </ButtonContainer>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {dataUri.length ? (
            <img
              src={dataUri}
              style={{ width: "100%", aspectRatio: 1, objectFit: "cover" }}
            />
          ) : (
            <Camera setDataUri={setDataUri} />
          )}
        </div>
      </ContentLayout>
    </Background>
  );
};

const Background = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: white;
`;

const ContentLayout = styled.div`
  width: 100%;
  max-width: 480px;
  margin: auto;
  display: flex;
  flex: 1;
  margin-top: 50px;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  z-index: 100;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
`;
