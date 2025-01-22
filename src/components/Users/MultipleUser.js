import { React, useState } from "react"
import UserOne from "./userOne";
import UserTwo from "./userTwo";

const MultipleUsers = () => {
    const [employerUserData, setEmployerUserData] = useState({
        userOne: {},
        userTwo: {},
    });

    const SetEmployerUserDataObject = (dataType, data) => {
        setEmployerUserData((prevUserData) => ({
            ...prevUserData,
            [dataType]: data,
        }));
    };

    console.log("employerUserData====", employerUserData)

    return (
        <>
            <h1>Multiple Users</h1>
            <UserOne
                SetEmployerUserDataObject={SetEmployerUserDataObject}
            />
            <br />
            <UserTwo
                SetEmployerUserDataObject={SetEmployerUserDataObject}
            />
        </>
    )
}

export default MultipleUsers




