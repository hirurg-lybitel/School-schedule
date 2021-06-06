import React from "react";
import Page from './Page';
import RoomsContainer from '../containers/Rooms';

const Rooms = () => {
    const pageTitle = () => {
        return "Классы";
    };

    const pageMeta = () => {
        return [{ name: "description", content: "Rooms" }];
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
            <RoomsContainer />
        </Page>
    );
};

export default Rooms;
