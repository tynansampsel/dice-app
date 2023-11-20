
function DieInSelectedDice(props) {
    return (
        <div 
            className={`DieInSelectedDice d${props.dieType}`} 
            onClick={() => props.removeDieFromSelectedDice(props.id)}>
            <h1>{props.dieType === 100 && "%"}</h1>
        </div>
    );
}

export default DieInSelectedDice;
