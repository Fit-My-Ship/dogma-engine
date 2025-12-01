import { describe, expect, it } from 'vitest';
import { InMemoryDatabase } from '../db/in-memory-database';
import { container } from '../services/service-container';
import { PilotFactory } from '../factories/pilot-factory';
import { Database } from '../db/types';
import { TEST_SKILLS_DATA } from './test-entities';

describe('Pilot must have skills', async () => {
	container.register('database', new InMemoryDatabase());
	container.register('pilot-factory', new PilotFactory());

	const testDb = container.resolve<Database>('database');
	testDb.createSkillsData(TEST_SKILLS_DATA);

	const pilotFactory = container.resolve<PilotFactory>('pilot-factory');
	const pilot = await pilotFactory.create();

	it('Pilot must be created', () => {
		expect(pilot).toBeTruthy();
	});

	it('Pilot must have non empty skills array', () => {
		expect(pilot.getSkills()).toBeTruthy();
		expect(pilot.getSkills().length).toBeGreaterThan(0);
	});

	it('Pilot must change skill levels', () => {
		pilot.setAllSkillsLevel(5);
		expect(pilot.getSkills().every(skill => skill.level === 5)).toBe(true);
	});
});
