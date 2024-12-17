import { type IOptions, type ILocation, SubscriptionHandler, uuid } from "../shared";

export class Gate extends SubscriptionHandler implements IGate {

    id = uuid();

    constructor(
        private getShipLocation: () => ILocation,
        private collisionDetected: () => void,
        public options: IOptions,
        location: ILocation) 
    {
        super();
        this.x = location.x;
        this.y = location.y;

        this.startRotation();
    };

    public x = 0;
    public y = 0;
    public rotation = Math.random() * 360;

    startRotation() {

    };

};


export interface IGate extends ILocation {
    id: string;
};