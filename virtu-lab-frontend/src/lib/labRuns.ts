import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firebaseDb, isFirebaseConfigured } from './firebaseClient';
import { LabType, LabInputs } from '../config/labsConfig';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface LabRunPayload {
  userId: string;
  role: UserRole;
  labKey: LabType;
  durationSec: number;
  score: number;
  inputs: LabInputs;
  failureCount: number;
}

export const saveLabRun = async (payload: LabRunPayload): Promise<void> => {
  if (!isFirebaseConfigured || !firebaseDb) return;

  await addDoc(collection(firebaseDb, 'lab_runs'), {
    ...payload,
    createdAt: serverTimestamp(),
  });
};

