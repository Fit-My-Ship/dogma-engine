import { TypeAttribute } from '../types/attrib';
import { TypeEffect } from '../types/effect';

interface Skills {
	typeID: number;
	name: string;
	attributes: TypeAttribute[];
	effects: TypeEffect[];
}

export class Pilot {
	private skills: Skills[];

	constructor() {
		this.skills = [];
	}
}
