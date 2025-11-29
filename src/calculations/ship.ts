import { IInvTypeData } from '../db/types';
import { InvType } from '../models/inv-type';
import { testDb } from '../test/test-entities';
import { Ship } from '../types/ship';
import { SensorType, ShipStats } from '../types/stats';

const HULL_HP_ATTRIBUTE_ID = 9;
const HULL_KIN_RESIST_ATTRIBUTE_ID = 109;
const HULL_THR_RESIST_ATTRIBUTE_ID = 110;
const HULL_EXP_RESIST_ATTRIBUTE_ID = 111;
const HULL_EM_RESIST_ATTRIBUTE_ID = 113;
const ARMOR_HP_ATTRIBUTE_ID = 265;
const ARMOR_EM_RESIST_ATTRIBUTE_ID = 267;
const ARMOR_EXP_RESIST_ATTRIBUTE_ID = 268;
const ARMOR_KIN_RESIST_ATTRIBUTE_ID = 269;
const ARMOR_THR_RESIST_ATTRIBUTE_ID = 270;
const SHIELD_HP_ATTRIBUTE_ID = 263;
const SHIELD_EM_RESIST_ATTRIBUTE_ID = 271;
const SHIELD_EXP_RESIST_ATTRIBUTE_ID = 272;
const SHIELD_KIN_RESIST_ATTRIBUTE_ID = 273;
const SHIELD_THR_RESIST_ATTRIBUTE_ID = 274;
const SHIELD_RECHARGE_RATE_ATTRIBUTE_ID = 479;
const POWER_OUTPUT_ATTRIBUTE_ID = 11;
const POWER_LOAD_ATTRIBUTE_ID = 15;
const CPU_OUTPUT_ATTRIBUTE_ID = 48;
const CPU_LOAD_ATTRIBUTE_ID = 49;
const CALIBRATION_OUTPUT_ATTRIBUTE_ID = 1132;
const CALIBRATION_LOAD_ATTRIBUTE_ID = 1152;
const CAPACITOR_CAPACITY_ATTRIBUTE_ID = 482;
const CAPACITOR_RECHARGE_ATTRIBUTE_ID = 55;
const CARGO_CAPACITY_ATTRIBUTE_ID = 38;
const HI_SLOTS_ATTRIBUTE_ID = 14;
const MED_SLOTS_ATTRIBUTE_ID = 13;
const LOW_SLOTS_ATTRIBUTE_ID = 12;
const TURRET_SLOTS_LEFT_ATTRIBUTE_ID = 102;
const LAUNCHER_SLOTS_LEFT_ATTRIBUTE_ID = 101;
const RIG_SLOTS_ATTRIBUTE_ID = 1137;
const MAX_VELOCITY_ATTRIBUTE_ID = 37;
const INERTIA_MODIFIER_ATTRIBUTE_ID = 70;
const MASS_ATTRIBUTE_ID = 4;
const WARP_SPEED_ATTRIBUTE_ID = 600;
const DRONE_CAPACITY_ATTRIBUTE_ID = 283;
const DRONE_BANDWIDTH_ATTRIBUTE_ID = 1271;
const MAX_TARGET_RANGE_ATTRIBUTE_ID = 76;
const MAX_LOCKED_TARGETS_ATTRIBUTE_ID = 192;
const SCAN_RADAR_STREGTH_ATTRIBUTE_ID = 208;
const SCAN_LADAR_STREGTH_ATTRIBUTE_ID = 209;
const SCAN_MAGNETOMETRIC_STREGTH_ATTRIBUTE_ID = 210;
const SCAN_GRAVIMETRIC_STREGTH_ATTRIBUTE_ID = 211;
const SIGNATURE_RADIUS_ATTRIBUTE_ID = 552;
const SCAN_RESOLUTION_ATTRIBUTE_ID = 564;

const defaultInvTypeData: IInvTypeData = {
	typeID: 0,
	attributes: [],
	effects: [],
};

