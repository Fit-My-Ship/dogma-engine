import { IShipData } from '../db/types';
import { TypeAttribute } from '../types/attrib';
import { TypeEffect } from '../types/effect';
import { Pilot } from './pilot';
import { ShipModule } from './ship-module';

export class Ship {
	private hullTypeID: number;
	private hullAttributes: TypeAttribute[];
	private hullEffects: TypeEffect[];
	private modules: ShipModule[];
	private pilot: Pilot;

	constructor(shipData: IShipData) {
		this.hullTypeID = shipData.typeID;
		this.hullAttributes = shipData.attributes;
		this.hullEffects = shipData.effects;
		this.modules = [];
		this.pilot = new Pilot();
	}
}
