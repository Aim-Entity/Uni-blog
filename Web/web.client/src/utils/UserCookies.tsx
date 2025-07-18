type userDataType = {
    data: {
        email: string,
        name: string,
        userId: string,
    },
    status: string
}

export const GetUserId = () : string => {
    let userId;

    const userDataString = sessionStorage.getItem("authUser");
    if (userDataString){
        const UserData : userDataType = JSON.parse(userDataString);
        userId = UserData.data.userId;
    } else {
        throw new Error("authUser session data was not retrieved");
    }

    return userId;
}

export const GetUserName = () : string => {
    let userName;

    const userDataString = sessionStorage.getItem("authUser");
    if (userDataString){
        const UserData : userDataType = JSON.parse(userDataString);
        userName = UserData.data.name;
    } else {
        throw new Error("authUser session data was not retrieved");
    }

    return userName;
}