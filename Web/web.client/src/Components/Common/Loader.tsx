import React from "react";
import { SyncLoader } from "react-spinners";

const CommonDotLoader = () => {
    return (
        <React.Fragment>
            <SyncLoader
                color="#363d48"
                loading
                margin={4}
                size={12}
                speedMultiplier={0.5}
            />
        </React.Fragment >
    );
};

export default CommonDotLoader;