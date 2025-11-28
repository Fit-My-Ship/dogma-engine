import { Database } from '../db/types';
import { Ship } from '../models/ship';

export class ShipFactory {
	private db: Database;
	constructor(db: Database) {
		this.db = db;
	}

	async createFromTypeID(typeID: number): Promise<Ship | undefined> {
		const data = await this.db.getShipData(typeID);
		if (!data) return undefined;

		return new Ship(data);
	}
}
