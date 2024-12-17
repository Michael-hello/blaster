



export function radToDegree(rad: number) {
    let scalar = 180/Math.PI;
    let deg = rad * scalar;
    return wrapAngle(deg);
};

export function degreeToRad(degree: number) {
    let scalar = Math.PI/180;
    let rad = degree * scalar;
    return wrapAngle(rad, 'radians');
};

/** wraps angle to between 0 and 360 */
export function wrapAngle(angle: number, units: 'degrees' | 'radians' = 'degrees') {

    let _360 = units == 'degrees' ? 360 : 2 * Math.PI;

    while (angle < 0) {
        angle += _360
    }
    while (angle >= _360) {
        angle -= _360;
    };

    return angle;
};