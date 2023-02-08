const PersonalInfo = ({persInfo, setPersInfo, setUser, user, token}) => {
    const userVar = user.regdate ? user : JSON.parse(localStorage.user)
    let yr = userVar.regdate.slice(0, 4)
    let mn = userVar.regdate.slice(5, 7)
    let day = userVar.regdate.slice(8, 10)
    
    return(
        <div>
            <p>Username: {user.username}</p>
            <p>Email Address: {user.email}</p>
            <p>Customer Since: {mn}/{day}/{yr}</p>
            
</div>
    )
}
export default PersonalInfo