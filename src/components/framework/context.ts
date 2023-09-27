import { ReplaySubject, type Subject, type SubscriptionLike } from "rxjs";
import { debounceTime, filter, map } from "rxjs/operators";
import { ShipContext } from "./ship-context";



export class BlasterContext {

    private subscriptions: SubscriptionLike[] = [];

    public events: Subject<Event> = new ReplaySubject();
    public ship: ShipContext = null;

    private _width = 0;
    private _height = 0;

    constructor( ){
        this.ship = new ShipContext(this.events);
    };

    initialise(width: number, height: number){
        this.updateDiemnsions(width, height);
        this.ship.updateLocation(width/2, height/2);
    };

    updateDiemnsions(width: number, height: number){
        this._width = width;
        this._height = height;
    };

    dispose(){
        if(this.subscriptions != null){
            for(let sub of this.subscriptions)
                sub.unsubscribe();
        }
    }
}