import React from 'react';
import '@tds/core-css-reset/dist/index.css';
import Box from '@tds/core-box';
import Button from '@tds/core-button';
import DisplayHeading from '@tds/core-display-heading';
import Paragraph from '@tds/core-paragraph';

const Landing = () => {
    return (
    <Box between={5}>
        <div><br/></div>
        <DisplayHeading>Register users in GLogger for a temporal instance through this application.</DisplayHeading>

        <div>
        <a href="/auth/google"><Button>Login with Google</Button></a>
        
        </div>
        <br />
        <br />
        <br />
        <br />
        <Paragraph>Developed by Telus International TICA.</Paragraph>
    </Box>
    )
};

export default Landing;