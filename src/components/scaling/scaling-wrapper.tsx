import React, { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { scalingState } from "@/recoil/atoms/scaling-state";

export const ScalingWrapper = ({ children }: PropsWithChildren) => {
  const scaling = useRecoilValue(scalingState);

  return (
    <Container>
      <ContentWrapper $scale={scaling.scale}>
        {children}
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const ContentWrapper = styled.div<{ $scale: number }>`
  transform: scale(${props => props.$scale});
  transform-origin: top center;
  width: ${props => 100 / props.$scale}%;
  min-height: 100%;
  transition: transform 0.1s ease-out;
  position: relative;
  z-index: 1;
`;
