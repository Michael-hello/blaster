import type { ILocation } from "./_page-state";

/**
 * 
 * @param ship - location refers to centre of ship
 * @param object - location refers to centre of object
 * 
 * For simplicity the ship and objects are assumed to be circles
 */
export function CollisionCheck( ship: ILocation, object: ILocation , shipRadius: number, objectRadius: number) : boolean {
    //TO DO: add some validation on params

    //if distance between centres < sum of the radii then they overlap
    let dx = ship.x - object.x;
    let dy = ship.y - object.y;
    let distance = Math.sqrt( Math.pow(dx, 2) + Math.pow(dy, 2) );
    let radiiSum = shipRadius + objectRadius;

    // if radiiSum smaller than distance then there is no overlap
    return !(radiiSum <= distance);
};