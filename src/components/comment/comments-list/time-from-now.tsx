"use client";

import dayjs from "dayjs";
import { useState } from "react";

const TimeFromNow: React.FC<{ time: Date }> = ({ time }) => {
  const timeString = () => {
    const diff = new Date().getTime() - time.getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) {
      return sec + "秒";
    }
    const min = Math.floor(diff / 60000);
    if (min < 60) {
      return min + "分钟";
    }
    const hours = Math.floor(diff / (60000 * 60));
    if (hours < 24) {
      return hours + "小时";
    }
    const days = Math.floor(diff / (60000 * 60 * 24));
    if (days < 31) {
      return days + "天";
    }
    return dayjs(time).format("YYYY年MM月DD日");
  };

  const [fromNow, setFromNow] = useState<string>(timeString());
  setInterval(() => {
    setFromNow(timeString());
  }, 1000);

  return <time suppressHydrationWarning>{fromNow}</time>;
};
export default TimeFromNow;
