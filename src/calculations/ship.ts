import { getInvType } from '../db/inv-types';
import { testDb } from '../test/test-entities';
import { Ship } from '../types/ship';
import { ShipStats } from '../types/stats';
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

export function calculateShip(ship: Ship): ShipStats {
	const shipInvType = getInvType(ship.typeID, testDb);
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
	};
	return result;
}
