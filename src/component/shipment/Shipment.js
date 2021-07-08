import React, { useContext } from 'react';
import { theme } from '../../App';

const Shipment = () => {
    const [loginUser,setLoginUser] = useContext(theme)
    return (
        <div>
            <h1>{loginUser}</h1>
        </div>
    );
};

export default Shipment;