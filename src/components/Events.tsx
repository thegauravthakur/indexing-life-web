import { queryClient } from '../index';
import { EventsType } from '../views/Timeline';
import { Event } from './Event';
export function Events() {
    const events = queryClient.getQueryData('fetchEvents') as EventsType;
    const sortedKeys = events
        ? Object.keys(events).sort(
              (key1: string, key2: string) =>
                  (events[key2].createdAt as number) -
                  (events[key1].createdAt as number)
          )
        : [];

    return (
        <>
            {sortedKeys.map((key) => (
                <Event key={key} event={events[key]} />
            ))}
        </>
    );
}
