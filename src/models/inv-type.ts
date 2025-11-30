import { IInvTypeData, ITypeAttributeData, ITypeEffectData } from '../db/types';

export class InvType {
	private typeID: number;
	private attributes: ITypeAttributeData[]; // TODO: move to Type-attribute class
	private effects: ITypeEffectData[]; // TODO: move to Type-effect class

	constructor(data: IInvTypeData) {
		this.typeID = data.typeID;
		this.attributes = data.attributes;
		this.effects = data.effects;
	}

	getAttributeValue(attributeID: number): number {
		const result = this.attributes.find(attr => attr.attributeID === attributeID);
		return result?.value ?? 0;
	}
}
