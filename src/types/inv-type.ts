export interface TypeAttribute {
	attributeID: number;
	value: number;
}

export interface TypeEffect {
	effectID: number;
}

export interface InvType {
	typeID: number;
	attributes: TypeAttribute[];
	effects: TypeEffect[];
}
