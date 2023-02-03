import React, { useEffect, useState } from "react";
import { fetchUsers } from "../api/fetch";

const AdminPage = ({token}) => {
    const [ userList, setUserList ] = useState([]);

    useEffect(()=> {
        const getUsers = async () => {
            const users = await fetchUsers(token);
            setUserList(users);
        }
        getUsers();
    }, []);

    console.log(userList);
    
    return (
        <div className="homepage">
            <h1>Welcome to the Admin Page!</h1>
            <p>Currently the only functionality here is seeing a list of User Details! Creeper.</p>
            {userList.map((user) => {
                return (
                    <div className="single-user-listing">
                        <b>{user.username} | {user.id}</b>
                        <p>   First Name: {user.firstName}</p>
                        <p>   Last Name: {user.lastName}</p>
                        <p>   Address: {user.address}</p>
                        <p>   Telephone #: {user.telephone}</p>
                        <p>   e-Mail Address: {user.email}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default AdminPage;