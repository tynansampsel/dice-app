import './App.css';
import { useState, useEffect, useLayoutEffect } from "react";

function DieInBag(props) {
    return (
        <div className={`DieInBag d${props.dieType}`} onClick={() => props.removeDieFromBag(props.id)}>
            <h1>{props.dieType === 100 ? "%" : ""}</h1>
        </div>
    );
}

export default DieInBag;
