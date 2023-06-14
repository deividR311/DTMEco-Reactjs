import React from 'react';

const LoginForm = ({
    handleValidation, userLogged, handleOnChange,
    loading, isLogged, errorMessage, errorCode
}) => {

    return (
        <>
            <section className="container-fluid p-0 login__contenedor">
                <div className="row justify-content-center login__imgfondo">
                    <div className="col-md-8 login__box">
                        <span className="CTNlogin__titulo">
                            <h3 className="login__titulo">Gestión de solicitudes Datos maestros</h3>
                        </span>
                        <form onSubmit={ handleValidation }>
                            <div className="form-group login__ecoLabel offset-md-2 col-md-6">
                                <label className="login__label">Correo institucional:</label>
                                <input
                                    type="text"
                                    name="user"
                                    className="form-control"
                                    value={userLogged.user}
                                    required
                                    onChange={handleOnChange}
                                    placeholder="Correo electronico"
                                />
                                <label className="login__label">Contraseña:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control" 
                                    placeholder="Contraseña"
                                    value={userLogged.password}
                                    required
                                    onChange={handleOnChange}
                                />
                            </div>
                            <div className="col-md-3 login__ctnBtn">
                                <button className="btn btnPrimary" disabled={loading} type="submit">Ingresar</button>
                            </div>
                        </form>
                        <p className="eco_p2 offset-md-2 col-md-6">En caso de bloqueo gestiónalo aquí: {' '}
                            <a href=" https://passwordreset.microsoftonline.com/" target="_blank" rel="noopener noreferrer"> 
                                Restablecimiento de contraseña de Microsoft Online
                            </a>
                        </p>
                        <p className="eco_p2 offset-md-2 col-md-6">Al ingresar usted <a className="login__aConditionsPolitics">acepta términos de uso y políticas de privacidad</a></p>
                    </div>
                    { isLogged === false &&
                        <div className="col-md-8 login__ctnErrors">
                            <span>
                            <strong>{ errorCode }</strong>
                            <p>{ errorMessage }</p>
                            </span>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default LoginForm;
