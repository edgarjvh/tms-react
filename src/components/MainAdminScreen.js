import React from 'react';
import './../styles/mainAdminScreen.css';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { setMainScreen } from './../actions';

function MainAdminScreen(props) {
    const containerCls = classnames({
        'main-admin-container': true,
        'is-showing': props.mainScreen === 'admin'
    })

    const userClick = () => {
        props.setMainScreen('company');
    }

    return (
        <div className={containerCls}>
            <div className="main-content">
                <div className="menu-bar">
                    <div className="section">
                        <div className="menu-btn" id="switch-admin-screen-btn" onClick={userClick}>Company</div>
                    </div>
                    <div className="section">
                        <div className="mochi-input-decorator">
                            <input type="search" placeholder="just type" id="txt-main-search" />
                        </div>
                    </div>
                    <div className="section">
                        <div className="menu-btn" id="home-btn" title="Home"><span className="fas fa-home"></span></div>
                        <div className="menu-btn" id="users-btn" title="Users"><span className="fas fa-users"></span></div>
                        <div className="menu-btn" id="reports-btn" title="Reports"><span className="fas fa-file-alt"></span></div>
                        <div className="menu-btn" id="setup-company-btn" title="Setup Company"><span className="fas fa-building"></span></div>                        
                        <div className="menu-btn" id="switch-app-btn" title="Switch App"><span className="fas fa-exchange-alt"></span></div>
                    </div>
                </div>
                <div className="screen-content"></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        mainScreen: state.systemReducers.mainScreen
    }
}

export default connect(mapStateToProps, {
    setMainScreen
})(MainAdminScreen)