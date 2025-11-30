import { IShipData } from '../db/types';
import { TypeAttribute } from '../types/attrib';
import { TypeEffect } from '../types/effect';
import { SensorType, ShipStats } from '../types/stats';
import { Pilot } from './pilot';
import { ShipModule } from './ship-module';

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

const SHIP_STATS_TEMPLATE: Omit<ShipStats, 'sensorType' | 'sensorStrength'> = {
	hullHp: HULL_HP_ATTRIBUTE_ID,
	hullEmResist: HULL_EM_RESIST_ATTRIBUTE_ID,
	hullExpResist: HULL_EXP_RESIST_ATTRIBUTE_ID,
	hullThrResist: HULL_THR_RESIST_ATTRIBUTE_ID,
	hullKinResist: HULL_KIN_RESIST_ATTRIBUTE_ID,
	armorHp: ARMOR_HP_ATTRIBUTE_ID,
	armorEmResist: ARMOR_EM_RESIST_ATTRIBUTE_ID,
	armorExpResist: ARMOR_EXP_RESIST_ATTRIBUTE_ID,
	armorThrResist: ARMOR_THR_RESIST_ATTRIBUTE_ID,
	armorKinResist: ARMOR_KIN_RESIST_ATTRIBUTE_ID,
	shieldHp: SHIELD_HP_ATTRIBUTE_ID,
	shieldEmResist: SHIELD_EM_RESIST_ATTRIBUTE_ID,
	shieldExpResist: SHIELD_EXP_RESIST_ATTRIBUTE_ID,
	shieldThrResist: SHIELD_THR_RESIST_ATTRIBUTE_ID,
	shieldKinResist: SHIELD_KIN_RESIST_ATTRIBUTE_ID,
	shieldRechargeRate: SHIELD_RECHARGE_RATE_ATTRIBUTE_ID,
	//
	powerOutput: POWER_OUTPUT_ATTRIBUTE_ID,
	powerLoad: POWER_LOAD_ATTRIBUTE_ID,
	cpuOutput: CPU_OUTPUT_ATTRIBUTE_ID,
	cpuLoad: CPU_LOAD_ATTRIBUTE_ID,
	calibrationOutput: CALIBRATION_OUTPUT_ATTRIBUTE_ID,
	calibrationLoad: CALIBRATION_LOAD_ATTRIBUTE_ID,
	capacitorCapacity: CAPACITOR_CAPACITY_ATTRIBUTE_ID,
	capacitorRechageRate: CAPACITOR_RECHARGE_ATTRIBUTE_ID,
	cargoCapacity: CARGO_CAPACITY_ATTRIBUTE_ID,
	//
	hiSlots: HI_SLOTS_ATTRIBUTE_ID,
	medSlots: MED_SLOTS_ATTRIBUTE_ID,
	lowSlots: LOW_SLOTS_ATTRIBUTE_ID,
	turretSlots: TURRET_SLOTS_LEFT_ATTRIBUTE_ID,
	launcherSlots: LAUNCHER_SLOTS_LEFT_ATTRIBUTE_ID,
	rigSlots: RIG_SLOTS_ATTRIBUTE_ID,

	maxVelocity: MAX_VELOCITY_ATTRIBUTE_ID,
	inertiaModifier: INERTIA_MODIFIER_ATTRIBUTE_ID,
	mass: MASS_ATTRIBUTE_ID,
	warpSpeed: WARP_SPEED_ATTRIBUTE_ID,
	//
	droneCapacity: DRONE_CAPACITY_ATTRIBUTE_ID,
	droneBandwidth: DRONE_BANDWIDTH_ATTRIBUTE_ID,
	//
	maxTargetRange: MAX_TARGET_RANGE_ATTRIBUTE_ID,
	maxLockedTargets: MAX_LOCKED_TARGETS_ATTRIBUTE_ID,
	signatureRadius: SIGNATURE_RADIUS_ATTRIBUTE_ID,
	scanResolution: SCAN_RESOLUTION_ATTRIBUTE_ID,
};

export class Ship {
	private hullTypeID: number;
	private hullAttributes: TypeAttribute[];
	private hullEffects: TypeEffect[];
	private baseAttributes: TypeAttribute[];
	private modules: ShipModule[];
	private pilot: Pilot;

	constructor(shipData: IShipData) {
		this.hullTypeID = shipData.typeID;
		this.hullAttributes = shipData.attributes;
		this.baseAttributes = shipData.attributes.map(e => e);
		this.hullEffects = shipData.effects;
		this.modules = [];
		this.pilot = new Pilot();
	}

	getAttributeValue(attributeID: number): number {
		return this.baseAttributes.find(e => e.attributeID === attributeID)?.value ?? 0;
	}

	getSensorTypeAndStrength(): {
		sensorStrength: number;
		sensorType: SensorType;
	} {
		const sensorData = [
			{
				type: 'radar' as SensorType,
				attributeID: SCAN_RADAR_STREGTH_ATTRIBUTE_ID,
			},
			{
				type: 'ladar' as SensorType,
				attributeID: SCAN_LADAR_STREGTH_ATTRIBUTE_ID,
			},
			{
				type: 'gravimetric' as SensorType,
				attributeID: SCAN_GRAVIMETRIC_STREGTH_ATTRIBUTE_ID,
			},
			{
				type: 'magnetometric' as SensorType,
				attributeID: SCAN_MAGNETOMETRIC_STREGTH_ATTRIBUTE_ID,
			},
		];

		const bestSensor = sensorData.reduce((best, current) => {
			const currentStrength = this.getAttributeValue(current.attributeID);
			const bestStrength = this.getAttributeValue(best.attributeID);
			return currentStrength > bestStrength ? current : best;
		});

		return {
			sensorStrength: this.getAttributeValue(bestSensor.attributeID),
			sensorType: bestSensor.type,
		};
	}

	mapTemplateToValues(template: typeof SHIP_STATS_TEMPLATE): typeof SHIP_STATS_TEMPLATE {
		return Object.fromEntries(
			Object.entries(template).map(([key, attributeId]) => [key, this.getAttributeValue(+attributeId)])
		) as typeof SHIP_STATS_TEMPLATE;
	}

	async getShipStats(): Promise<ShipStats> {
		// TODO: Calculate ship stats

		const { sensorStrength, sensorType } = this.getSensorTypeAndStrength();

		const statsFromTemplate = this.mapTemplateToValues(SHIP_STATS_TEMPLATE);

		const result: ShipStats = {
			...statsFromTemplate,
			sensorType,
			sensorStrength,
		};
		return result;
	}
}
