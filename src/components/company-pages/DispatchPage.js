import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import './../../styles/dispatchPage.css';


function DispatchPage(props) {
    return (
        <div className="dispatch-main-container" style={{
            borderRadius: props.scale === 1 ? 0 : '20px'
        }}>
            <div className="page-title">{props.pageName}</div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        scale: state.companyScreenReducers.scale
    }
}

export default connect(mapStateToProps, null)(DispatchPage)