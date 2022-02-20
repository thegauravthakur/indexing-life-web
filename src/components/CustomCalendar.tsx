import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import './CustomCalendar.css';
import { Calendar } from 'react-modern-calendar-datepicker';
import { useRecoilState } from 'recoil';
import { currentDateState } from '../recoil/atom';
import { useQuery } from 'react-query';
import { auth, firestore } from '../firebase';
import { getDocs, collection } from 'firebase/firestore';

export function CustomCalendar() {
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
            customDaysClassName={formattedSelectedDate}
            shouldHighlightWeekends
        />
    );
}
