import { Database } from '../db/types';
import { Ship } from '../models/ship';
import { container } from '../services/service-container';

export class ShipFactory {
	private db: Database;
	constructor() {
		this.db = container.resolve('database');
	}

	async createFromTypeID(typeID: number): Promise<Ship | null> {
		const data = await this.db.getShipData(typeID);
		if (!data) return null;

		return new Ship(data);
	}
}
