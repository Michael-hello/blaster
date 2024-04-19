

export type Event = {
    topic: string;
    [key: string]: any;
};

export const KeyPressDown = 'topic:key:down';
export const KeyPressUp = 'topic:key:up';

export const ShipMoveEvent = "topic:ship:move";
export const ShipSmashGate = "topic:ship:gate:smash";

export interface UserEvent extends Event {
    key: string   
};

export function isUserEvent(event: Event){
    return event.topic == KeyPressDown || event.topic == KeyPressUp;
};


