import DatePicker from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { IconButton } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { currentDateState } from '../recoil/atom';
import { useQuery } from 'react-query';
import { auth, firestore } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
export function CustomDatePicker() {
    const [currentDate, setCurrentDate] = useRecoilState(currentDateState);
    const formattedDate = currentDate.split('-');

    const { data } = useQuery('fetchActiveDays', async () => {
        const { uid } = auth.currentUser!;
        const ref = collection(firestore, uid);
        const docs = await getDocs(ref);
        return docs.docs.map(({ id }) => id);
    });
    const formattedSelectedDate =
        data?.map((date) => {
            const splitDate = date.split('-');
            return {
                year: Number(splitDate[0]),
                month: Number(splitDate[1]),
                day: Number(splitDate[2]),
                className: 'selectedDay',
            };
        }) ?? [];

    // render regular HTML input element
    const renderCustomInput = ({ ref }: any) => (
        <IconButton ref={ref}>
            <CalendarToday />
        </IconButton>
    );

    return (
        <DatePicker
            value={{
                year: Number(formattedDate[0]),
                month: Number(formattedDate[1]),
                day: Number(formattedDate[2]),
            }}
            renderInput={renderCustomInput} // render a custom input
            onChange={(date) => {
                if (date) {
                    const day = ('0' + date.day).slice(-2);
                    const month = ('0' + date.month).slice(-2);
                    setCurrentDate(`${date.year}-${month}-${day}`);
                }
            }}
            customDaysClassName={formattedSelectedDate}
            shouldHighlightWeekends
        />
    );
}
