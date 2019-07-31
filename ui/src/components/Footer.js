import React, { Component } from 'react';
import { colorShark, colorShuttleGrey } from '@tds/core-colours'
import logoImage from '../images/logo.png'

class Footer extends Component {
    render() {

        const date = new Date();
        //console.log(this.props);
        return (
            <footer className="page-footer" style={{marginTop:50, backgroundColor:colorShuttleGrey}}>
            <div className="container">
              <div className="row">
                <div className="col l6 s12">
                    <img className="responsive-img" src={logoImage} alt="logo" style={{maxWidth:200, margin:"auto"}} />
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="white-text">Links</h5>
                  <ul>
                    <li><a className="grey-text text-lighten-3" href="https://adfs.telusinternational.com/adfs/ls/auth/integrated/?SAMLRequest=jVLLTsMwELwj8Q%2BW73nRQ5HVBJVWFZV4RDRw4GacTbqtYwev08Lfk6Yg4ADiOju7M7O7k4vXRrMdOEJrUp6EMWdglC3R1Cl%2FKBbBOb%2FITk8mJBvdimnn1%2BYeXjogz%2FpOQ2IopLxzRlhJSMLIBkh4JVbTm2txFsaiddZbZTVny3nKK1xjuW5wW22g1iW2VrWbGltVVXpTlVtoldxK2HD2%2BGnr7GBrSdTB0pCXxvdQnJwH8TgYxUUyFqORGCVPnOUfSpdojgn%2BsvV8JJG4Koo8yO9WxTBghyW4256d8traWkOobHOQzyUR7nq4kpqAsykRON8bnFlDXQNuBW6HCh7ur1O%2B9r4lEUX7%2FT78GhPJyIPuCI0HZ%2BShWepjQRHPhi2LIaj7tt6%2FY8hPGzz7h9Ak%2BqaRfZz1kHY5z61G9camWtv9zIH0fVTvuj7pwrpG%2Bt9tJGEyIFgG1UAVnaEWFFYIJWdRdlT9%2BT%2F9V70D&RelayState=https%3A%2F%2Fwww.google.com%2Fa%2Ftelusinternational.com%2FServiceLogin%3Fservice%3Dmail%26passive%3Dtrue%26rm%3Dfalse%26continue%3Dhttps%253A%252F%252Fmail.google.com%252Fmail%252F%26ss%3D1%26ltmpl%3Ddefault%26ltmplcache%3D2%26emr%3D1%26osid%3D1#">
                          TELUS Active Directory
                        </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-copyright" style={{backgroundColor:colorShark}}>
              <div className="container">
              Developed by TELUS International TICA
              <a className="grey-text text-lighten-4 right" href="https://www.telusinternational.com/">© {date.getFullYear()} TELUS International</a>
              </div>
            </div>
          </footer>
        );
    }
}

export default Footer;