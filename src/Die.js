
function Die(props) {


    //checks if the dice is the highest number possible and returns "highest" so that the css can style the text green.
    //the d100 highest is 00 and not 90, and the highest d10 is 0. so this function also checks for this.
    const isHighest = () => {
        if(props.dieType === 10){
            return props.roll == "0" ? "highest" : ""
        }
        else if(props.dieType === 100){
            return props.roll == "00" ? "highest" : ""
        }
        else {
            return props.roll == props.dieType ? "highest" : ""
        }
    }

    //checks if the dice is the lowest number possible and returns "lowest" so that the css can style the text red.
    //the d100 lowest is 10 and not 00, and the lowest d10 is 1. so this function also checks for this.
    const isLowest = () => {
        if(props.dieType === 100){
            return props.roll == 10 ? "lowest" : ""
        } else {
            return props.roll == 1 ? "lowest" : ""
        }
    }

    //"mini" just means its a small dice and is applied to the previously rolled dice.
    const isMini = () => {
        return props.mini ? "mini" : ""
    }

    return (
        <div 
            className={`Die d${props.dieType} ${isMini()} ${isHighest()} ${isLowest()}`} 
            onClick={() => props.reRollDice && props.reRollDice(props.id)}>
            <h1>{props.roll}</h1>
        </div>
    );
}

export default Die;
