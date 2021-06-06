import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
//import App from "./components/app/app";
import AppView from "./components/app/AppView";

import redux from "redux";
import { connect } from 'react-redux';
import subject from './reducers/subject';
import { getSubjectsSuccess } from "./actions/subject";

const store = redux.createStore(subject);

store.dispatch({
    type: "SET_STATE",
    state: {
        phones: ["Xiaomi Mi 10", "Samsung Galaxy Note20"],
    },
});

ReactDOM.render(
    <Provider store={store}>
        <AppView />
    </Provider>,
    document.getElementById("root"),
);
