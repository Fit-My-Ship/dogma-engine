import { InvType } from '../types/inv-type';

export function getAttribute(invType: InvType, attributeID: number): number {
	const result = invType.attributes.find(
		attr => attr.attributeID === attributeID
	);
	return result?.value ?? 0;
}

export function resistToPercent(resistResonance: number): number {
	return (1 - resistResonance) * 100;
}
