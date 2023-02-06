import React from "react";

const Home = ({user}) => {
    console.log(user)
    return (
        <div className="homepage">
            <h1>Hello and welcome to 3D Glasses-dot-com!</h1>
            <p>We are currently undergoing maintenance, 
                please check back soon for the full user experience!</p>
        </div>
    );
};

export default Home;