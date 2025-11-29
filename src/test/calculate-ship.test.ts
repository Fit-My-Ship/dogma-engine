import { describe, it, expect } from 'vitest';
import { testShip } from './test-entities';
import { resistToPercent } from '../utils/utils';
import { SensorType } from '../types/stats';

describe('TestShip must have matched raw attributes', async () => {
	const shipStats = await testShip.getShipStats();

	it('Hull hp must be 7150, hull resistances must be 33%', () => {
		expect(shipStats.hullHp).toBeCloseTo(7150);
		expect(resistToPercent(shipStats.hullEmResist)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hullExpResist)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hullKinResist)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hullThrResist)).toBeCloseTo(33);
	});

	it('Armor hp must be 7150, armor resistances must be 32.5%', () => {
		expect(shipStats.armorHp).toBeCloseTo(7150);
		expect(resistToPercent(shipStats.armorEmResist)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armorExpResist)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armorKinResist)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armorThrResist)).toBeCloseTo(32.5);
	});

	it('Shield hp must be 7150, shield resistances must be 27.5, recharge rate must be 3332500', () => {
		expect(shipStats.shieldHp).toBeCloseTo(7150);
		expect(resistToPercent(shipStats.shieldEmResist)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shieldExpResist)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shieldKinResist)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shieldThrResist)).toBeCloseTo(27.5);
		expect(shipStats.shieldRechargeRate).toBeCloseTo(3332500);
	});

	it('Powergrid = 15000, CPU = 600, calibration = 400, all loads =  0', () => {
		expect(shipStats.powerOutput).toBeCloseTo(15000);
		expect(shipStats.powerLoad).toBeCloseTo(0);
		expect(shipStats.cpuOutput).toBeCloseTo(600);
		expect(shipStats.cpuLoad).toBeCloseTo(0);
		expect(shipStats.calibrationOutput).toBeCloseTo(400);
		expect(shipStats.calibrationLoad).toBeCloseTo(0);
	});

	it('Capacitor capacity = 6450, capacitor recharge = 1260000, cargo = 1200', () => {
		expect(shipStats.capacitorCapacity).toBeCloseTo(6450);
		expect(shipStats.capacitorRechageRate).toBeCloseTo(1260000);
		expect(shipStats.cargoCapacity).toBeCloseTo(1200);
	});

	it('Slots: hi = 7, med = 7, low = 7, turret = 6, launcher = 6, rig = 3', () => {
		expect(shipStats.hiSlots).toBe(7);
		expect(shipStats.medSlots).toBe(7);
		expect(shipStats.lowSlots).toBe(7);
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
