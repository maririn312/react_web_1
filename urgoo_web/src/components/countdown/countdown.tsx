import moment from "moment";
import React from "react";
import Countdown from "react-countdown";
import { useTranslation } from "react-i18next";

interface CountdownProp {
  date: Date;
  position?: "relative" | "absolute" | "initial";
  theme?: "darkblue" | "yellow";
}

const NomadCountdown = (props: CountdownProp) => {
  const { t } = useTranslation();

  const yellowRenderer = ({ days, hours, minutes, seconds, completed }) => {
    console.log(days, hours);

    return (
      <div
        className={`flex flex-col right-4 bottom-4 items-end justify-end z-10`}
        style={{ position: props.position }}
      >
        <div className="flex items-center">
          <div className="count-down">
            <span className="count-valid-date  flex items-center justify-center flex-row text-xs gap-1">
              <span
                className={`time-item flex flex-col yellow bg-sec-yellow border border-border-yellow text-sec-black h-[30px]
                 w-[30px] font-bold items-center rounded-md leading-none justify-center text-xs`}
              >
                {(days > 0 ? days * 24 : 0) + hours}
                <div className="time-label text-[10px]">{t("date.hour")}</div>
              </span>
              <span
                className={`time-item flex flex-col bg-sec-yellow border border-border-yellow text-sec-black h-[30px] w-[30px]
                        font-bold items-center rounded-md leading-none justify-center text-xs`}
              >
                {minutes}
                <div className="time-label text-[10px]">{t("date.minute")}</div>
              </span>
              <span
                className={`time-item flex flex-col bg-sec-yellow border border-border-yellow text-sec-black h-[30px] w-[30px] font-bold items-center rounded-md leading-none justify-center text-xs`}
              >
                {seconds}
                <div className="time-label text-[10px]">{t("date.second")}</div>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const darkblueRenderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <div
        className={`flex flex-col items-start justify-start  z-10`}
        style={{ position: props.position }}
      >
        <div className="flex items-center">
          <div className="count-down">
            <span className="count-valid-date  flex items-center justify-center flex-row text-xs gap-4">
              <span
                className={`time-item flex flex-col text-white bg-creator h-12 w-12 font-bold items-center rounded-md leading-none justify-center text-lg`}
              >
                {(days > 0 ? days * 24 : 0) + hours}
                <div className="time-label text-[10px]">{t("date.hour")}</div>
              </span>
              <span
                className={`time-item flex flex-col text-white bg-creator h-12 w-12 font-bold items-center rounded-md leading-none justify-center text-lg`}
              >
                {minutes}
                <div className="time-label text-[10px]">{t("date.minute")}</div>
              </span>
              <span
                className={`time-item flex flex-col text-white bg-creator h-12 w-12
                  font-bold items-center rounded-md leading-none justify-center text-lg`}
              >
                {seconds}
                <div className="time-label text-[10px]">{t("date.second")}</div>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Countdown
      daysInHours={true}
      zeroPadDays={2}
      zeroPadTime={2}
      date={moment(props.date).format("YYYY-MM-DD HH:mm:ss")}
      renderer={props.theme === "yellow" ? yellowRenderer : darkblueRenderer}
    />
  );
};

export default NomadCountdown;
