import { describe, it, expect } from 'vitest';
import { calculateShip } from '../index';
import { testShip } from './test-entities';
import { resistToPercent } from '../calculations/tools';
import { SensorType } from '../types/stats';

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

	it('Powergrid must be 15000, CPU mustbe 600, calibration must be 400, PG, CPU and calibration loads must be 0', () => {
		expect(shipStats.powerOutput).toBeCloseTo(15000);
		expect(shipStats.powerLoad).toBeCloseTo(0);
		expect(shipStats.cpuOutput).toBeCloseTo(600);
		expect(shipStats.cpuLoad).toBeCloseTo(0);
		expect(shipStats.calibrationOutput).toBeCloseTo(400);
		expect(shipStats.calibrationLoad).toBeCloseTo(0);
	});

	it('Capacitor capacity must be 6450, capacitor recharge rate must be xxx, cargo must be 1200', () => {
		expect(shipStats.capacitorCapacity).toBeCloseTo(6450);
		expect(shipStats.capacitorRechageRate).toBeCloseTo(1260000);
		expect(shipStats.cargoCapacity).toBeCloseTo(1200);
	});

	it('Slots: hi = 7, med = 7, low = 7, turret = 6, launcher = 6, rig = 3', () => {
		expect(shipStats.hiSlots).toBe(7);
		expect(shipStats.medSlots).toBe(7);
		expect(shipStats.lowStots).toBe(7);
		expect(shipStats.turretSlots).toBe(6);
		expect(shipStats.launcherSlots).toBe(6);
		expect(shipStats.rigSlots).toBe(3);
	});

	it('Navigation: max speed = 75, mass = 87kk, inertia = 0.1, warp speed = 3', () => {
		expect(shipStats.maxVelocity).toBeCloseTo(75);
		expect(shipStats.inertiaModifier).toBeCloseTo(0.1);
		expect(shipStats.mass).toBeCloseTo(87000000);
		expect(shipStats.warpSpeed).toBeCloseTo(3);
	});

	it('Drone capacity = 225, bandwidth = 100', () => {
		expect(shipStats.droneCapacity).toBe(225);
		expect(shipStats.droneBandwidth).toBe(100);
	});

	it('Target range = 70, max targets = 7, sensor = gravimetric 20, signature = 465, resolution = 169', () => {
		expect(shipStats.maxTargetRange).toBeCloseTo(70000);
		expect(shipStats.maxLockedTargets).toBe(7);
		expect(shipStats.sensorStrength).toBeCloseTo(20);
		const expectSensorType: SensorType = 'gravimetric';
		expect(shipStats.sensorType).toBe(expectSensorType);
		expect(shipStats.signatureRadius).toBeCloseTo(465);
		expect(shipStats.scanResolution).toBeCloseTo(169);
	});
});
