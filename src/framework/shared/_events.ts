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
export const ShipLifeChange = "topic:ship:life:change";

export const ShipEnemyCollision = "topic:enemy:collision";
export const ShipGateCollision = "topic:gate:collision";
export const EnemyDeath = "topic:enemy:death";

export const PauseEventTopic = "topic:game:paused";



export interface UserEvent extends Event {
    key: string   
};
export interface ShipMoveEvent extends Event, ILocation { };
export interface ShipLifeChangeEvent extends Event { 
    remainingLives: number
};
export interface EnemyCollisionEvent extends Event, ILocation { }; //ship life lost
export interface GateCollisionEvent extends Event, ILocation { }; //ship life lost 
export interface CollisionEvent extends Event, ILocation { }; //filter 
export interface GateSmashEvent extends Event, ILocation { //gate explosion - enemy death
    gate: IGate;
}; 
export interface EnermyDeathEvent extends Event, ILocation { };

export interface PauseEvent extends Event { pause: boolean };



export function isUserEvent(event: Event): event is UserEvent {
    return event.topic == KeyPressDown || event.topic == KeyPressUp;
};
export function isShipMoveEvent(event: Event): event is ShipMoveEvent {
    return event.topic == ShipMoveEvent;
};
export function isGateSmashEvent(event: Event): event is GateSmashEvent {
    return event.topic == ShipGateSmashEvent;
};
export function isCollisionEvent(event: Event): event is CollisionEvent {
    return event.topic == ShipEnemyCollision || event.topic == ShipGateCollision
};
export function isPauseEvent(event: Event): event is PauseEvent {
    return event.topic == PauseEventTopic;
};


/**
 *  types of events:
 * 
 *      - gate collision - ship life lost
 *      - gate collision - enemy death : explosion_radius
 *      - enemy collison - ship life lost
 * 
 *      - gate spawn
 *      - enemy spawn
 * 
 *      - enemy move 
 *      - gate rotation
 */

