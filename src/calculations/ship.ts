import { getInvType } from '../db/inv-types';
import { Ship } from '../types/ship';
import { ShipStats } from '../types/stats';

export function calculateShip(ship: Ship): ShipStats {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const rawType = getInvType(ship.typeID);
	const result: ShipStats = {
		typeID: ship.typeID,
		hull: {
			hp: 550,
			resists: { em: 0.67, ex: 0.67, ki: 0.67, th: 0.67 },
		},
		armor: {
			hp: 0,
			resists: { em: 0, ex: 0, ki: 0, th: 0 },
		},
		shield: {
			hp: 0,
			resists: { em: 0, ex: 0, ki: 0, th: 0 },
			rechargeRate: 100,
		},
	};
	return result;
}
