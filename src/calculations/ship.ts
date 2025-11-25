import { getInvType } from '../db/inv-types';
import { testDb } from '../test/test-entities';
import { Ship } from '../types/ship';
import { SensorType, ShipStats } from '../types/stats';
import { getAttribute } from './tools';

const HULL_HP_ATTRIBUTE_ID = 9;
const HULL_KI_RESIST_ATTRIBUTE_ID = 109;
const HULL_TH_RESIST_ATTRIBUTE_ID = 110;
const HULL_EX_RESIST_ATTRIBUTE_ID = 111;
const HULL_EM_RESIST_ATTRIBUTE_ID = 113;
const ARMOR_HP_ATTRIBUTE_ID = 265;
const ARMOR_EM_RESIST_ATTRIBUTE_ID = 267;
const ARMOR_EX_RESIST_ATTRIBUTE_ID = 268;
const ARMOR_KI_RESIST_ATTRIBUTE_ID = 269;
const ARMOR_TH_RESIST_ATTRIBUTE_ID = 270;
const SHIELD_HP_ATTRIBUTE_ID = 263;
const SHIELD_EM_RESIST_ATTRIBUTE_ID = 271;
const SHIELD_EX_RESIST_ATTRIBUTE_ID = 272;
const SHIELD_KI_RESIST_ATTRIBUTE_ID = 273;
const SHIELD_TH_RESIST_ATTRIBUTE_ID = 274;
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

export function calculateShip(ship: Ship): ShipStats {
	const shipInvType = getInvType(ship.typeID, testDb);

	let sensorStrength: number = getAttribute(
		shipInvType,
		SCAN_RADAR_STREGTH_ATTRIBUTE_ID
	);
	let sensorType: SensorType = 'radar';
	const ladarStrength = getAttribute(
		shipInvType,
		SCAN_LADAR_STREGTH_ATTRIBUTE_ID
	);
	const gravimetricStrength = getAttribute(
		shipInvType,
		SCAN_GRAVIMETRIC_STREGTH_ATTRIBUTE_ID
	);
	const magnetometricStrength = getAttribute(
		shipInvType,
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
		hull: {
			hp: getAttribute(shipInvType, HULL_HP_ATTRIBUTE_ID),
			resists: {
				em: getAttribute(shipInvType, HULL_EM_RESIST_ATTRIBUTE_ID),
				ex: getAttribute(shipInvType, HULL_EX_RESIST_ATTRIBUTE_ID),
				ki: getAttribute(shipInvType, HULL_KI_RESIST_ATTRIBUTE_ID),
				th: getAttribute(shipInvType, HULL_TH_RESIST_ATTRIBUTE_ID),
			},
		},
		armor: {
			hp: getAttribute(shipInvType, ARMOR_HP_ATTRIBUTE_ID),
			resists: {
				em: getAttribute(shipInvType, ARMOR_EM_RESIST_ATTRIBUTE_ID),
				ex: getAttribute(shipInvType, ARMOR_EX_RESIST_ATTRIBUTE_ID),
				ki: getAttribute(shipInvType, ARMOR_KI_RESIST_ATTRIBUTE_ID),
				th: getAttribute(shipInvType, ARMOR_TH_RESIST_ATTRIBUTE_ID),
			},
		},
		shield: {
			hp: getAttribute(shipInvType, SHIELD_HP_ATTRIBUTE_ID),
			resists: {
				em: getAttribute(shipInvType, SHIELD_EM_RESIST_ATTRIBUTE_ID),
				ex: getAttribute(shipInvType, SHIELD_EX_RESIST_ATTRIBUTE_ID),
				ki: getAttribute(shipInvType, SHIELD_KI_RESIST_ATTRIBUTE_ID),
				th: getAttribute(shipInvType, SHIELD_TH_RESIST_ATTRIBUTE_ID),
			},
			rechargeRate: getAttribute(
				shipInvType,
				SHIELD_RECHARGE_RATE_ATTRIBUTE_ID
			),
		},

		powerOutput: getAttribute(shipInvType, POWER_OUTPUT_ATTRIBUTE_ID),
		powerLoad: getAttribute(shipInvType, POWER_LOAD_ATTRIBUTE_ID),
		cpuOutput: getAttribute(shipInvType, CPU_OUTPUT_ATTRIBUTE_ID),
		cpuLoad: getAttribute(shipInvType, CPU_LOAD_ATTRIBUTE_ID),
		calibrationOutput: getAttribute(
			shipInvType,
			CALIBRATION_OUTPUT_ATTRIBUTE_ID
		),
		calibrationLoad: getAttribute(
			shipInvType,
			CALIBRATION_LOAD_ATTRIBUTE_ID
		),
		capacitorCapacity: getAttribute(
			shipInvType,
			CAPACITOR_CAPACITY_ATTRIBUTE_ID
		),
		capacitorRechageRate: getAttribute(
			shipInvType,
			CAPACITOR_RECHARGE_ATTRIBUTE_ID
		),
		cargoCapacity: getAttribute(shipInvType, CARGO_CAPACITY_ATTRIBUTE_ID),

		hiSlots: getAttribute(shipInvType, HI_SLOTS_ATTRIBUTE_ID),
		medSlots: getAttribute(shipInvType, MED_SLOTS_ATTRIBUTE_ID),
		lowStots: getAttribute(shipInvType, LOW_SLOTS_ATTRIBUTE_ID),
		turretSlots: getAttribute(shipInvType, TURRET_SLOTS_LEFT_ATTRIBUTE_ID),
		launcherSlots: getAttribute(
			shipInvType,
			LAUNCHER_SLOTS_LEFT_ATTRIBUTE_ID
		),
		rigSlots: getAttribute(shipInvType, RIG_SLOTS_ATTRIBUTE_ID),

		maxVelocity: getAttribute(shipInvType, MAX_VELOCITY_ATTRIBUTE_ID),
		inertiaModifier: getAttribute(
			shipInvType,
			INERTIA_MODIFIER_ATTRIBUTE_ID
		),
		mass: getAttribute(shipInvType, MASS_ATTRIBUTE_ID),
		warpSpeed: getAttribute(shipInvType, WARP_SPEED_ATTRIBUTE_ID),

		droneCapacity: getAttribute(shipInvType, DRONE_CAPACITY_ATTRIBUTE_ID),
		droneBandwidth: getAttribute(shipInvType, DRONE_BANDWIDTH_ATTRIBUTE_ID),

		maxTargetRange: getAttribute(
			shipInvType,
			MAX_TARGET_RANGE_ATTRIBUTE_ID
		),
		maxLockedTargets: getAttribute(
			shipInvType,
			MAX_LOCKED_TARGETS_ATTRIBUTE_ID
		),
		sensorStrength,
		sensorType,
		signatureRadius: getAttribute(
			shipInvType,
			SIGNATURE_RADIUS_ATTRIBUTE_ID
		),
		scanResolution: getAttribute(shipInvType, SCAN_RESOLUTION_ATTRIBUTE_ID),
	};
	return result;
}
