import React, { useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import axios from 'axios';
import './Modal.css';
import { setSelectedCustomer, setSelectedNote, setSelectedDirection, setCustomers, setSelectedDocumentNote, setSelectedDocument } from './../../../../actions';
import moment from 'moment';

function Modal(props) {
    const [isEditing, setIsEditing] = useState(false);

    const onChangeText = (e) => {
        props.setSelectedData({ ...props.selectedData, text: e.target.value });
    }

    const saveData = () => {
        let user = getinitials(2);
        let date_time = moment().format('YYYY-MM-DD HH:mm:ss');

        if ((props.selectedData.text || '').trim() === '') {
            alert('You must type some text!');
            return;
        }

        axios.post(props.serverUrl + props.savingDataUrl, {
            id: props.selectedData.id,
            customer_id: props.selectedCustomer.id,
            doc_id: props.selectedParent.id,
            text: props.selectedData.text,
            user: props.isAdding ? user : props.selectedData.user,
            date_time: props.isAdding ? date_time : props.selectedData.date_time
        }).then(res => {
            if (res.data.result === 'OK') {
                props.setSelectedParent(res.data.data);
                props.setSelectedData({});
            }
        }).catch(e => {
            console.log('error on customer modal', e);
        });
    }

    const deleteData = () => {
        if (window.confirm(`Are you sure to delete this ${props.type}?`)) {
            axios.post(props.serverUrl + props.deletingDataUrl, props.selectedData).then(res => {
                if (res.data.result === 'OK') {
                    props.setSelectedParent(res.data.data);
                    props.setSelectedData({});
                }
            }).catch(e => {
                console.log('error on customer modal', e);
            });
        }
    }

    const getinitials = (length) => {
        let result = "";
        // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789;
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

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
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 15,
                    boxShadow: '0 0 5px 2px rgba(0,0,0,0.5)'
                }}>

                    <textarea placeholder='Type some text'
                        disabled={!isEditing && !props.isAdding}
                        value={
                            (isEditing || props.isAdding)
                                ? props.selectedData.text
                                : props.selectedData.user + ':' + moment(props.selectedData.date_time, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY:HHmm') + ' ' + props.selectedData.text
                        }
                        onChange={onChangeText}
                        style={{
                            resize: 'vertical',
                            width: '400px',
                            minHeight: '200px',
                            maxHeight: '400px',
                            padding: 10,
                            borderRadius: 15,
                            border: '1px solid rgba(0,0,0,0.2)',
                            backgroundColor: (isEditing || props.isAdding) ? 'white' : 'rgba(0,0,0,0.1)'
                        }}
                    ></textarea>

                    <div className="modal-buttons" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 5
                    }}>
                        <div className="mochi-button" onClick={() => { props.setSelectedData({}) }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Close</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            {
                                (props.isDeletable && !isEditing && !props.isAdding) &&
                                <div className="mochi-button" style={{
                                    marginRight: 5
                                }}
                                    onClick={deleteData}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Delete</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            }
                            {
                                (props.isEditable && !isEditing && !props.isAdding) &&
                                <div className="mochi-button" onClick={() => {
                                    props.setSelectedData({ ...props.selectedData, oldText: props.selectedData.text })
                                    setIsEditing(true);
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Edit</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            }
                            {
                                (isEditing && !props.isAdding) &&
                                <div className="mochi-button" style={{
                                    marginRight: 5
                                }} onClick={() => {
                                    props.setSelectedData({ ...props.selectedData, text: props.selectedData.oldText })
                                    setIsEditing(false);
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Cancel</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            }
                            {
                                (isEditing || props.isAdding) &&
                                <div className="mochi-button" onClick={saveData}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Save</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
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
        serverUrl: state.systemReducers.serverUrl,
        selectedCustomer: state.customerReducers.selectedCustomer
    }
}

export default connect(mapStateToProps, null)(Modal)