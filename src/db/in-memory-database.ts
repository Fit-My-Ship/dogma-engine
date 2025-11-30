import { Database, IInvTypeData, IShipData, ISkillData } from './types';

export class InMemoryDatabase implements Database {
	private data = new Map<string, Map<number, IInvTypeData | IShipData | ISkillData>>();

	private getTable(table: string): Map<number, IInvTypeData | IShipData | ISkillData> {
		if (!this.data.has(table)) {
			this.data.set(table, new Map());
		}
		return this.data.get(table)!;
	}

	async createInvType(data: IInvTypeData): Promise<boolean> {
		const table = this.getTable('invtypes');
		table.set(data.typeID, data);
		return true;
	}

	async getInvType(typeID: number): Promise<IInvTypeData | null> {
		const table = this.getTable('invtypes');
		const data = table.get(typeID);
		return data ?? null;
	}

	async createShipData(data: IShipData): Promise<boolean> {
		const table = this.getTable('invtypes');
		table.set(data.typeID, data);
		return true;
	}

	async getShipData(typeID: number): Promise<IShipData | null> {
		const table = this.getTable('invtypes');
		const data = table.get(typeID);
		if (!data) return null;

		return {
			...data,
			name: `Ship ${typeID}`,
		} as IShipData;
	}

	async createSkillsData(data: ISkillData[]): Promise<boolean> {
		const table = this.getTable('skills');
		data.forEach(skill => table.set(skill.typeID, skill));
		return true;
	}

	async getSkillsData(): Promise<ISkillData[]> {
		const table = this.getTable('skills');
		return Array.from(table.values()).flat() as ISkillData[];
	}
}
