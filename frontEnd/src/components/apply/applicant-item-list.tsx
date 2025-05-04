import { styled } from "styled-components";

import { ApplicantItem } from "./applicant-item";
import { ApplicantItemProps } from "./type";

import { devLog } from "@/utils/dev-log";

export const ApplicantItemList = ({
  data,
  applyIds,
  setApplyIds,
  isRecruiting,
  setApplyModal,
}: ApplicantItemProps) => {
  devLog("Applicant List: ", applyIds);
  return (
    <>
      {data?.map((applicant) => {
        return (
          <ApplicantItem
            key={applicant.applyId}
            {...applicant}
            selected={applyIds.some(
              (item) =>
                item.applyId === applicant.applyId &&
                item.userId === applicant.applicantInfo.userId,
            )}
            isDeleted={applicant.status === "TRADING_CANCEL"}
            onSelect={() => {
              const id = applicant.applyId;
              const userId = applicant.applicantInfo.userId;
              if (isRecruiting && applicant.isAccepted) {
                setApplyModal("IMPOSSIBLE_SELECT_APPLY");
              } else {
                if (
                  applyIds.some(
                    (item) =>
                      item.applyId === applicant.applyId &&
                      item.userId === applicant.applicantInfo.userId,
                  )
                ) {
                  setApplyIds((prev) => prev.filter((p) => p.applyId !== id));
                } else {
                  setApplyIds((prev) => [
                    ...prev,
                    { applyId: id, userId: userId },
                  ]);
                }
              }
            }}
            isDeletedUser={applicant.applicantInfo.profileImage === ""}
          />
        );
      })}
      <EmptyBox />
    </>
  );
};

const EmptyBox = styled.div`
  height: 30%;
  width: 100%;
`;
