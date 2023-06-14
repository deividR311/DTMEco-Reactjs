import React from 'react';
import logoEcopetrol from '../../../../assets/images/logo_ecopetrol.png';

const LoginHeader = () => {
    return (
        <>
            <header className="login__header m-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <img className="login__logo" src={logoEcopetrol} alt="logo ecopetrol" />
                    </div>
                </div>
            </header>
        </>
    )
}

export default LoginHeader;
