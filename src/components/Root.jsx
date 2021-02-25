import React from 'react'
import { connect } from 'react-redux';
import { setMainScreen } from '../actions';
import Company from './company/Company.jsx';
import Admin from './admin/Admin.jsx';
import './Root.css';
import classnames from 'classnames';

function Root(props) {

    const rootCls = classnames({
        'root-container': true
    });

    const companyClasses = classnames({
        'is-shown': props.mainScreen === 'company',
        'main-screen-container': true
    })

    const adminClasses = classnames({
        'is-shown': props.mainScreen === 'admin',
        'main-screen-container': true
    })

    return (
        <div className={rootCls}>
            <Company className={companyClasses} />
            <Admin className={adminClasses} />
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