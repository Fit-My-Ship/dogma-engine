import { InvType } from '../types/inv-type';
import { Database } from './database';

export function getInvType(typeID: number, db: Database): InvType {
	return db.getInvType(typeID);
}