export async function calculateShip(ship: Ship): Promise<ShipStats> {
	const shipData: IInvTypeData =
		(await testDb.getInvType(ship.typeID)) ?? defaultInvTypeData;

	const shipInvType = new InvType(shipData as IInvTypeData);

	let sensorStrength: number = shipInvType.getAttributeValue(
		SCAN_RADAR_STREGTH_ATTRIBUTE_ID
	);
	let sensorType: SensorType = 'radar';
	const ladarStrength = shipInvType.getAttributeValue(
		SCAN_LADAR_STREGTH_ATTRIBUTE_ID
	);
	const gravimetricStrength = shipInvType.getAttributeValue(
		SCAN_GRAVIMETRIC_STREGTH_ATTRIBUTE_ID
	);
	const magnetometricStrength = shipInvType.getAttributeValue(
		SCAN_MAGNETOMETRIC_STREGTH_ATTRIBUTE_ID
	);
	if (ladarStrength > sensorStrength) {
		sensorStrength = ladarStrength;
		sensorType = 'ladar';
	}
	if (gravimetricStrength > sensorStrength) {
		sensorStrength = gravimetricStrength;
		sensorType = 'gravimetric';
	}
	if (magnetometricStrength > sensorStrength) {
		sensorStrength = magnetometricStrength;
		sensorType = 'magnetometric';
	}

	const result: ShipStats = {
		typeID: ship.typeID,
		hullHp: shipInvType.getAttributeValue(HULL_HP_ATTRIBUTE_ID),
		hullEmResist: shipInvType.getAttributeValue(
			HULL_EM_RESIST_ATTRIBUTE_ID
		),
		hullExpResist: shipInvType.getAttributeValue(
			HULL_EXP_RESIST_ATTRIBUTE_ID
		),
		hullKinResist: shipInvType.getAttributeValue(
			HULL_KIN_RESIST_ATTRIBUTE_ID
		),
		hullThrResist: shipInvType.getAttributeValue(
			HULL_THR_RESIST_ATTRIBUTE_ID
		),

		armorHp: shipInvType.getAttributeValue(ARMOR_HP_ATTRIBUTE_ID),

		armorEmResist: shipInvType.getAttributeValue(
			ARMOR_EM_RESIST_ATTRIBUTE_ID
		),
		armorExpResist: shipInvType.getAttributeValue(
			ARMOR_EXP_RESIST_ATTRIBUTE_ID
		),
		armorKinResist: shipInvType.getAttributeValue(
			ARMOR_KIN_RESIST_ATTRIBUTE_ID
		),
		armorThrResist: shipInvType.getAttributeValue(
			ARMOR_THR_RESIST_ATTRIBUTE_ID
		),

		shieldHp: shipInvType.getAttributeValue(SHIELD_HP_ATTRIBUTE_ID),

		shieldEmResist: shipInvType.getAttributeValue(
			SHIELD_EM_RESIST_ATTRIBUTE_ID
		),
		shieldExpResist: shipInvType.getAttributeValue(
			SHIELD_EXP_RESIST_ATTRIBUTE_ID
		),
		shieldKinResist: shipInvType.getAttributeValue(
			SHIELD_KIN_RESIST_ATTRIBUTE_ID
		),
		shieldThrResist: shipInvType.getAttributeValue(
			SHIELD_THR_RESIST_ATTRIBUTE_ID
		),
		shieldRechargeRate: shipInvType.getAttributeValue(
			SHIELD_RECHARGE_RATE_ATTRIBUTE_ID
		),

		powerOutput: shipInvType.getAttributeValue(POWER_OUTPUT_ATTRIBUTE_ID),
		powerLoad: shipInvType.getAttributeValue(POWER_LOAD_ATTRIBUTE_ID),
		cpuOutput: shipInvType.getAttributeValue(CPU_OUTPUT_ATTRIBUTE_ID),
		cpuLoad: shipInvType.getAttributeValue(CPU_LOAD_ATTRIBUTE_ID),
		calibrationOutput: shipInvType.getAttributeValue(
			CALIBRATION_OUTPUT_ATTRIBUTE_ID
		),
		calibrationLoad: shipInvType.getAttributeValue(
			CALIBRATION_LOAD_ATTRIBUTE_ID
		),
		capacitorCapacity: shipInvType.getAttributeValue(
			CAPACITOR_CAPACITY_ATTRIBUTE_ID
		),
		capacitorRechageRate: shipInvType.getAttributeValue(
			CAPACITOR_RECHARGE_ATTRIBUTE_ID
		),
		cargoCapacity: shipInvType.getAttributeValue(
			CARGO_CAPACITY_ATTRIBUTE_ID
		),

		hiSlots: shipInvType.getAttributeValue(HI_SLOTS_ATTRIBUTE_ID),
		medSlots: shipInvType.getAttributeValue(MED_SLOTS_ATTRIBUTE_ID),
		lowSlots: shipInvType.getAttributeValue(LOW_SLOTS_ATTRIBUTE_ID),
		turretSlots: shipInvType.getAttributeValue(
			TURRET_SLOTS_LEFT_ATTRIBUTE_ID
		),
		launcherSlots: shipInvType.getAttributeValue(
			LAUNCHER_SLOTS_LEFT_ATTRIBUTE_ID
		),
		rigSlots: shipInvType.getAttributeValue(RIG_SLOTS_ATTRIBUTE_ID),

		maxVelocity: shipInvType.getAttributeValue(MAX_VELOCITY_ATTRIBUTE_ID),
		inertiaModifier: shipInvType.getAttributeValue(
			INERTIA_MODIFIER_ATTRIBUTE_ID
		),
		mass: shipInvType.getAttributeValue(MASS_ATTRIBUTE_ID),
		warpSpeed: shipInvType.getAttributeValue(WARP_SPEED_ATTRIBUTE_ID),

		droneCapacity: shipInvType.getAttributeValue(
			DRONE_CAPACITY_ATTRIBUTE_ID
		),
		droneBandwidth: shipInvType.getAttributeValue(
			DRONE_BANDWIDTH_ATTRIBUTE_ID
		),

		maxTargetRange: shipInvType.getAttributeValue(
			MAX_TARGET_RANGE_ATTRIBUTE_ID
		),
		maxLockedTargets: shipInvType.getAttributeValue(
			MAX_LOCKED_TARGETS_ATTRIBUTE_ID
		),
		sensorStrength,
		sensorType,
		signatureRadius: shipInvType.getAttributeValue(
			SIGNATURE_RADIUS_ATTRIBUTE_ID
		),
		scanResolution: shipInvType.getAttributeValue(
			SCAN_RESOLUTION_ATTRIBUTE_ID
		),
	};
	return result;
}
