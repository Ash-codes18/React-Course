import Input from "./Input";
import { useInput } from "../hooks/useInput";
import { hasMinLength, isEmail } from '../util/validation'

export default function Login() {
  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError : emailHasError
  } = useInput('',isEmail);

  const{
    value : passwordValue,
    handleInputBlur : handlePasswordBlur,
    handleInputChange : handlePasswordChange,
    hasError : passwordHasError
  } = useInput('', value => hasMinLength(value,6))


  const handleSubmission = (e) => {
    e.preventDefault();

    if(emailHasError || passwordHasError){
      return;
    }
    console.log(emailValue, passwordValue)
  };

  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email"}
        />
        <Input
          label="password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
