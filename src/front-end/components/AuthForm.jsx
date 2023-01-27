import { useState, useRef } from "react";
import { registerUser, logInUser } from "../api/auth"

const AuthForm = ({ setToken, setUser }) => {
    const [ isLogIn, setIsLogIn ] = useState(0);
    let usernameRef = useRef()
    let passwordRef = useRef()
    let emailRef = useRef()
    let confirmRef = useRef()

    const authPageData = {
        headerString: ["No account? Click Register to create one.", "Already have an account? Click Login."],
        headerButton: ["Register", "Login"],
        authPrompt: ["Login here!", "Register here!"],
        submitButton: ["Login", "SignUp"],
        authFuncs: [logInUser, registerUser],
    }

    const toggleAuthPage = () => {
        isLogIn? setIsLogIn(0) : setIsLogIn(1)
    }
    
    const comparePasswords = () => {
        return confirmRef.current.value === passwordRef.current.value
      }

return(
    <div >
        <p> {authPageData.headerString[isLogIn]} </p>
        <button className="headerButton" onClick={toggleAuthPage}> {authPageData.headerButton[isLogIn]} </button>
        <h2> {authPageData.authPrompt[isLogIn]} </h2>
        <form className="authForm"
        onSubmit={async (e) => {
            e.preventDefault() 
        try {
            if ( !isLogIn || comparePasswords() ) {
                const result = await authPageData.authFuncs[isLogIn](usernameRef.current.value, passwordRef.current.value)
                setToken(result.token)
                setUser(result.user)
                console.log("THIS IS MY RESULT:", result)
            } else {
                alert("Password must match.")
            }
        } catch (error) {
            console.error(error)
            throw error
        } }}> 
         <div> 
            { isLogIn === 1 && (
                <>
                <label htmlFor="email"> Email: </label>
                <input type="text" minLength={5} required={true} placeholder="email" ref={emailRef} />
                </>
            )}
        </div>
        <div> 
            <label htmlFor="username"> Username: </label>
            <input type="text" minLength={1} required={true} placeholder="username" ref={usernameRef} />
        </div>
        <div> 
            <label htmlFor="password"> Password: </label>
            <input type="password" minLength={8} required={true} placeholder="password" ref={passwordRef} />
        </div>
        <div> 
            { isLogIn === 1 && (
                <>
                <label htmlFor="password"> Confirm Password: </label>
                <input type="password" minLength={8} required={true} placeholder="password" ref={confirmRef} />
                </>
            )}
        </div>
        <input type="submit" value={authPageData.submitButton[isLogIn]} />

        </form>
    </div>
)
}

export default AuthForm;
