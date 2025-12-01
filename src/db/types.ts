export interface ITypeAttributeData {
	attributeID: number;
	highIsGood: boolean;
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

export interface ISkillData {
	typeID: number;
	name: string;
	level: number;
	attributes: ITypeAttributeData[];
	effects: ITypeEffectData[];
}

export interface Database {
	createInvType(data: IInvTypeData): Promise<boolean>;
	getInvType(typeID: number): Promise<IInvTypeData | null>;

	createShipData(data: IShipData): Promise<boolean>;
	getShipData(typeID: number): Promise<IShipData | null>;

	createSkillsData(data: ISkillData[]): Promise<boolean>;
	getSkillsData(): Promise<ISkillData[]>;
}
