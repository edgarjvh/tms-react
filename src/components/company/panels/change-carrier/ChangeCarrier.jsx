import React, { useState, useEffect } from 'react'
import './ChangeCarrier.css';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import { Transition, Spring, animated } from 'react-spring/renderprops';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
    setDispatchOpenedPanels,
    setShowingChangeCarrier,
    setSelectedOrder,
    setNewCarrier,
    setDispatchCarrierInfoCarrierSearchChanging,
    setDispatchCarrierInfoCarriersChanging,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoInsurance,
    setSelectedDispatchCarrierInfoDriver
} from './../../../../actions';

function ChangeCarrier(props) {
    const [newCarrier, setNewCarrier] = useState({});
    const [isSavingOrder, setIsSavingOrder] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNewCarrier(props.newCarrier);
    }, [props.newCarrier])

    const getCarrierByCode = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 9) {
            if (e.target.value.trim() !== '') {

                $.post(props.serverUrl + '/carriers', {
                    code: e.target.value.toLowerCase()
                }).then(res => {
                    if (res.result === 'OK') {
                        if (res.carriers.length > 0) {
                            props.setNewCarrier(res.carriers[0]);
                        } else {
                            props.setNewCarrier({});
                        }
                    } else {
                        props.setNewCarrier({});
                    }
                });
            } else {
                props.setNewCarrier({});
            }
        }
    }

    const searchCarrierBtnClick = () => {
        let carrierSearch = [
            {
                field: 'Name',
                data: (newCarrier.name || '').toLowerCase()
            },
            {
                field: 'City',
                data: ''
            },
            {
                field: 'State',
                data: ''
            },
            {
                field: 'Postal Code',
                data: ''
            },
            {
                field: 'Contact Name',
                data: ''
            },
            {
                field: 'Contact Phone',
                data: ''
            },
            {
                field: 'E-Mail',
                data: ''
            }
        ]

        $.post(props.serverUrl + '/carrierSearch', { search: carrierSearch }).then(async res => {
            if (res.result === 'OK') {

                await props.setDispatchCarrierInfoCarrierSearchChanging(carrierSearch);
                await props.setDispatchCarrierInfoCarriersChanging(res.carriers);

                if (!props.dispatchOpenedPanels.includes('carrier-info-search-changing')) {
                    await props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'carrier-info-search-changing'])
                }
            }
        });
    }

    const updateCurrentCarrier = () => {
        if ((props.newCarrier?.id || 0) === 0) {
            window.alert('You must select a new carrier first!');
            return;
        }

        if (props.selected_order.carrier.id === props.newCarrier.id) {
            window.alert('You must select a carrier different from the current one!');
            return;
        }

        if (window.confirm('Are you sure you want to change the carrier?')) {
            setIsLoading(true);

            let selected_order = { ...props.selected_order } || { order_number: 0 };

            selected_order.carrier_id = props.newCarrier.id;

            if ((selected_order.ae_number || '') === '') {
                selected_order.ae_number = getRandomInt(1, 100);
            }

            let event_parameters = {
                order_id: selected_order.id,
                time: moment().format('HHmm'),
                event_time: '',
                date: moment().format('MM/DD/YYYY'),
                event_date: '',
                user_id: selected_order.ae_number,
                event_location: '',
                event_notes: `Changed Carrier from: "Old Carrier (${selected_order.carrier.code + (selected_order.carrier.code_number === 0 ? '' : selected_order.carrier.code_number) + ' - ' + selected_order.carrier.name})" to "New Carrier (${props.newCarrier.code + (props.newCarrier.code_number === 0 ? '' : props.newCarrier.code_number) + ' - ' + props.newCarrier.name})"`,
                event_type: 'changed carrier',
                old_carrier_id: selected_order.carrier.id,
                new_carrier_id: props.newCarrier.id
            }

            $.post(props.serverUrl + '/saveOrderEvent', event_parameters).then(async res => {
                if (res.result === 'OK') {

                    $.post(props.serverUrl + '/saveOrder', selected_order).then(async res => {
                        if (res.result === 'OK') {
                            await props.setSelectedOrder(res.order);

                            await props.setSelectedDispatchCarrierInfoCarrier(props.newCarrier);

                            await props.setSelectedDispatchCarrierInfoContact({});

                            await props.newCarrier.contacts.map(async c => {
                                if (c.is_primary === 1) {
                                    await props.setSelectedDispatchCarrierInfoContact(c);
                                }
                                return true;
                            });

                            await props.setSelectedDispatchCarrierInfoInsurance({});

                            await props.setSelectedDispatchCarrierInfoDriver({});

                            if (props.newCarrier.drivers.length > 0) {
                                await props.setSelectedDispatchCarrierInfoDriver(props.newCarrier.drivers[0]);
                                selected_order.carrier_driver_id = props.newCarrier.drivers[0].id;
                            }

                            await props.setNewCarrier({});
                            await props.setShowingChangeCarrier(false);
                            await setIsLoading(false);
                        }

                        setIsSavingOrder(false);
                    }).catch(e => {
                        console.log('error saving order changing carrier', e);
                        setIsSavingOrder(false);
                        setIsLoading(false);
                    });
                } else if (res.result === 'ORDER ID NOT VALID') {
                    window.alert('The order number is not valid!');
                }
            }).catch(e => {
                console.log('error saving order event', e);
            })
        }
    }

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const buttonClasses = classnames({
        'mochi-button': true,
        'disabled': isLoading
    });

    return (
        <div className="change-carrier-content">
            <div className="form-container">
                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">Current Carrier</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="top-border top-border-right"></div>
                    </div>

                    <div className="form-row">
                        <div className="input-box-container input-code">
                            <input tabIndex={6 + props.tabTimes * 5} type="text" placeholder="Code" maxLength="8"
                                readOnly={true}
                                value={((props.selected_order?.carrier?.code || '') + ((props.selected_order?.carrier?.code_number || 0) === 0 ? '' : props.selected_order.carrier.code_number)).toUpperCase()}
                            />
                        </div>
                        <div className="form-h-sep"></div>
                        <div className="input-box-container grow">
                            <input tabIndex={7 + props.tabTimes * 5} type="text" placeholder="Name"
                                readOnly={true}
                                value={(props.selected_order?.carrier?.name || '')}
                            />
                        </div>
                    </div>
                    <div className="form-v-sep"></div>
                    <div className="form-row" style={{ marginTop: 15 }}>
                        <div className="label-box-container input-code">
                            <div>Carrier Rate</div>
                        </div>
                        <div className="form-h-sep"></div>
                        <div className="input-box-container grow">
                            <input tabIndex={8 + props.tabTimes} type="text" placeholder="Rate"
                                readOnly={true}
                                value={(props.selected_order?.carrier?.id || 0) === 0 ? '' : '$1,234,00'}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">New Carrier</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className={buttonClasses} onClick={() => { searchCarrierBtnClick() }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Search</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>

                    <div className="form-row">
                        <div className="input-box-container input-code">
                            <input tabIndex={9 + props.tabTimes * 5} type="text" placeholder="Code" maxLength="8"
                                onKeyDown={(e) => { getCarrierByCode(e) }}
                                onInput={(e) => {
                                    setNewCarrier({
                                        ...newCarrier,
                                        code: e.target.value
                                    });
                                }}
                                onChange={(e) => {
                                    setNewCarrier({
                                        ...newCarrier,
                                        code: e.target.value
                                    });
                                }}
                                value={newCarrier.code || ''}
                            />
                        </div>
                        <div className="form-h-sep"></div>
                        <div className="input-box-container grow">
                            <input tabIndex={10 + props.tabTimes * 5} type="text" placeholder="Name"
                                onInput={(e) => {
                                    setNewCarrier({
                                        ...newCarrier,
                                        name: e.target.value
                                    });
                                }}
                                onChange={(e) => {
                                    setNewCarrier({
                                        ...newCarrier,
                                        name: e.target.value
                                    });
                                }}
                                value={newCarrier.name || ''}
                            />
                        </div>
                    </div>
                    <div className="form-v-sep"></div>
                    <div className="form-row" style={{ marginTop: 15 }}>
                        <div className="label-box-container input-code">
                            <div>Carrier Rate</div>
                        </div>
                        <div className="form-h-sep"></div>
                        <div className="input-box-container grow">
                            <input tabIndex={11 + props.tabTimes} type="text" placeholder="Rate"
                                readOnly={true}
                                value={(props.newCarrier?.id || 0) === 0 ? '' : '$1,234,00'}
                            />
                        </div>
                    </div>

                    {
                        isLoading &&
                        <div className="loading-container2">
                            <Loader type="ThreeDots" color="#333738" height={20} width={20} active={true} />
                        </div>
                    }
                </div>
            </div>

            <div className="button-container">
                <div className={buttonClasses} onClick={async () => {
                    await props.setNewCarrier({});
                    props.setShowingChangeCarrier(false);
                }}>
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Cancel</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className={buttonClasses} onClick={() => {
                    props.setNewCarrier({});
                }}>
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Clear</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className={buttonClasses} onClick={() => {
                    if (!props.dispatchOpenedPanels.includes('adjust-rate')) {
                        props.setDispatchOpenedPanels([...props.dispatchOpenedPanels, 'adjust-rate'])
                    }
                }}>
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Adjust Rate</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>

                <div className={buttonClasses} onClick={() => { updateCurrentCarrier() }}>
                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                    <div className="mochi-button-base">Update</div>
                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        serverUrl: state.systemReducers.serverUrl,
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        selected_order: state.dispatchReducers.selected_order,
        newCarrier: state.dispatchReducers.newCarrier
    }
}

export default connect(mapStateToProps, {
    setDispatchOpenedPanels,
    setShowingChangeCarrier,
    setSelectedOrder,
    setNewCarrier,
    setDispatchCarrierInfoCarrierSearchChanging,
    setDispatchCarrierInfoCarriersChanging,
    setSelectedDispatchCarrierInfoCarrier,
    setSelectedDispatchCarrierInfoContact,
    setSelectedDispatchCarrierInfoInsurance,
    setSelectedDispatchCarrierInfoDriver
})(ChangeCarrier)