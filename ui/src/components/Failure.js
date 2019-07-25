import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@tds/core-box';
import Button from '@tds/core-button';
import DisplayHeading from '@tds/core-display-heading';
import Paragraph from '@tds/core-paragraph';
import bunnyImage from '../images/angora-bunny.png'


const Failure = () => {
    return (
        <Box between={5}>
        <img className="responsive-img" src={bunnyImage} alt="bunny" style={{maxWidth:400, margin:"auto", paddingTop:40}} />
        <DisplayHeading>Upsss. We only allow Telus International or Voxpro emails.</DisplayHeading>

        <div>
        <a href="/auth/google"><Button>Login with Google</Button></a>
        </div>
    </Box>
    );
};

export default Failure;