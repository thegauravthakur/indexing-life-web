import { queryClient } from '../index';
import { EventType, EventsType } from '../views/Timeline';

export function updateLocalData(
    value: EventType,
    id: string,
    currentDate: string
) {
    queryClient.setQueryData(['fetchEvents', currentDate], (_events) => {
        const copy = { ...(_events as EventsType) };
        copy[id] = value;
        return copy;
    });
}
