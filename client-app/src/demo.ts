let data : string;
data = "32";

export interface ICar {
    color: string;
    model: string;
    topSpeed?: number;
}

const car1: ICar = {
    color: 'blue',
    model: 'BMW'
};


const car2: ICar = {
    color: 'black',
    model: 'Toyota',
    topSpeed: 200
};

const multiply = (x: number, y: number) => {
    x = y;
};

export const cars = [car1, car2];