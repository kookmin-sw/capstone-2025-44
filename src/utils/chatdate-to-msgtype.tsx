export const ChatdateToMsgtype = (dateString: string) => {
  const date = new Date(dateString);
  const krDate = new Date(date.getTime() + 9 * 3600000);

  let hours = krDate.getHours();
  const minutes = krDate.getMinutes().toString().padStart(2, "0");
  const plot = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;

  return `${plot} ${hours}:${minutes}`;
};
