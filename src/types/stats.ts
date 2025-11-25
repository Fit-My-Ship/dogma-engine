export type DamageType = 'em' | 'ex' | 'th' | 'ki';

export type SensorType = 'radar' | 'ladar' | 'gravimetric' | 'magnetometric';

export interface TankLayer {
	hp: number;
	resists: Record<DamageType, number>;
}

export interface RechargableTankLayer extends TankLayer {
	rechargeRate: number;
}

export interface ShipStats {
	typeID: number;
	// tank
	hull: TankLayer;
	armor: TankLayer;
	shield: RechargableTankLayer;
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
	lowStots: number;
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
