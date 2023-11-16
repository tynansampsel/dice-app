import './App.css';
import { useState, useEffect, useLayoutEffect } from "react";

function Die(props) {

    // takes a number as "dieType" and gets a random number between that and 1. (a num of 10 or 100 will go from 0-9 and 00-99 respectably)
    const getRandomNumber = (dieType) => {
        return Math.round((Math.random() * dieType))
    }

    return (
        <div className={`Die d${props.dieType} ${props.mini ? "mini" : ""}`} onClick={() => props.reRollDice(props.id)}>
            <h1>{props.roll}</h1>
        </div>
    );
}

export default Die;
