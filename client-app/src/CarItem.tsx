import React from 'react';
import { ICar } from './demo';

interface IProps {
    car: ICar;
}

const CarItem: React.FC<IProps> = ({ car }) => {
    return (
        <div>
            <h2>{car.color}</h2>
        </div>
    );
};

export default CarItem;