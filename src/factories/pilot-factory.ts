import { Database } from '../db/types';
import { Pilot } from '../models/pilot';
import { container } from '../services/service-container';

export class PilotFactory {
	private db: Database;
	constructor() {
		this.db = container.resolve('database');
	}

	async create(): Promise<Pilot> {
		const skills = await this.db.getSkillsData();
		return new Pilot(skills);
	}
}
