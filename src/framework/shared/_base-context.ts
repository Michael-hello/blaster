import type { SubscriptionLike } from "rxjs";


export abstract class BaseContext {

    public subscriptions: SubscriptionLike[] = [];
    public intervals: NodeJS.Timer[] = [];

    constructor(){}    

    dispose(){
        if(this.subscriptions != null){
            for(let sub of this.subscriptions)
                sub.unsubscribe();
        };

        if(this.intervals != null){
            for(let int of this.intervals)
                clearInterval(int)
        };
    }
}