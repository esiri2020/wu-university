import React from 'react';
import Navbar from './Navbar';

export default function layout(props) {
    return (
        <div className={props.class}>
            <Navbar />
            {props.children}
        </div>
    )
}
