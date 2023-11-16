import './App.css';
import { useState, useEffect, useLayoutEffect } from "react";

function Die(props) {
    return (
        <div className={`Die d${props.dieType} ${props.mini ? "mini" : ""}`}>
            <h1>{props.roll}</h1>
        </div>
    );
}

export default Die;
