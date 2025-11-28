import { Database, IInvTypeData, IShipData } from './types';

export class InMemoryDatabase implements Database {
	private data = new Map<string, Map<number, IInvTypeData | IShipData>>();

	private getTable(table: string): Map<number, IInvTypeData | IShipData> {
		if (!this.data.has(table)) {
			this.data.set(table, new Map());
		}
		return this.data.get(table)!;
	}

	async getInvType(typeID: number): Promise<IInvTypeData | null> {
		const table = this.getTable('invtypes');
		const data = table.get(typeID);
		return data ?? null;
	}

	async getShipData(typeID: number): Promise<IShipData | null> {
		const table = this.getTable('invtypes');
		const data = table.get(typeID);
		if (!data) return null;

		// Если данные уже содержат имя, возвращаем как IShipData
		if ('name' in data && data.name) {
			return data as IShipData;
		}

		// Если это IInvTypeData, добавляем имя по умолчанию
		return {
			...data,
			name: `Ship ${typeID}`,
		} as IShipData;
	}

	async createInvType(data: IInvTypeData): Promise<boolean> {
		const table = this.getTable('invtypes');
		table.set(data.typeID, data);
		return true;
	}

	async createShipData(data: IShipData): Promise<boolean> {
		const table = this.getTable('invtypes');
		table.set(data.typeID, data);
		return true;
	}
}
