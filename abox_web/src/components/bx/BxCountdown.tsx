import { FunctionComponent, useEffect, useState } from "react";
import Countdown from 'react-countdown';
import { Countdown as DCountdown } from "react-daisyui";
import { useTranslation } from "react-i18next";

interface CountdownProp {
  startDate?:string,
  endDate?:string,
  className?:string,
  type?: 'badge' | 'full'
}

interface CountdownState {
  tense: -1 | 0 | 1, // -1 - past, 0 - now, 1 - future
  countdownDate: Date,
}

export function BxCountdown(props: CountdownProp) {
  const { t } = useTranslation();
  const [countdownTime, setCountdownTime] = useState<CountdownState>();

  /* ============================================================================ */
  /* ============================================================================ */
  useEffect(() => {
    if(props.startDate !== undefined && props.endDate !== undefined) {
      const start = new Date(props.startDate);
      const end = new Date(props.endDate);
      const now = Date.now();
      
      if((start.getTime() < now) && (now < end.getTime())) {
        setCountdownTime({
          tense: 0,
          countdownDate: end,
        });
      } else if(start.getTime() > now) {
        setCountdownTime({
          tense: 1,
          countdownDate: start
        });
      } else {
        setCountdownTime({
          tense: -1,
          countdownDate: end
        });
      }
    }
  }, []);
  
  /* ============================================================================ */
  /* ============================================================================ */
  const Completionist = () => <span>Хугацаа дууссан</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      if(props.type === 'full') {
        return <div className="flex gap-2">
          <div className="text-right">
            <DCountdown className="font-semibold" value={days} /> {t('date.day').toLowerCase()} 
          </div> 
          <div className="">
            <DCountdown className="font-semibold" value={hours} /> {t('date.hour').toLowerCase()} 
          </div> 
          <div className="">
            <DCountdown className="font-semibold" value={minutes} /> {t('date.minute').toLowerCase()} 
          </div> 
          <div className="">
            <DCountdown className="font-semibold" value={seconds} /> {t('date.second').toLowerCase()} 
          </div>
        </div>
      } else {
        const hrs = hours + (days * 24);
        return <div className="flex gap-1">
          <div className="text-right">
            {
              hrs < 99 ? <DCountdown className="" value={hours + (days * 24)} /> : hrs 
            } {t('date.hour').toLowerCase()}
          </div> 
          <div className="">
            <DCountdown className="" value={minutes} /> : 
          </div> 
          <div className="">
            <DCountdown className="" value={seconds} /> {t('date.second').toLowerCase()}
          </div>
        </div>
      }
    }
  };

  const PreText = () => {
    if(countdownTime !== undefined) {
      switch(countdownTime.tense) {
        case 1:
          return <span>{t('label.beforeStart')}</span>
        case 0:
          return <></>
          // return <span>{t('label.beforeEnd')}</span>
        case -1:
          return <></>
      }
    }
    return <></>
  }

  const Cntdwn = () => {
    return <Countdown daysInHours={true} date={countdownTime?.countdownDate} renderer={renderer}/>;
  }
  

  return (
    <div className={`flex gap-1 ${props.className}`}>
      <PreText />
      <Cntdwn />
    </div>
  );

}