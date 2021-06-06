import React from 'react';
import { RouteConfig } from 'react-router-config';

import App from "../containers/App";
import Main from "../pages/Main";
import Dashboard from "../pages/Dashboard";
import Subjects from "../pages/Subjects";
import Teachers from "../pages/Teachers";
import Rooms from "../pages/Rooms";

import { Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getSubjects } from '../actions/subject';

const routes: RouteConfig[] = [
    {
        component: App as React.ComponentType,
        routes: [
            {
                path: "/",
                exact: true,
                component: Main,
            },
            {
                path: "/subjects",
                component: Subjects,
            },
            {
                path: "/rooms",
                component: Rooms,
            },
            {
                path: "/teachers",
                component: Teachers,
            },
            {
                path: "/dashboard",
                component: Dashboard,
            },
        ],
    },
];

export default routes;
