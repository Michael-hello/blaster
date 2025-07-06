import type { Subject, SubscriptionLike } from "rxjs";
import { isPauseEvent, type Event } from "./_events";



export abstract class SubscriptionHandler {

    public subscriptions: SubscriptionLike[] = [];
    public intervals: NodeJS.Timer[] = [];

    get disposed(){ return this._disposed };

    constructor(){}  
    
    private _disposed = false;

    dispose(){
        if(this.subscriptions != null){
            for(let sub of this.subscriptions)
                sub.unsubscribe();
        };

        if(this.intervals != null){
            for(let int of this.intervals)
                clearInterval(int)
        };

        this._disposed = true;
    };
};



export class BaseContext extends SubscriptionHandler {

    constructor() {
        super()
    };

    paused: boolean = false;
    children: IPauseableChild[] = [];

    initialiseEvents(events: Subject<Event>, children?: IPauseableChild[]) {
        
        if(this.children != null)
            this.children = children as IPauseableChild[];

        let sub1 = events.pipe(
        ).subscribe((event) => {
            if(isPauseEvent(event)){
                this.paused = event.paused;
                this.pauseChildren(this.paused);
            };
        });
        this.subscriptions.push(sub1);
    };

    private pauseChildren(pause: boolean) {
        if(this.children == null) return
        for(let child of this.children) {
            child.updatePause(pause);
        };
    };
   
};


export interface IPauseableChild {
    updatePause: (pause: boolean) => void;
}