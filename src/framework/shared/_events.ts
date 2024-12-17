

export type Event = {
    topic: string;
    [key: string]: any;
};

export const KeyPressDown = 'topic:key:down';
export const KeyPressUp = 'topic:key:up';

export const ShipMoveEvent = "topic:ship:move";
export const ShipSmashGate = "topic:ship:gate:smash";

export const ShipEnemyCollision = "topic:enemy:collision";
export const ShipGateCollision = "topic:gate:collision";

export interface UserEvent extends Event {
    key: string   
};
export interface ShipMoveEvent extends Event {
    x: number;
    y: number;
};

export function isUserEvent(event: Event): event is UserEvent {
    return event.topic == KeyPressDown || event.topic == KeyPressUp;
};
export function isShipMoveEvent(event: Event): event is ShipMoveEvent {
    return event.topic == ShipMoveEvent;
};
export function isGameOverEvent(event: Event) {
    return event.topic == ShipEnemyCollision || event.topic == ShipGateCollision;
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

