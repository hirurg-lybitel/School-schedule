import React from 'react';
import Page from './Page';
import SubjectsContainer from '../containers/Subjects';

const Subjects = () => {

    const pageTitle = () => {
        return "Предметы";
    };

    const pageMeta = () => {
        return [
            { name: 'description', content: 'Subject' },
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
            <SubjectsContainer />
        </Page>
    );
};

export default Subjects;