import React from 'react';
import SchedulteTable from '../components/ScheduleTable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';

import { getDashboard } from '../actions/dashboard';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '90wh',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height: '80vh',
        maxWidth: '100%',
    },
}));

const Dashboard = () => {
    const { dashboards } = useSelector<RootState, RootState['dashboard']>((state) => state.dashboard);

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <SchedulteTable objects={dashboards} />
        </Container>
    );
};

export default Dashboard;
