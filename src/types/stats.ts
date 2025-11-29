export type DamageType = 'em' | 'explosive' | 'thermal' | 'kinetic';

type ShortPrefix = {
	em: 'em';
	explosive: 'exp';
	thermal: 'thr';
	kinetic: 'kin';
}[DamageType];

type Resistance = {
	[K in DamageType as `${ShortPrefix}Resist`]: number;
};

type AddPrefix<T, Prefix extends string> = {
	[K in keyof T as `${Prefix}${Capitalize<string & K>}`]: T[K];
};

type TankLayer = Resistance & {
	hp: number;
};

type ArmorTankLayer = AddPrefix<TankLayer, 'armor'>;
type HullTankLayer = AddPrefix<TankLayer, 'hull'>;
type ShieldTankLayer = AddPrefix<TankLayer, 'shield'> & {
	shieldRechargeRate: number;
};

export type SensorType = 'radar' | 'ladar' | 'gravimetric' | 'magnetometric';

interface ShipStatsRest {
	typeID: number;
	// fit
	powerOutput: number;
	powerLoad: number;
	cpuOutput: number;
	cpuLoad: number;
	calibrationOutput: number;
	calibrationLoad: number;
	capacitorCapacity: number;
	capacitorRechageRate: number;
	cargoCapacity: number;
	// slots
	hiSlots: number;
	medSlots: number;
	lowSlots: number;
	turretSlots: number;
	launcherSlots: number;
	rigSlots: number;
	// navigation
	maxVelocity: number;
	inertiaModifier: number;
	mass: number;
	warpSpeed: number;

	// drones
	droneCapacity: number;
	droneBandwidth: number;

	// targeting
	maxTargetRange: number;
	maxLockedTargets: number;
	sensorStrength: number;
	sensorType: SensorType;
	signatureRadius: number;
	scanResolution: number;
}

export type ShipStats = HullTankLayer &
	ArmorTankLayer &
	ShieldTankLayer &
	ShipStatsRest;
