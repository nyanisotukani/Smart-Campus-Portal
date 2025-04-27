import React from 'react';
import { useLocation } from 'react-router-dom';

const Lecturer = () => {
    const { state } = useLocation();
    return <h2>{state.name}, you logged in as a Lecturer</h2>;
};

export default Lecturer;
