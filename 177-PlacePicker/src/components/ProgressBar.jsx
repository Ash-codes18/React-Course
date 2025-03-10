import { useState, useEffect } from 'react'

const Progress = ({totalTime}) => {
    
    const [remaniningTime,setRemaningTime] = useState(totalTime);

    useEffect(() => {
      const progressBar = setInterval( () => {
        setRemaningTime(prevTime => prevTime-10);
      },10)
  
      return () => {
        clearInterval(progressBar);
      }
    },[])
    
    
    return (
        <>
            <progress value={remaniningTime} max={totalTime}/>
        </>
    );
}
 
export default Progress;