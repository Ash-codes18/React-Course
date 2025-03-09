import { useState } from 'react'
import Header from './components/Header.jsx'
import UserInput from './components/UserInput.jsx'
import Results from './components/Results.jsx';

function App() {
  const [userInput,setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  const isInputValid = userInput.initialInvestment > 0 && userInput.annualInvestment > 0 && userInput.expectedReturn > 0 && userInput.duration > 0;

  
  function handleChange(inputIdentifier, newValue){
    setUserInput(prevUserInput => {
        return{
            ...prevUserInput,
            [inputIdentifier]: +newValue
        }
    });
  }

  return (
    <>
      <Header/>
      <UserInput onChangeInput={handleChange} userInput={userInput}/>
      {isInputValid ? <Results input={userInput}/>
                    :
      <p className='center'>Please enter valid input</p>
      }
    </>
  )
}

export default App
