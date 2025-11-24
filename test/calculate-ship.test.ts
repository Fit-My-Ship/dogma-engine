import { describe, it, expect } from 'vitest';
import { calculateShip } from '../src/index';
import { testShip } from './test-entities';

describe('TestShip must have matched attributes', () => {
	const shipStats = calculateShip(testShip);

	it('Hull hp must be 550', () => {
		expect(shipStats.hull.hp).toBe(550);
	});
	it('All рull resistance must be 0.67', () => {
		expect(shipStats.hull.resists.em).toBe(0.67);
		expect(shipStats.hull.resists.ex).toBe(0.67);
		expect(shipStats.hull.resists.ki).toBe(0.67);
		expect(shipStats.hull.resists.th).toBe(0.67);
	});
});
