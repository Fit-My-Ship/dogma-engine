import { describe, it, expect } from 'vitest';
import { TEST_SHIP_DATA, TEST_SKILLS_DATA } from './test-entities';
import { resistToPercent } from '../utils/utils';
import { SensorType } from '../types/stats';
import { container } from '../services/service-container';
import { InMemoryDatabase } from '../db/in-memory-database';
import { ShipFactory } from '../factories/ship-factory';
import { Database } from '../db/types';
import { Ship } from '../models/ship';
import { PilotFactory } from '../factories/pilot-factory';

container.register('database', new InMemoryDatabase());
container.register('ship-factory', new ShipFactory());
container.register('pilot-factory', new PilotFactory());

const testDb = container.resolve<Database>('database');
testDb.createShipData(TEST_SHIP_DATA);
testDb.createSkillsData(TEST_SKILLS_DATA);

const shipFactory = container.resolve<ShipFactory>('ship-factory');
const testShip: Ship = (await shipFactory.createFromTypeID(TEST_SHIP_DATA.typeID))!;

const pilotFactory = container.resolve<PilotFactory>('pilot-factory');

describe('TestShip must have matched attributes', async () => {
	const shipStats = await testShip.getShipStats();

	it('Empty ship w/o pilot - hull hp must be 7_150', () => {
		expect(shipStats.hullHp).toBeCloseTo(7_150);
	});
	it('Empty ship w/o pilot -  hull resistances must be 33%', () => {
		expect(resistToPercent(shipStats.hullEmResist)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hullExpResist)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hullKinResist)).toBeCloseTo(33);
		expect(resistToPercent(shipStats.hullThrResist)).toBeCloseTo(33);
	});

	it('Empty ship w/o pilot - armor hp must be 7_150', () => {
		expect(shipStats.armorHp).toBeCloseTo(7_150);
	});
	it('Empty ship w/o pilot - armor resistances must be 32.5%', () => {
		expect(resistToPercent(shipStats.armorEmResist)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armorExpResist)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armorKinResist)).toBeCloseTo(32.5);
		expect(resistToPercent(shipStats.armorThrResist)).toBeCloseTo(32.5);
	});

	it('Empty ship w/o pilot - shield hp must be 7_150', () => {
		expect(shipStats.shieldHp).toBeCloseTo(7_150);
	});
	it('Empty ship w/o pilot - shield resistances must be 27.5', () => {
		expect(resistToPercent(shipStats.shieldEmResist)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shieldExpResist)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shieldKinResist)).toBeCloseTo(27.5);
		expect(resistToPercent(shipStats.shieldThrResist)).toBeCloseTo(27.5);
	});
	it('Empty ship w/o pilot - shield recharge rate must be 3_332 seconds', () => {
		expect(shipStats.shieldRechargeRate).toBeCloseTo(3_332_500);
	});

	it('Empty ship w/o pilot - powergrid must be 15_000', () => {
		expect(shipStats.powerOutput).toBeCloseTo(15_000);
	});
	it('Empty ship w/o pilot - CPU output must be 600', () => {
		expect(shipStats.cpuOutput).toBeCloseTo(600);
	});
	it('Empty ship w/o pilot - calibration output must be 400', () => {
		expect(shipStats.calibrationOutput).toBeCloseTo(400);
	});
	it('Empty ship w/o pilot - powerload must be 0', () => {
		expect(shipStats.powerLoad).toBeCloseTo(0);
	});
	it('Empty ship w/o pilot - CPU load must be 0', () => {
		expect(shipStats.cpuLoad).toBeCloseTo(0);
	});
	it('Empty ship w/o pilot - calibration load must be 0', () => {
		expect(shipStats.calibrationLoad).toBeCloseTo(0);
	});

	it('Empty ship w/o pilot - capacitor capacity must be 6_450', () => {
		expect(shipStats.capacitorCapacity).toBeCloseTo(6_450);
	});
	it('Empty ship w/o pilot - capacitor recharge rate must be 1_260_000', () => {
		expect(shipStats.capacitorRechageRate).toBeCloseTo(1_260_000);
	});

	it('Empty ship w/o pilot - cargo capacity must be 1_200', () => {
		expect(shipStats.cargoCapacity).toBeCloseTo(1_200);
	});

	it('Empty ship w/o pilot - high slots must be 7', () => {
		expect(shipStats.hiSlots).toBe(7);
	});
	it('Empty ship w/o pilot - medium slots must be 7', () => {
		expect(shipStats.medSlots).toBe(7);
	});
	it('Empty ship w/o pilot - low slots must be 7', () => {
		expect(shipStats.lowSlots).toBe(7);
	});
	it('Empty ship w/o pilot - turret slots must be 6', () => {
		expect(shipStats.turretSlots).toBe(6);
	});
	it('Empty ship w/o pilot - launcher slots must be 6', () => {
		expect(shipStats.launcherSlots).toBe(6);
	});
	it('Empty ship w/o pilot - rig slots must be 3', () => {
		expect(shipStats.rigSlots).toBe(3);
	});

	it('Empty ship w/o pilot - max speed must be 75', () => {
		expect(shipStats.maxVelocity).toBeCloseTo(75);
	});
	it('Empty ship w/o pilot - inertia must be 0.1', () => {
		expect(shipStats.inertiaModifier).toBeCloseTo(0.1);
	});
	it('Empty ship w/o pilot - mass must be 87_000_000', () => {
		expect(shipStats.mass).toBeCloseTo(87_000_000);
	});

	it('Empty ship w/o pilot - warp speed must be 3', () => {
		expect(shipStats.warpSpeed).toBeCloseTo(3);
	});

	it('Empty ship w/o pilot - drone bay capacity must be 225', () => {
		expect(shipStats.droneCapacity).toBe(225);
	});
	it('Empty ship w/o pilot - Drone bandwidth must be 100', () => {
		expect(shipStats.droneBandwidth).toBe(100);
	});

	it('Empty ship w/o pilot - target max range must be 70_000', () => {
		expect(shipStats.maxTargetRange).toBeCloseTo(70_000);
	});
	it('Empty ship w/o pilot - max locked targets must be 7', () => {
		expect(shipStats.maxLockedTargets).toBe(7);
	});
	it('Empty ship w/o pilot - sensor type must be gravimetric type with 20 strength', () => {
		expect(shipStats.sensorStrength).toBeCloseTo(20);
		const expectSensorType: SensorType = 'gravimetric';
		expect(shipStats.sensorType).toBe(expectSensorType);
	});
	it('Empty ship w/o pilot - signature must be 465', () => {
		expect(shipStats.signatureRadius).toBeCloseTo(465);
	});
	it('Empty ship w/o pilot - scan resolution must be 169', () => {
		expect(shipStats.scanResolution).toBeCloseTo(169);
	});
});

describe('TestShip with pilot must have increased attributes', async () => {
	const testPilot = await pilotFactory.create();
	testPilot.setAllSkillsLevel(5);
	testShip.setPilot(testPilot);
	const shipStats = await testShip.getShipStats();

	it('Empty ship with all skills level 5 pilot - hull hp must be 8_937', () => {
		expect(shipStats.hullHp).toBeCloseTo(7_150 * 1.25);
	});

	it('Empty ship with all skills level 5 pilot - armor hp must be 8_937', () => {
		expect(shipStats.armorHp).toBeCloseTo(7_150 * 1.25);
	});

	it('Empty ship with all skills level 5 pilot - shield hp must be 8_937', () => {
		expect(shipStats.shieldHp).toBeCloseTo(7_150 * 1.25);
	});

	it('Empty ship with all skills level 5 pilot - shield recharge rate must be 2_499 seconds', () => {
		expect(shipStats.shieldRechargeRate).toBeCloseTo(3_332_500 * 0.75);
	});
});
