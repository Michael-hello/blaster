import type { Subject, SubscriptionLike } from "rxjs";
import { type Event, isKeyPressEvent, KeyPressDown, KeyPressUp } from "./events";
import { debounceTime, filter, map } from "rxjs/operators";

export class ShipContext{

    private subscriptions: SubscriptionLike[] = [];

    private _positionX: number = null;
    private _positionY: number = null;

    keyDownW = false;
    keyDownA = false;
    keyDownS = false;
    keyDownD = false;

    constructor(
        private events: Subject<Event>
    ){
        
        let sub1 = this.events.pipe(
            filter(x => isKeyPressEvent(x))
        ).subscribe(x => {
            if(x.topic == KeyPressDown) this.processKeyDown(x as any);
            if(x.topic == KeyPressUp) this.processKeyUp(x as any);
        });

        this.subscriptions.push(sub1);

        let interval = setInterval(() => this.move(), 30);
    };

    get positionX(){ return this._positionX }
    get positionY(){ return this._positionY }

    updateLocation(x: number, y: number){
        this._positionX = x;
        this._positionY = y;
    };

    processKeyDown(x: KeyboardEvent){
        let key = x.key.toLowerCase();
        
        if(key == 'w') this.keyDownW = true;
        if(key == 'a') this.keyDownA = true;
        if(key == 's') this.keyDownS = true;
        if(key == 'd') this.keyDownD = true;
    };

    processKeyUp(x: KeyboardEvent){
        let key = x.key.toLowerCase();
        
        if(key == 'w') this.keyDownW = false;
        if(key == 'a') this.keyDownA = false;
        if(key == 's') this.keyDownS = false;
        if(key == 'd') this.keyDownD = false;
    };

    move(){
        let move = 10;

        if(this.keyDownW) this._positionY -= move;
        if(this.keyDownA) this._positionX -= move;
        if(this.keyDownS) this._positionY += move;
        if(this.keyDownD) this._positionX += move;
    };



}