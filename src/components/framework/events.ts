

export type Event = {
    topic: string;
    [key: string]: any;
};

export const KeyPressDown = 'topic:key:down';

export const KeyPressUp = 'topic:key:up';

export type KeyPressEvent = typeof KeyPressDown | typeof KeyPressUp;

export function isKeyPressEvent(event: Event){
    return event.topic == KeyPressDown || event.topic == KeyPressUp;
};


