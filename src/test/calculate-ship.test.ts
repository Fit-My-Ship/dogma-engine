import { describe, it, expect } from 'vitest';
import { calculateShip } from '../index';
import { testShip } from './test-entities';
import { resistToPercent } from '../calculations/tools';

describe('TestShip must have matched raw attributes', () => {
	const shipStats = calculateShip(testShip);

	it('Hull hp must be 7150, hull resistances must be 33%', () => {
		expect(shipStats.hull.hp).toBeCloseTo(7150);
		expect(resistToPercent(shipStats.hull.resists.em)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hull.resists.ex)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hull.resists.ki)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hull.resists.th)).toBeCloseTo(33);
	});

	it('Armor hp must be 7150, armor resistances must be 32.5%', () => {
		expect(shipStats.armor.hp).toBeCloseTo(7150);
		expect(resistToPercent(shipStats.armor.resists.em)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armor.resists.ex)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armor.resists.ki)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armor.resists.th)).toBeCloseTo(32.5);
	});

	it('Shiels hp must be 7150, shield resistances must be 27.5, recharge rate must be 3332500', () => {
		expect(shipStats.shield.hp).toBeCloseTo(7150);
		expect(resistToPercent(shipStats.shield.resists.em)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shield.resists.ex)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shield.resists.ki)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shield.resists.th)).toBeCloseTo(27.5);
		expect(shipStats.shield.rechargeRate).toBeCloseTo(3332500);
	});

	it('Powergrid must be 15000, CPU mustbe 600, PG and CPU loads must be 0', () => {
		expect(shipStats.powerOutput).toBeCloseTo(15000);
		expect(shipStats.powerLoad).toBeCloseTo(0);
		expect(shipStats.cpuOutput).toBeCloseTo(600);
		expect(shipStats.cpuLoad).toBeCloseTo(0);
	});
});
