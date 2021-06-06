import React from 'react';
import Page from './Page';
import DashboardContainer from '../containers/Dashboard';

const Dashboard = () => {
    const pageTitle = () => {
        return 'Расписание';
    };

    const pageMeta = () => {
        return [{ name: 'description', content: 'Dashboard' }];
    };

    const pageLink = () => {
        return [];
    };

    const getMetaData = () => ({
        title: pageTitle(),
        meta: pageMeta(),
        link: pageLink(),
    });

    return (
        <Page {...getMetaData()}>
            <DashboardContainer />
        </Page>
    );
};

export default Dashboard;
