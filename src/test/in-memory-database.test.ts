import { describe, expect, it } from 'vitest';
import { InMemoryDatabase } from '../db/in-memory-database';
import { container } from '../services/service-container';
import { Database } from '../db/types';

describe('Pilot must have skills', async () => {
	container.register('database', new InMemoryDatabase());

	const testDb = container.resolve<Database>('database');
	testDb.createInvType({
		typeID: 1,
		attributes: [],
		effects: [],
	});

	it('InvType must be created', async () => {
		expect(await testDb.getInvType(1)).not.toBeNull();
	});
	it('InvType must be equal to created', async () => {
		expect(await testDb.getInvType(1)).toEqual({
			typeID: 1,
			attributes: [],
			effects: [],
		});
	});
	it('Wrong InvType must be null', async () => {
		expect(await testDb.getInvType(2)).toBeNull();
	});
});
