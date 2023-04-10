import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import "./BxDateTime.css";
import "./BxCalendar.css";
import "./BxClock.css";
import { IoMdRemoveCircle } from 'react-icons/io';
import { BsCalendar3EventFill } from 'react-icons/bs';
import StringUtility from '../../utility/StringUtility';
import { BxMessage, BxMessageType } from './BxMessage';

interface BxDatePickerProp {
  value?: Date | undefined,
  onChange?: (date:Date) => void | undefined,
  name?: string | undefined,
  error?: string | undefined,
}

export function BxDatePicker(props: BxDatePickerProp) {

  const bxDateTime = (
    <DateTimePicker 
      name={props.name}
      className="input input-primary w-full" 
      locale="mn-MN"
      clearIcon={
        <IoMdRemoveCircle 
          size={20} 
          className="text-error" 
        />
      }
      calendarIcon={<BsCalendar3EventFill size={20} className="text-primary"/>}
      onChange={props.onChange} 
      value={props.value} 
    />
  );

  if(StringUtility.isValidText(props.error ? props.error : '')) {

    return <div className='grid'>
      {bxDateTime}
      <BxMessage
        type={BxMessageType.error}
        message={props.error}
      />
    </div>
  } 

  return bxDateTime;
}