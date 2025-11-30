import { describe, expect, it } from 'vitest';
import { container } from '../services/service-container';
import { ShipFactory } from '../factories/ship-factory';
import { InMemoryDatabase } from '../db/in-memory-database';
import { TEST_SHIP_DATA } from './test-entities';
import { Database } from '../db/types';
import { Ship } from '../models/ship';

describe('Ship factory', async () => {
	container.register('database', new InMemoryDatabase());
	container.register('ship-factory', new ShipFactory());
	const testDb = container.resolve<Database>('database');
	testDb.createShipData(TEST_SHIP_DATA);

	const shipFactory = container.resolve<ShipFactory>('ship-factory');
	const testShip: Ship | null = await shipFactory.createFromTypeID(TEST_SHIP_DATA.typeID);
	it('Ship must be created', () => {
		expect(testShip).not.toBeNull();
	});
	it('Ship must have correct ID', () => {
		expect(testShip?.getTypeID()).toBe(TEST_SHIP_DATA.typeID);
	});

	const wrongShip: Ship | null = await shipFactory.createFromTypeID(999999);
	it('Ship must not be created', () => {
		expect(wrongShip).toBeNull();
	});
});
