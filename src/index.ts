import { Ship } from './types/ship';

export function calculateShip(ship: Ship): string {
	// const name = ship.name;
	return `${ship.name}(${ship.typeID})`;
}
