import React from 'react';
import { useLocation } from 'react-router-dom';

const Admin = () => {
    const { state } = useLocation();
    return <h2>{state.name}, you logged in as an Admin</h2>;
};

export default Admin;
