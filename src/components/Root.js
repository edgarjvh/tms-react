import React from 'react'
import { connect } from 'react-redux';
import { setMainScreen } from './../actions';
import MainCompanyScreen from './MainCompanyScreen';
import MainAdminScreen from './MainAdminScreen';
import './../styles/root.css';
import classnames from 'classnames';

function Root(props) {

    const rootCls = classnames({
        'root-container': true
    });

    const companyScreenCls = classnames({
        'is-shown': props.mainScreen === 'company',
        'main-screen-container': true
    })

    const adminScreenCls = classnames({
        'is-shown': props.mainScreen === 'admin',
        'main-screen-container': true
    })

    return (
        <div className={rootCls}>
            <MainCompanyScreen className={companyScreenCls} />
            <MainAdminScreen className={adminScreenCls} />
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
})(Root)