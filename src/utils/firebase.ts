import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { EventType } from '../views/Timeline';

export async function updateCloudData(
    value: EventType,
    id: string,
    currentDate: string
) {
    const { uid } = auth.currentUser!;
    const ref = doc(firestore, uid, currentDate);
    await setDoc(ref, { [id]: value }, { merge: true });
}
