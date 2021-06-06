import React from 'react';
import Page from './Page';
//import South_park from '../images/South_park.jpg';
//const hourGlassSvg = require('../images/South_park.jpg');

const About = () => {
    const pageTitle = () => {
        return 'Школьное расписание';
    };

    const pageMeta = () => {
        return [{ name: 'description', content: 'main' }];
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
            <div></div>
        </Page>
    );
};

export default About;
