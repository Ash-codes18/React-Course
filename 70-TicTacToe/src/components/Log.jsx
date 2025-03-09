const Log = ({turns}) => {

    return (
        <>
            <ol id="log">
                {turns.map((turn) => (
                    <li key={`${turn.square.row}${turn.square.col}`}>
                        <span>Player {turn.player} played in row : {turn.square.row}, col : {turn.square.col}</span>
                    </li>
                ))}
            </ol>
        </>
    ); 
}
 
export default Log;