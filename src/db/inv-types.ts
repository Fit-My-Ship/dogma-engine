import { InvType } from '../types/inv-type';

export function getInvType(typeID: number): InvType {
	const result: InvType = {
		typeID,
		attributes: [],
		effects: [],
	};
	return result;
}
