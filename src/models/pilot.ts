import { ISkillData } from '../db/types';

export class Pilot {
	private skills: ISkillData[];

	constructor(skills: ISkillData[] = []) {
		this.skills = skills;
	}

	getSkills(): ISkillData[] {
		return this.skills;
	}

	setAllSkillsLevel(newLevel: number): void {
		this.skills = this.skills.map(skill => {
			skill.level = newLevel;
			return skill;
		});
	}
}
