export interface ITypeAttributeData {
	attributeID: number;
	value: number;
}

export interface ITypeEffectData {
	effectID: number;
}

export interface IShipData {
	typeID: number;
	attributes: ITypeAttributeData[];
	effects: ITypeEffectData[];
	name: string;
}

export interface IInvTypeData {
	typeID: number;
	attributes: ITypeAttributeData[];
	effects: ITypeEffectData[];
}

export interface Database {
	getInvType(typeID: number): Promise<IInvTypeData | null>;
	getShipData(typeID: number): Promise<IShipData | null>;
	createInvType(data: IInvTypeData): Promise<boolean>;
	createShipData(data: IShipData): Promise<boolean>;
}
