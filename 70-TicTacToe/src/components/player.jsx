import { useState } from "react";

const Player = ({name,symbol,isActive,onNameChange}) => {

    const [playerName, setPlayerName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setPlayerName(e.target.value);
    }

    const handleEdit = () => {
        setIsEditing(editing => !editing);
        if(isEditing){
            onNameChange(symbol,playerName);
        }
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    let buttonValue = "Edit";

    if(isEditing){
        editablePlayerName = <input type="text" className="player" value={playerName} required onChange={handleChange}/>
        buttonValue = "Save";
    }

    return (
        <>
        <li className={isActive ? "active" : ""}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>{buttonValue}</button>
        </li>
        </>
    );
}
 
export default Player;