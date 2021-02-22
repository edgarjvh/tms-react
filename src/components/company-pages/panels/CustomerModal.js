import React, { useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import './../../../styles/panels/customerModal.css';
import { setSelectedCustomer, setSelectedNote, setSelectedDirection } from './../../../actions/customersPageActions';

function CustomerModal(props) {

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="notes-modal" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
            <div className="notes-modal-wrapper" style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div className="notes-modal-content" style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                    <textarea placeholder='Type some text'
                        disabled={!isEditing}
                        ></textarea>

                    <div className="modal-buttons" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div className="mochi-button">
                            <div className="mochi-button-decorator mochi-button-decorator-left"></div>
                            <div className="mochi-button-base">Close</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right"></div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {
                                (props.isDeletable && !isEditing) &&
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left"></div>
                                    <div className="mochi-button-base">Delete</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right"></div>
                                </div>
                            }
                            {
                                (props.isEditable && !isEditing) &&
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left"></div>
                                    <div className="mochi-button-base">Edit</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right"></div>
                                </div>
                            }
                            {
                                isEditing &&
                                <div className="mochi-button">
                                    <div className="mochi-button-decorator mochi-button-decorator-left"></div>
                                    <div className="mochi-button-base">Save</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right"></div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedNote: state.customersPageReducers.selectednote,
        selectedDirection: state.customersPageReducers.selectedDirection,
        selectedCustomer: state.customersPageReducers.selectedCustomer
    }
}

export default connect(mapStateToProps, {
    setSelectedCustomer,
    setSelectedNote,
    setSelectedDirection
})(CustomerModal)