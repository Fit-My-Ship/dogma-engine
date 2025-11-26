export interface IType {
	typeID: number;
	attributes: TypeAttribute[];
	effects: TypeEffect[];
}

export interface TypeAttribute {
	attributeID: number;
	value: number;
}

export interface TypeEffect {
	effectID: number;
}

export class InvType {
	private typeID: number;
	private attributes: TypeAttribute[];
	private effects: TypeEffect[];

	constructor(data: IType) {
		this.typeID = data.typeID;
		this.attributes = data.attributes;
		this.effects = data.effects;
	}

	getAttributeValue(attributeID: number): number {
		const result = this.attributes.find(
			attr => attr.attributeID === attributeID
		);
		return result?.value ?? 0;
	}
}
