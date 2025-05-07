export const BackdateToItemtype = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "short" });
  const hours = date.getHours();
  const period = hours >= 12 ? '오후' : '오전';
  const hours12 = hours % 12 || 12; // 0인 경우 12로 변환
  const minutes = date.getMinutes();

  const monthStr = `${month}월`;
  const dayStr = `${day}일`;
  const dayOfWeekStr = `(${dayOfWeek})`;
  const hoursStr = `${period} ${hours12}시`;
  const minutesStr = `${minutes}분`;

  return `${monthStr} ${dayStr} ${dayOfWeekStr} ${hoursStr} ${minutesStr}`;
};
