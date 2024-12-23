import type { ILocation } from "./_page-state";


export interface IExplosion extends ILocation {
    colour: string;
    type: string;
    size: number; //width in pixels
}