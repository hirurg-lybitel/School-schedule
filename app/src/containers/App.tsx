import React, { FC } from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Navigation from "./Navigation";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        //backgroundColor: 'yellow'
    },
    appBarSpacer: theme.mixins.toolbar,
}));

interface Props {
    route: RouteConfig;
}

const App: FC<Props> = ({ route }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navigation></Navigation>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Switch>{renderRoutes(route.routes)}</Switch>
            </main>
        </div>
    );
};

export default App;
