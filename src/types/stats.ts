export type DamageType = 'em' | 'ex' | 'th' | 'ki';

export interface TankLayer {
	hp: number;
	resists: Record<DamageType, number>;
}

export interface RechargableTankLayer extends TankLayer {
	rechargeRate: number;
}

export interface ShipStats {
	typeID: number;
	hull: TankLayer;
	armor: TankLayer;
	shield: RechargableTankLayer;
	powerOutput: number;
	powerLoad: number;
	cpuOutput: number;
	cpuLoad: number;
}
