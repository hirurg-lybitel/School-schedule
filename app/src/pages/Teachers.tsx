import React from "react";
import Page from './Page';
import TeachersContainer from '../containers/Teachers';

const Teachers = () => {

    const pageTitle = () => {
        return "Учителя";
    };

    const pageMeta = () => {
        return [
            { name: 'description', content: 'Teachers' },
        ];
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
            <TeachersContainer />
        </Page>
    );

};

export default Teachers;