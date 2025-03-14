import { useRef, useState } from 'react';

export default function Login() {

  const [isValidInput,setIsValidInput] = useState({
    email : true,
    password : true
  });

  const handleSubmission = (e) => {
    e.preventDefault();
    console.log("Submitted");
    const enteredEmail = email.current.value;
    const  enteredPassword = password.current.value;

    const emailIsInvalid = !enteredEmail.includes('@');

    if(emailIsInvalid){
      setIsValidInput(prev => ({
        ...prev,
        email : false
      }))
      return;
    }
    
    setIsValidInput(prev => ({
      ...prev,
      email : true
    }))


    console.log(enteredEmail,enteredPassword);
    email.current.value = '';
    password.current.value = '';
 }

  const email = useRef();
  const password = useRef();

  return (
    <form onSubmit = {handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
            ref={email}
            id="email"
            // type="email" 
            name="email"
             />
             {
              !isValidInput.email
              &&
              <div className='control-error'>
                <p>Email should contain @</p>
              </div>
             }
        </div>
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            ref={password}
            id="password"
            type="password"
            name="password"
            />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
