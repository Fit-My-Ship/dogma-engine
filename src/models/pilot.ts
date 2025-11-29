import { TypeAttribute } from '../types/attrib';
import { TypeEffect } from '../types/effect';

interface Skill {
	typeID: number;
	name: string;
	attributes: TypeAttribute[];
	effects: TypeEffect[];
}

export class Pilot {
	private skills: Skill[];

	constructor() {
		this.skills = [];
	}
}
