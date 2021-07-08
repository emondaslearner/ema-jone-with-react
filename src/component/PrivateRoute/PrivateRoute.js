import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { theme } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loginUser,setLoginUser] = useContext(theme);
    let auth = true;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loginUser ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
};

export default PrivateRoute;