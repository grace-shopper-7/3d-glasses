import { useState, useRef } from "react";
import { registerUser, logInUser } from "../api/auth"
import {useNavigate} from 'react-router-dom'
import { fetchSessionByUser, postSession } from "../api/fetch";
import "./styles/Auth.css"

const AuthForm = ({ setToken, setUser, setSessionId, token, user }) => {
    const [ isLogIn, setIsLogIn ] = useState(0);
    const [ username, setUsername ] = useState("")
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
    <div className="thisIsHeader">
        <p> {authPageData.headerString[isLogIn]} </p>
        <button className="headerButton" onClick={toggleAuthPage}> {authPageData.headerButton[isLogIn]} </button>
        
        <form className="authForm"
        onSubmit={async (e) => {
            e.preventDefault() 
            try {
                if ( !isLogIn || comparePasswords() ) {
                const result = await authPageData.authFuncs[isLogIn](usernameRef.current.value, passwordRef.current.value, emailRef?.current?.value) 
                console.log("THIS IS MY RESULTHEHERHEHRHE:", result)
                if (!result.session) {
                    setToken(result.token)
                    localStorage.setItem('token', result.token);
                    setUser(result.user)
                    localStorage.setItem('user', JSON.stringify(result.user));
                    const response = await fetchSessionByUser(result?.user.id, result?.token);
                    console.log(response);
                    console.log("fetchSessionByUser:", response);
                    setSessionId(response.id);
                    localStorage.setItem('sessionId', response.id);
                    localStorage.setItem('username', result.user.username);
                } else {
                    setToken(result.userdata.token)
                    localStorage.setItem('token', result.userdata.token);
                    setUser(result.userdata.user)
                    localStorage.setItem('user', JSON.stringify(result.userdata.user));
                    setSessionId(result.session.id);
                    localStorage.setItem('sessionId', result.session.id);
                    localStorage.setItem('username', result.userdata.user.username);
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
            <h2> {authPageData.authPrompt[isLogIn]} </h2>
            { isLogIn === 1 && (
                <>
                <label htmlFor="Email"></label>
                <input className="authInput" type="text" minLength={5} required={true} placeholder="Email" ref={emailRef} />
                </>
            )}
        </div>
        <div> 
            <label htmlFor="username"></label>
            <input className="authInput" type="text" minLength={1} required={true} placeholder="Username" ref={usernameRef} />
        </div>
        <div> 
            <label htmlFor="password"></label>
            <input className="authInput" type="password" minLength={8} required={true} placeholder="Password" ref={passwordRef} />
        </div>
        <div> 
            { isLogIn === 1 && (
                <>
                <label htmlFor="password"></label>
                <input className="authInput" type="password" minLength={8} required={true} placeholder="Confirm Password" ref={confirmRef} />
                </>
            )}
        </div>
        <input className="submitInput" type="submit" value={authPageData.submitButton[isLogIn]} />
        </form>
    </div>
)
}

export default AuthForm;
