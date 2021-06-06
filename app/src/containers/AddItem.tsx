import React from "react";
import { useHistory } from "react-router-dom";

const AddItem = () => {
    const history = useHistory();

    const goToPreviousPath = () => {
        history.goBack();
    };

    return (
        <div>
            AddItem div
            <button onClick={goToPreviousPath}>Back</button>
        </div>
    );
};

export default AddItem;
