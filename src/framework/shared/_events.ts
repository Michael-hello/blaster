import type { IGate } from "../gates";
import type { ILocation } from "./_page-state";


export type Event = {
    topic: string;
    [key: string]: any;
};

export const KeyPressDown = 'topic:key:down';
export const KeyPressUp = 'topic:key:up';

export const ShipMoveEvent = "topic:ship:move";
export const ShipGateSmashEvent = "topic:ship:gate:smash";

export const ShipEnemyCollision = "topic:enemy:collision";
export const ShipGateCollision = "topic:gate:collision";
export const EnemyDeath = "topic:enemy:death";



export interface UserEvent extends Event {
    key: string   
};
export interface ShipMoveEvent extends Event, ILocation { };
export interface EnemyCollisionEvent extends Event, ILocation { }; //ship death
export interface GateCollisionEvent extends Event, ILocation { }; //ship death 
export interface GateSmashEvent extends Event, ILocation { //gate explosion - enemy death
    gate: IGate;
}; 
export interface EnermyDeathEvent extends Event, ILocation { };



export function isUserEvent(event: Event): event is UserEvent {
    return event.topic == KeyPressDown || event.topic == KeyPressUp;
};
export function isShipMoveEvent(event: Event): event is ShipMoveEvent {
    return event.topic == ShipMoveEvent;
};
export function isGameOverEvent(event: Event) {
    return event.topic == ShipEnemyCollision || event.topic == ShipGateCollision;
};
export function isGateSmashEvent(event: Event): event is GateSmashEvent {
    return event.topic == ShipGateSmashEvent;
};


/**
 *  types of events:
 * 
 *      - gate collision - ship death
 *      - gate collision - enemy death : explosion_radius
 *      - enemy collison - ship death
 * 
 *      - gate spawn
 *      - enemy spawn
 * 
 *      - enemy move 
 *      - gate rotation
 */

