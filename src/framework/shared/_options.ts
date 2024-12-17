

export interface IOptions {

    /** gate options */
    spawnRateGate: number; //number of gates to spawn each cycle
    rotationSpeed: number; //rotation in degrees per second
    explosionRadius: number; //in pixels
    gateLength: number; //in pixels

    /** enemy options */
    spawnRateEnemy: number; //number of enemies to spawn each cycle
    rateIncreasePower: number; //in seconds. How often to increase spawnRateEnemy
    enemySpeed: number; //amount moved in pixels per cycle step
    enemySize: number; //in pixels

    /** ship options */
    shipSpeed: number; //amount moved in pixels per cycle step
    shipSize: number; //in pixels
    shipReloadRate: number; //in ms

    //between 1 and 10. 10 being hardest. Effects things like spawn cycle length
    difficulty: number; 
};


/** abstract so can load in from a different source in the future */
export class OptionsService {

    getOptions() : IOptions {
        return {
            spawnRateGate: 2,
            rotationSpeed: 5,
            explosionRadius: 50,
            gateLength: 75,
            spawnRateEnemy: 4,
            rateIncreasePower: 3,
            enemySpeed: 4,
            enemySize: 10,
            shipSpeed: 12,
            shipSize: 10,
            shipReloadRate: 30,
            difficulty: 2
        }
    };
};