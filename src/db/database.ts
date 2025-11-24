import { InvType } from '../types/inv-type';

export interface Database {
	getInvType(typeID: number): InvType;
}
