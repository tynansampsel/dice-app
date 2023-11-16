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
        console.log("rolled!")

        const rolledDice = bag.map(die => {
            return {
                dieType: die.dieType,
                roll: getRandomNumber(die.dieType)
            }
        })

        setRolled([rolledDice, ...rolled]);
    }


    const emptyBag = () => {
        setBag([]);
    }

    const removeDieFromBag = (dieId) => {
        console.log("clicked!")

        const newBag = bag.filter((die, i) => i != dieId);
        setBag(newBag);
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
                        return <Die key={i} dieType={die.dieType} roll={die.roll} />
                    }) : ""
                }
            </div>
            <div className="bagContainer">
                {
                    bag.map((die, i) => {
                        return <DieInBag key={i} dieType={die.dieType} id={i} removeDieFromBag={removeDieFromBag} />
                    })
                }
            </div>
            <div className="buttonContainer">
                <div className="diceButtonsContainer">
                    <div className="button_addD4" onClick={() => addDieToBag(4)}>
                    </div>
                    <div className="button_addD6" onClick={() => addDieToBag(6)}>
                    </div>
                    <div className="button_addD8" onClick={() => addDieToBag(8)}>
                    </div>
                    <div className="button_addD10" onClick={() => addDieToBag(10)}>
                    </div>
                    <div className="button_addD100" onClick={() => addDieToBag(100)}><h2>%</h2>
                    </div>
                    <div className="button_addD12" onClick={() => addDieToBag(12)}>
                    </div>
                    <div className="button_addD20" onClick={() => addDieToBag(20)}>
                    </div>
                </div>
                <div className="optionButtonsContainer">
                    <div className="button_roll" onClick={rollDice}>
                        <h2>Roll!</h2>
                    </div>
                    <div className="button_emptyBag" onClick={emptyBag}>
                        <h2>Empty</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
