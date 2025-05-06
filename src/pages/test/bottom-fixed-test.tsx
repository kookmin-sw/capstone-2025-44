import { BottomFixed } from "@/components/common/bottom-fixed";
import { DefaultLayout } from "@/components/layout/default-layout";
import { Input } from "@/components/profile/input";

export const BottomFixedTest = () => {
  return (
    <DefaultLayout appbar={<div style={{ height: "64px" }}></div>}>
      <Input />
      <BottomFixed>
        <BottomFixed.Button>다음</BottomFixed.Button>
      </BottomFixed>
    </DefaultLayout>
  );
};
