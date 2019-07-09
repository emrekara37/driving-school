import React from 'react';
import {Link} from 'react-router-dom';
import Image from '../../image/rob.png';
import FourZeroFourStyleWrapper from './404.style';
const page404 = () => {
    return (<FourZeroFourStyleWrapper className="iso404Page">
        <div className="iso404Content">
            <h1>
                404
            </h1>
            <h3>
                Aradığınız sayfa bulunamadı
            </h3>
                <Link to="/dashboard">
                    Anasayfaya dön
                </Link>
        </div>

        <div className="iso404Artwork">
            <img alt="#" src={Image}/>
        </div>
    </FourZeroFourStyleWrapper>);
};
export default page404;
