import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginContext from '../../context/LoginContext';

const PrivateRoute = ({component: Component, ...rest}) => {
    const { loggedIn } = useContext(LoginContext);

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            loggedIn() ?
                <Component {...props} />
            : <Redirect to="/connexion" />
        )} />
    );
};

export default PrivateRoute;