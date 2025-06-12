// react-html5-camera-photo.d.ts
declare module "react-html5-camera-photo" {
  import * as React from "react";

  type CameraProps = {
    isImageMirror?: boolean;
    onTakePhotoAnimationDone?: (dataUri: string) => void;
    imageType?: string;
    imageCompression?: number;
  };

  // React.FC로 명확하게 선언해서 JSX 요소로 인식하도록 함
  const Camera: React.FC<CameraProps>;

  export default Camera;
}
