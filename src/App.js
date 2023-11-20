import './css/layout.css';
import './css/style.css';
import './css/dice.css';
import { useState} from "react";
import Die from './Die';
import DieInSelectedDice from './DieInSelectedDice';

function App() {
    //these are the dice that have been rolled and are on the field.
    const [rolledDice, setRolledDice] = useState([]);

    //these are the dice that are selected but have not yet been rolled.
    const [selectedDice, SetSelectedDice] = useState([]);


    const addDieToSelectedDice = (dieType) => {
        if(SelectedDiceLimitReached()) return;

        console.log(`added d${dieType}`)

        const newDie = {
            dieType: dieType,
            roll: dieType
        }
        SetSelectedDice([...selectedDice, newDie])
    }

    //this takes a dieType (4,6,8,10,100/%,12,20) and returns a random number.
    //d100/d% are dice that have 10 faces from 00-90 to represent the tens place.
    const getRandomNumber = (dieType) => {

        let isd100;
        if(dieType === 100) {
            dieType = 10;
            isd100 = true;
        }

        let roll = Math.ceil(Math.random() * dieType);
        let faceShowing = "";

        if(dieType === 10 && roll === 10){ roll = "0" }

        faceShowing = ""+roll;
        if(isd100){ faceShowing = `${roll}0` }

        return faceShowing;
    }

    //this is called by the Roll dice button and rolls all the dice in the selectedDice array 
    //and copys the rolled dice into the rolledDice array.
    const rollDice = () => {
        if(!DiceAreSelected()) return;

        console.log("rolledDice!")

        const newRolledDice = selectedDice.map(die => {
            return {
                dieType: die.dieType,
                roll: getRandomNumber(die.dieType)
            }
        })

        setRolledDice([newRolledDice, ...rolledDice]);
    }

    //this is called when the user clicks a dice that has already been rolled
    //and rerolls that dice.
    const reRollDice = (dieId) => {
        if(rolledDice.length < 1){return}


        let oldRolledDiceSets = [];

        if(rolledDice.length > 1){
            oldRolledDiceSets = rolledDice.slice(1);
        }
        

        const newRolledDice = rolledDice[0].map((die, i) => {
            if(dieId === i){
                return {
                    dieType: die.dieType,
                    roll: getRandomNumber(die.dieType)
                }
            } else {
                return die;
            }
        })
        oldRolledDiceSets.unshift(newRolledDice);

        setRolledDice(oldRolledDiceSets);
    }

    const emptyRolledDice = () => {
        setRolledDice([]);
    }

    const emptySelectedDice = () => {
        SetSelectedDice([]);
    }

    //this is called when a selected die is clicked. it removes the die from the selectedDice array.
    const removeDieFromSelectedDice = (dieId) => {
        const newSelectedDice = selectedDice.filter((die, i) => i != dieId);
        SetSelectedDice(newSelectedDice);
    }


    const SelectedDiceLimitReached = () => {
        return selectedDice.length >= 5;
    }
    
    const diceOnField = () => {
        return rolledDice.length > 0
    }
    const DiceAreSelected = () => {
        return selectedDice.length > 0
    }

    
    return (
        <div className="App">
            <div className="previousDiceContainer">
                {
                    rolledDice.length > 1 && rolledDice[1].map((die, i) => {
                        return <Die 
                                    key={i} 
                                    dieType={die.dieType} 
                                    roll={die.roll} 
                                    mini={true} 
                                />
                    })
                }
            </div>
            <div className="diceContainer">
                {
                    rolledDice.length > 0 && rolledDice[0].map((die, i) => {
                        return <Die 
                                    key={i} 
                                    dieType={die.dieType} 
                                    roll={die.roll} 
                                    id={i} 
                                    reRollDice={reRollDice} 
                                />
                    })
                }
            </div>
            <div className="SelectedDiceContainer">
                {
                    selectedDice.map((die, i) => {
                        return <DieInSelectedDice 
                                    key={i} 
                                    dieType={die.dieType} 
                                    id={i} 
                                    removeDieFromSelectedDice={removeDieFromSelectedDice} 
                                />
                    })
                }
                {
                    DiceAreSelected() &&
                    <div 
                        className={`button_emptySelectedDice`} 
                        onClick={emptySelectedDice}>
                        <h2>X</h2>
                    </div>
                }
            </div>
            <div className="buttonContainer">
                <div className="diceButtonsContainer">
                    <div className={`button_addD4 ${SelectedDiceLimitReached() && "disabled"}`} onClick={() => addDieToSelectedDice(4)}></div>
                    <div className={`button_addD6 ${SelectedDiceLimitReached() && "disabled"}`} onClick={() => addDieToSelectedDice(6)}></div>
                    <div className={`button_addD8 ${SelectedDiceLimitReached() && "disabled"}`} onClick={() => addDieToSelectedDice(8)}></div>
                    <div className={`button_addD10 ${SelectedDiceLimitReached() && "disabled"}`} onClick={() => addDieToSelectedDice(10)}></div>
                    <div className={`button_addD100 ${SelectedDiceLimitReached() && "disabled"}`} onClick={() => addDieToSelectedDice(100)}><h2>%</h2></div>
                    <div className={`button_addD12 ${SelectedDiceLimitReached() && "disabled"}`} onClick={() => addDieToSelectedDice(12)}></div>
                    <div className={`button_addD20 ${SelectedDiceLimitReached() && "disabled"}`} onClick={() => addDieToSelectedDice(20)}></div>
                </div>
                <div className="optionButtonsContainer">
                    <div 
                        className={`button_roll ${!DiceAreSelected() && "button_disabled"}`} 
                        onClick={rollDice}>
                        <h2>Roll</h2>
                    </div>
                    <div 
                        className={`button_emptyField ${!diceOnField() && "button_disabled"}`} 
                        onClick={emptyRolledDice}>
                        <h2>Clear</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
