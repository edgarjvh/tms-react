import React, { useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './Modal.css';
import { setSelectedCustomer, setSelectedNote, setSelectedDirection, setCustomers } from './../../../../actions';
import moment from 'moment';

function Modal(props) {

    const [isEditing, setIsEditing] = useState(false);

    const onChangeText = (e) => {
        props.type === 'note'
            ? props.setSelectedNote({ ...props.selectedNote, note: e.target.value })
            : props.setSelectedDirection({ ...props.selectedDirection, direction: e.target.value })
    }

    const saveNoteDirection = async () => {
        let user = getinitials(2);
        let date_time = moment().format('YYYY-MM-DD HH:mm:ss');

        if (props.type === 'note' ? (props.selectedNote.note || '').trim() === '' : (props.selectedDirection.direction || '').trim() === '') {
            alert('You must type some text!');
            return;
        }

        $.post(props.serverUrl + '/' + (props.type === 'note' ? 'saveCustomerNote' : 'saveCustomerDirection'), {
            id: (props.type === 'note' ? props.selectedNote.id : props.selectedDirection.id),
            customer_id: props.selectedCustomer.id,
            note: (props.type === 'note' ? props.selectedNote.note : props.selectedDirection.direction),
            direction: (props.type === 'note' ? props.selectedNote.note : props.selectedDirection.direction),
            user: (props.isAdding ? user : (props.type === 'note' ? props.selectedNote.user : props.selectedDirection.user)),
            date_time: (props.isAdding ? date_time : (props.type === 'note' ? props.selectedNote.date_time : props.selectedDirection.date_time))
        }).then(async res => {
            console.log(res);
            if (res.result === 'OK') {

                if (props.type === 'note') {
                    await props.setSelectedCustomer({ ...props.selectedCustomer, notes: res.notes });
                    await props.setSelectedNote({});
                } else {
                    await props.setSelectedCustomer({ ...props.selectedCustomer, directions: res.directions });
                    await props.setSelectedDirection({});
                }
            }
        });
    }

    const deleteDirection = () => {
        if (window.confirm('Are you sure to delete this direction?')) {
            $.post(props.serverUrl + '/deleteCustomerDirection', props.selectedDirection).then(async res => {
                if (res.result === 'OK') {

                    await props.setSelectedCustomer({ ...props.selectedCustomer, directions: res.directions });
                    await props.setSelectedDirection({});
                }
            })
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
                                ? props.type === 'note' ? props.selectedNote.note || '' : props.selectedDirection.direction || ''
                                : props.type === 'note'
                                    ? props.selectedNote.user + ':' + moment(props.selectedNote.date_time, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY:HHmm') + ' ' + props.selectedNote.note
                                    : props.selectedDirection.user + ':' + moment(props.selectedDirection.date_time, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY:HHmm') + ' ' + props.selectedDirection.direction
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
                        <div className="mochi-button" onClick={() => { props.setSelectedNote({}); props.setSelectedDirection({}) }}>
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
                                onClick={deleteDirection}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Delete</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            }
                            {
                                (props.isEditable && !isEditing && !props.isAdding) &&
                                <div className="mochi-button" onClick={() => {
                                    props.type === 'note'
                                        ? props.setSelectedNote({ ...props.selectedNote, oldNote: props.selectedNote.note })
                                        : props.setSelectedDirection({ ...props.selectedDirection, oldDirection: props.selectedDirection.direction })

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
                                    props.type === 'note'
                                        ? props.setSelectedNote({ ...props.selectedNote, note: props.selectedNote.oldNote })
                                        : props.setSelectedDirection({ ...props.selectedDirection, direction: props.selectedDirection.oldDirection })
                                    setIsEditing(false);
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base">Cancel</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            }
                            {
                                (isEditing || props.isAdding) &&
                                <div className="mochi-button" onClick={saveNoteDirection}>
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
        customers: state.customerReducers.customers,
        selectedCustomer: state.customerReducers.selectedCustomer,
        serverUrl: state.systemReducers.serverUrl,
        selectedNote: state.customerReducers.selectedNote,
        selectedDirection: state.customerReducers.selectedDirection,
        selectedCustomer: state.customerReducers.selectedCustomer
    }
}

export default connect(mapStateToProps, {
    setSelectedCustomer,
    setSelectedNote,
    setSelectedDirection,
    setCustomers
})(Modal)