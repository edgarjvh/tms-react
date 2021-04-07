import React, { useState } from 'react';
import './Company.css';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { setMainScreen, setPages, setSelectedPageIndex, setScale, setCustomers, setSelectedCustomer } from '../../actions';
import axios from 'axios';

import DispatchPage from './dispatch/Dispatch.jsx';
import CustomersPage from './customers/Customers.jsx';
import CarriersPage from './carriers/Carriers.jsx';
import LoadBoardPage from './load-board/LoadBoard.jsx';
import InvoicePage from './invoice/Invoice.jsx';

function Company(props) {
    const containerCls = classnames({
        'main-company-container': true,
        'is-showing': props.mainScreen === 'company'
    })

    const userClick = () => {
        props.setMainScreen('admin');
    }

    const dispatchBtnClick = () => {
        let curPages = props.pages;
        let exist = false;

        curPages.map((page, index) => {
            if (page.name === 'dispatch') {
                props.setSelectedPageIndex(index);
                exist = true;
            }
        });

        if (!exist) {
            curPages.push({
                name: 'dispatch',
                component: <DispatchPage pageName={'Dispatch Page'} tabTimes={1000} />
            });

            props.setPages(curPages);
            props.setSelectedPageIndex(curPages.length - 1);
        }
    }

    const customersBtnClick = () => {
        let curPages = props.pages;
        let exist = false;

        curPages.map((page, index) => {
            if (page.name === 'customers') {
                props.setSelectedPageIndex(index);
                exist = true;
            }
        });

        if (!exist) {
            curPages.push({
                name: 'customers',
                component: <CustomersPage pageName={'Customer Page'} tabTimes={2000} />
            });

            props.setPages(curPages);
            props.setSelectedPageIndex(curPages.length - 1);
        }
    }

    const carriersBtnClick = () => {
        let curPages = props.pages;
        let exist = false;

        curPages.map((page, index) => {
            if (page.name === 'carriers') {
                props.setSelectedPageIndex(index);
                exist = true;
            }
        });

        if (!exist) {
            curPages.push({
                name: 'carriers',
                component: <CarriersPage pageName={'Carriers Page'} tabTimes={3000} />
            });

            props.setPages(curPages);
            props.setSelectedPageIndex(curPages.length - 1);
        }
    }

    const loadBoardBtnClick = () => {
        let curPages = props.pages;
        let exist = false;

        curPages.map((page, index) => {
            if (page.name === 'load-board') {
                props.setSelectedPageIndex(index);
                exist = true;
            }
        });

        if (!exist) {
            curPages.push({
                name: 'load-board',
                component: <LoadBoardPage pageName={'Load Board Page'} tabTimes={4000} />
            });

            props.setPages(curPages);
            props.setSelectedPageIndex(curPages.length - 1);
        }
    }

    const invoiceBtnClick = () => {
        let curPages = props.pages;
        let exist = false;

        curPages.map((page, index) => {
            if (page.name === 'invoice') {
                props.setSelectedPageIndex(index);
                exist = true;
            }
        });

        if (!exist) {
            curPages.push({
                name: 'invoice',
                component: <InvoicePage pageName={'Invoice Page'} tabTimes={5000} />
            });

            props.setPages(curPages);
            props.setSelectedPageIndex(curPages.length - 1);
        }
    }

    const switchAppBtnClick = () => {
        props.setScale(props.scale === 1 ? 0.7 : 1);
    }

    return (
        <div className={containerCls}>
            <div className="main-content">
                <div className="menu-bar">
                    <div className="section">
                        <div className="menu-btn" id="switch-company-screen-btn" onClick={userClick}>Admin</div>
                    </div>
                    <div className="section">
                        <div className="mochi-input-decorator">
                            <input type="search" placeholder="just type" id="txt-main-search" />
                        </div>
                    </div>
                    <div className="section">
                        <div className="menu-btn" id="home-btn" title="Home"><span className="fas fa-home"></span></div>
                        <div className="menu-btn" id="dispatch-btn" title="Dispatch" onClick={dispatchBtnClick}><span className="fas fa-truck-loading"></span></div>
                        <div className="menu-btn" id="customers-btn" title="Customers" onClick={customersBtnClick}><span className="fas fa-users"></span></div>
                        <div className="menu-btn" id="carriers-btn" title="Carriers" onClick={carriersBtnClick}><span className="fas fa-people-carry"></span></div>
                        <div className="menu-btn" id="load-board-btn" title="Load Board" onClick={loadBoardBtnClick}><span className="fas fa-chart-area"></span></div>
                        <div className="menu-btn" id="invoice-btn" title="Invoice" onClick={invoiceBtnClick}><span className="fas fa-file-invoice"></span></div>
                        <div className="menu-btn" id="switch-app-btn" title="Switch App" onClick={switchAppBtnClick}><span className="fas fa-exchange-alt"></span></div>
                    </div>
                </div>
                <div className="screen-content">
                    <div className="pages-container" style={{
                        position: 'absolute',
                        display: 'flex',
                        width: '500%',
                        overflowX: 'auto',
                        transform: `translateX(${((100 / 5) * -1) * (props.selectedPageIndex + 1)}%)`
                    }}>
                        {
                            props.pages.map((page, index) => {
                                return (
                                    <div style={{
                                        width: '20%',
                                        height: '100%',
                                        transform: `scale(${props.scale})`,
                                        transition: 'all ease 0.7s',
                                        boxShadow: props.scale === 1 ? '0 0 3px 5px transparent' : '0 0 10px 5px rgba(0,0,0,0.5)',
                                        borderRadius: props.scale === 1 ? 0 : '20px'
                                    }} key={index}>
                                        {page.component}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        mainScreen: state.systemReducers.mainScreen,
        pages: state.companyReducers.pages,
        selectedPageIndex: state.companyReducers.selectedPageIndex,
        scale: state.systemReducers.scale
    }
}

export default connect(mapStateToProps, {
    setMainScreen,
    setPages,
    setSelectedPageIndex,
    setScale,
    setCustomers,
    setSelectedCustomer
})(Company)