import { atom } from 'recoil';
import { format } from 'date-fns';

export const currentDateState = atom({
    key: 'currentDateState',
    default: format(new Date(), 'yyyy-MM-dd'),
});
