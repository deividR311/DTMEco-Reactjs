import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route { ...rest }
            component={(props) => (
                (!isAuthenticated || null)
                    ? (<Redirect to="/login"/>)
                    : ( <Component {...props} /> )
            )}
        />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired
}
