import React from 'react';
import '@tds/core-css-reset/dist/index.css';
import Box from '@tds/core-box';
import Button from '@tds/core-button';
import DisplayHeading from '@tds/core-display-heading';
import lionImage from '../images/Lion_Looking_at_Laptop.jpg'

const Landing = () => {
    return (
    <Box between={5}>
        <img className="responsive-img" src={lionImage} alt="lion" style={{maxWidth:450, margin:"auto", paddingTop:5}} />
        <DisplayHeading>Register users in GLogger for a temporal instance through this application.</DisplayHeading>

        <div>
        <a href="/auth/google"><Button>Login with Google</Button></a>
        
        </div>
    </Box>
    )
};

export default Landing;