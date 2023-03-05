// Page Profil

import React from 'react';
import Log from '../components/Log';

const Profil = () => {
    return (
        <div className='profil-page'>
            <div className='log-container'>
                <Log signin={false} signup={true} />
                <div className="image-container">
                    <img src="./images/log.jpg" alt="image_log" />
                </div>
            </div>
        </div>
    );
};

export default Profil;