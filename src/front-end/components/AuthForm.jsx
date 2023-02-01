import { useState, useRef } from "react";
import { registerUser, logInUser } from "../api/auth"
import {useNavigate} from 'react-router-dom'
import { fetchSessionByUser, postSession } from "../api/fetch";

const AuthForm = ({ setToken, setUser, setSessionId, token, user }) => {
    const [ isLogIn, setIsLogIn ] = useState(0);
    const [rememberMe, setRememberMe] = useState(false)
    let usernameRef = useRef("")
    let passwordRef = useRef("")
    let emailRef = useRef("")
    let confirmRef = useRef("")
    // let firstNameRef = useRef()
    // let lastNameRef = useRef()
    // let addressRef = useRef()
    // let telephoneRef = useRef()
    const navigate = useNavigate()


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
                const result = await authPageData.authFuncs[isLogIn](usernameRef.current.value, passwordRef.current.value, emailRef?.current?.value) 
                console.log("THIS IS MY RESULTHEHERHEHRHE:", result)
                if (!result.session) {
                    setToken(result.token)
                    rememberMe ? localStorage.setItem('token', result.token) : null;
                    setUser(result.user)
                    rememberMe ? localStorage.setItem('user', JSON.stringify(result.user)) : null;
                    const response = await fetchSessionByUser(result?.user.id, result?.token);
                    console.log(response);
                    console.log("fetchSessionByUser:", response);
                    setSessionId(response.id);
                    rememberMe ? localStorage.setItem('sessionId', response.id) : null;
                } else {
                    setToken(result.userdata.token)
                    rememberMe ? localStorage.setItem('token', result.userdata.token) : null;
                    setUser(result.userdata.user)
                    rememberMe ? localStorage.setItem('user', JSON.stringify(result.userdata.user)) : null;
                    setSessionId(result.session.id);
                    rememberMe ? localStorage.setItem('sessionId', result.session.id) : null;
                }
                navigate('/')
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
            <input type="text" minLength={1} required={true} placeholder="Username" ref={usernameRef} />
        </div>
        <div> 
            <label htmlFor="password"> Password: </label>
            <input type="password" minLength={8} required={true} placeholder="Password" ref={passwordRef} />
        </div>
        <div> 
            { isLogIn === 1 && (
                <>
                <label htmlFor="password"> Confirm Password: </label>
                <input type="password" minLength={8} required={true} placeholder="Password" ref={confirmRef} />
                {/* <label htmlFor="firstname"> First Name: </label>
                <input type="text" placeholder="First Name" ref={firstNameRef} />
                <label htmlFor="lastname"> Last Name: </label>
                <input type="text" placeholder="Last Name" ref={lastNameRef} />
                <label htmlFor="address"> Address: </label>
                <input type="text" placeholder="Address" ref={addressRef} />
                <label htmlFor="telephone"> Phone Number: </label>
                <input type="text" placeholder="Phone Number" ref={telephoneRef} /> */}
                </>
            )}
        </div>
        <input type="submit" value={authPageData.submitButton[isLogIn]} />
        <label htmlFor="remember">Remember Me</label>
        <input type="checkbox" onChange={() => { setRememberMe(!rememberMe) }}/>
        </form>
    </div>
)
}

export default AuthForm;
