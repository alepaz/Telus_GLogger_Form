import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { colorAccessibleGreen, colorTelusPurple } from '@tds/core-colours'

class Header extends Component {
    renderContent() {
        switch  (this.props.auth) {
            case null:
                return;
            case false:
                return <li style={{ marginTop: '15px' }}><a href="/auth/google">Login With Google</a></li>;
            default:
                return [
                    <li style={{ marginTop: '15px' }} key="manage"><a href="/employees/view">View Employees</a></li>,
                    <li style={{ marginTop: '15px' }} key="logout"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        //console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper" style={{ backgroundColor: colorTelusPurple }}>
                    <Link
                        to={ this.props.auth ? '/employees' : '/' }
                        className="left brand-logo"
                        style={{ margin: '0 10px' }}
                    >
                        Glogger Form
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }){
    //Pass state to header as props
    return { auth };
}

export default connect(mapStateToProps)(Header);