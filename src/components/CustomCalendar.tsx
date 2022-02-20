import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import { useRecoilState } from 'recoil';
import { currentDateState } from '../recoil/atom';

export function CustomCalendar() {
    const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
    const formattedDate = currentDate.split('-');

    return (
        <Calendar
            value={{
                year: Number(formattedDate[0]),
                month: Number(formattedDate[1]),
                day: Number(formattedDate[2]),
            }}
            onChange={(date) => {
                if (date) {
                    const day = ('0' + date.day).slice(-2);
                    const month = ('0' + date.month).slice(-2);
                    setCurrentDate(`${date.year}-${month}-${day}`);
                }
            }}
            shouldHighlightWeekends
        />
    );
}
