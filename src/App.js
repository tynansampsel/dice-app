import './layout.css';
import './style.css';
import './dice.css';
import { useState, useEffect, useLayoutEffect } from "react";
import Die from './Die';
import DieInBag from './DieInBag';

var genericDie = {
    dieType: 8,
    roll: 5
}

function App() {
    const [rolled, setRolled] = useState([]);
    const [bag, setBag] = useState([]);

    const addDieToBag = (dieType) => {
        if(bagLimitReached()) return;

        console.log(`added d${dieType}`)

        const newDie = {
            dieType: dieType,
            roll: dieType
        }
        setBag([...bag, newDie])
    }

    const getRandomNumber = (dieType) => {

        let isd100;
        if(dieType === 100) {
            dieType = 10;
            isd100 = true;
        }

        let roll = Math.round(Math.random() * dieType);
        let faceShowing = "";

        if(dieType === 10 && roll === 10){ roll = "0" }

        faceShowing = ""+roll;
        if(isd100){ faceShowing = `${roll}0` }

        return faceShowing;
    }

    const rollDice = () => {
        if(!diceInBag()) return;

        console.log("rolled!")

        const rolledDice = bag.map(die => {
            return {
                dieType: die.dieType,
                roll: getRandomNumber(die.dieType)
            }
        })

        setRolled([rolledDice, ...rolled]);
    }

    const reRollDice = (dieId) => {
        if(rolled.length < 1){return}

        console.log("rolled!")

        let oldRolledDiceSets = [];
        if(rolled.length > 1){
            oldRolledDiceSets = rolled.slice(1);
        }
        

        const rolledDice = rolled[0].map((die, i) => {
            if(dieId === i){
                return {
                    dieType: die.dieType,
                    roll: getRandomNumber(die.dieType)
                }
            } else {
                return die;
            }
        })
        oldRolledDiceSets.unshift(rolledDice);

        setRolled(oldRolledDiceSets);
    }

    const clearField = () => {
        if(!diceOnField()) return;

        setRolled([]);
    }

    const emptyBag = () => {
        setBag([]);
    }

    const removeDieFromBag = (dieId) => {
        console.log("clicked!")

        const newBag = bag.filter((die, i) => i != dieId);
        setBag(newBag);
    }

    const bagLimitReached = () => {
        return bag.length >= 5;
    }
    
    const diceOnField = () => {
        return rolled.length > 0
    }
    const diceInBag = () => {
        return bag.length > 0
    }

    return (
        <div className="App">
            <div className="previousDiceContainer">
                {
                    rolled.length > 1 ? rolled[1].map((die, i) => {
                        return <Die key={i} dieType={die.dieType} roll={die.roll} mini={true} />
                    }) : ""
                }
            </div>
            <div className="diceContainer">
                {
                    rolled.length > 0 ? rolled[0].map((die, i) => {
                        return <Die key={i} dieType={die.dieType} roll={die.roll} id={i} reRollDice={reRollDice} />
                    }) : ""
                }
            </div>
            <div className="bagContainer">
                {
                    bag.map((die, i) => {
                        return <DieInBag key={i} dieType={die.dieType} id={i} removeDieFromBag={removeDieFromBag} />
                    })
                }
                {
                    diceInBag() ? 
                    <div className={`button_emptyBag`} onClick={emptyBag}>
                        <h2>X</h2>
                    </div> 
                    : <></>
                }
            </div>
            <div className="buttonContainer">
                <div className="diceButtonsContainer">
                    <div className={`button_addD4 ${bagLimitReached() ? "disabled" : ""}`} onClick={() => addDieToBag(4)}>
                    </div>
                    <div className={`button_addD6 ${bagLimitReached() ? "disabled" : ""}`} onClick={() => addDieToBag(6)}>
                    </div>
                    <div className={`button_addD8 ${bagLimitReached() ? "disabled" : ""}`} onClick={() => addDieToBag(8)}>
                    </div>
                    <div className={`button_addD10 ${bagLimitReached() ? "disabled" : ""}`} onClick={() => addDieToBag(10)}>
                    </div>
                    <div className={`button_addD100 ${bagLimitReached() ? "disabled" : ""}`} onClick={() => addDieToBag(100)}><h2>%</h2>
                    </div>
                    <div className={`button_addD12 ${bagLimitReached() ? "disabled" : ""}`} onClick={() => addDieToBag(12)}>
                    </div>
                    <div className={`button_addD20 ${bagLimitReached() ? "disabled" : ""}`} onClick={() => addDieToBag(20)}>
                    </div>
                </div>
                <div className="optionButtonsContainer">
                    <div className={`button_roll ${!diceInBag() ? "button_disabled" : ""}`} onClick={rollDice}>
                        <h2>Roll!</h2>
                    </div>
                    <div className={`button_emptyField ${!diceOnField() ? "button_disabled" : ""}`} onClick={clearField}>
                        <h2>Clear</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
