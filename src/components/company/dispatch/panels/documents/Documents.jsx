import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import Draggable from 'react-draggable';
import './Documents.css';
import {
    setDispatchPanels,
    setSelectedOrderDocument,
    setSelectedOrder,
    setOrderDocumentTags,
    setSelectedOrderDocumentNote,
    setDispatchOpenedPanels
} from './../../../../../actions';
import moment from 'moment';
import DocViewer from "react-doc-viewer";
import { useSpring, animated } from 'react-spring';
import OrderModal from './../../modal/Modal.jsx';

function Documents(props) {
    const refTitleInput = useRef();
    const refTagInput = useRef();
    const refDocumentInput = useRef();
    const refIframeImg = useRef(null);
    const modalTransitionProps = useSpring({ opacity: (props.selectedOrderDocumentNote.id !== undefined) ? 1 : 0 });

    const closePanelBtnClick = (e, name) => {
        props.setDispatchOpenedPanels(props.dispatchOpenedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const tagsOnKeydown = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 32) {
            e.preventDefault();
            props.setSelectedOrderDocument({ ...props.selectedOrderDocument, tags: ((props.selectedOrderDocument.tags || '') + ' ' + props.orderDocumentTags).trim() });
            props.setOrderDocumentTags('');
            refTagInput.current.focus();
        }
        if (keyCode === 9) {
            props.setSelectedOrderDocument({ ...props.selectedOrderDocument, tags: ((props.selectedOrderDocument.tags || '') + ' ' + props.orderDocumentTags).trim() });
            props.setOrderDocumentTags('');
            refTagInput.current.focus();
        }
    }

    const validateDocumentToSave = (e) => {
        if ((props.selectedOrderDocument.title || '').trim() === '') {
            window.alert('You must enter the title!');
            return;
        }

        if ((props.selectedOrderDocument.subject || '').trim() === '') {
            window.alert('You must enter the subject!');
            return;
        }

        if ((props.selectedOrderDocument.tags || '').trim() === '') {
            window.alert('You must enter the tags!');
            return;
        }

        let selectedOrderDocument = props.selectedOrderDocument;

        selectedOrderDocument.tags = selectedOrderDocument.tags.replace(/  +/g, ' ');
        selectedOrderDocument.tags = selectedOrderDocument.tags.trim();

        let formData = new FormData();
        let files = e.target.files;

        formData.append("doc", files[0]);
        formData.append("order_id", props.selected_order.id);
        formData.append("user_id", selectedOrderDocument.user_id);
        formData.append("date_entered", selectedOrderDocument.date_entered);
        formData.append("title", selectedOrderDocument.title);
        formData.append("subject", selectedOrderDocument.subject);
        formData.append("tags", selectedOrderDocument.tags);

        $.ajax({
            method: "post",
            url: props.serverUrl + "/saveOrderDocument",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: (res) => {
                console.log(res);
                if (res.result === "OK") {
                    props.setSelectedOrder({ ...props.selected_order, documents: res.documents });
                    props.setSelectedOrderDocument({
                        id: 0,
                        user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                        date_entered: moment().format('MM/DD/YYYY')
                    });

                    refTitleInput.current && refTitleInput.current.focus();
                }
            },
            error: (err) => {
                console.log("ajax error", err);
            },
        });
    }

    const uploadDocumentBtnClick = () => {
        if ((props.selectedOrderDocument.title || '') === '') {
            window.alert('You must enter the title!');
            return;
        }

        if ((props.selectedOrderDocument.subject || '') === '') {
            window.alert('You must enter the subject!');
            return;
        }

        if ((props.selectedOrderDocument.tags || '').trim() === '') {
            window.alert('You must enter one tag, at least!');
            return;
        }

        refDocumentInput.current.click();
    }

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, 'order-documents')}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <div className="documents-fields">
                <div className="documents-left-side">
                    <div className="documents-fields-row">
                        <div className="input-box-container">
                            <input type="text" placeholder="Id" readOnly={true} value={props.selectedOrderDocument.user_id || 0} />
                        </div>

                        <div className="input-box-container" style={{ marginRight: 5 }}>
                            <input type="text" placeholder="Date Entered" readOnly={true} value={props.selectedOrderDocument.date_entered || moment().format('MM/DD/YYYY')} />
                        </div>

                        <div className="mochi-button" onClick={() => {
                            props.setSelectedOrderDocument({
                                id: 0,
                                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                date_entered: moment().format('MM/DD/YYYY')
                            });

                            refTitleInput.current.focus();
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Clear</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>
                    </div>

                    <div className="documents-fields-row">

                        <div className="input-box-container">
                            <input
                                ref={refTitleInput}
                                type="text"
                                placeholder="Title"
                                value={props.selectedOrderDocument.title || ''}
                                onChange={(e) => { props.setSelectedOrderDocument({ ...props.selectedOrderDocument, title: e.target.value }) }}
                                readOnly={(props.selectedOrderDocument.id || 0) > 0} />
                        </div>

                        <div className="input-box-container">
                            <input
                                type="text"
                                placeholder="Subject"
                                value={props.selectedOrderDocument.subject || ''}
                                onChange={(e) => { props.setSelectedOrderDocument({ ...props.selectedOrderDocument, subject: e.target.value }) }}
                                readOnly={(props.selectedOrderDocument.id || 0) > 0} />
                        </div>

                        <div className="input-box-container tags" style={{
                            flexGrow: 1, marginRight: 10
                        }}>
                            {
                                (props.selectedOrderDocument.tags || '').split(' ').map((item, index) => {
                                    if (item.trim() !== '') {
                                        return (
                                            <div key={index} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '0.7rem',
                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                padding: '2px 10px',
                                                borderRadius: '10px',
                                                marginRight: '2px',
                                                cursor: 'default'
                                            }} title={item}>
                                                {
                                                    (props.selectedOrderDocument.id || 0) === 0 &&
                                                    <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            props.setSelectedOrderDocument({ ...props.selectedOrderDocument, tags: (props.selectedOrderDocument.tags || '').replace(item, '').trim() })
                                                        }}></span>
                                                }

                                                <span className="automatic-email-inputted" style={{ whiteSpace: 'nowrap' }}>{item.toLowerCase()}</span>
                                            </div>
                                        )
                                    } else {
                                        return false;
                                    }
                                })
                            }
                            <input type="text" placeholder="Tags" ref={refTagInput}
                                onKeyDown={tagsOnKeydown}
                                value={props.orderDocumentTags || ''}
                                onChange={(e) => { props.setOrderDocumentTags(e.target.value) }}
                                onInput={(e) => { props.setOrderDocumentTags(e.target.value) }}
                                readOnly={(props.selectedOrderDocument.id || 0) > 0} />
                        </div>
                    </div>
                </div>

                <div className="documents-right-side">
                    <div className="mochi-button" style={{
                        fontSize: '1.5rem'
                    }}>
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base">Search Documents</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>
                    <div className="mochi-button" style={{
                        fontSize: '1.5rem'
                    }}>
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base">E-Mail Documents</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>
                    <div className="mochi-button" style={{
                        fontSize: '1.5rem',
                        pointerEvents: (props.selectedOrderDocument.id || 0) > 0 ? 'none' : 'all'
                    }} onClick={uploadDocumentBtnClick}>
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base" style={{ color: (props.selectedOrderDocument.id || 0) > 0 ? 'rgba(0,0,0,0.3)' : '#323232' }}>Upload Documents</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>

                    <form encType='multipart/form-data' style={{ display: 'none' }}>
                        <input type="file" ref={refDocumentInput} onChange={validateDocumentToSave} />
                    </form>
                </div>
            </div>

            <div className="documents-list">
                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">Documents</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="top-border top-border-right"></div>
                    </div>

                    <div className="form-wrapper">
                        {
                            (props.selected_order.documents || []).map((document, index) => {
                                let docIconClasses = classnames({
                                    'fas': true,
                                    'fa-file-image': ['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz'].includes(document.doc_extension.toLowerCase()),
                                    'fa-file-word': ['doc', 'docx'].includes(document.doc_extension.toLowerCase()),
                                    'fa-file-excel': ['xls', 'xlsx'].includes(document.doc_extension.toLowerCase()),
                                    'fa-file-powerpoint': ['ppt', 'pptx'].includes(document.doc_extension.toLowerCase()),
                                    'fa-file-code': ['htm', 'html'].includes(document.doc_extension.toLowerCase()),
                                    'fa-file-video': ['webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd'].includes(document.doc_extension.toLowerCase()),
                                    'fa-file-archive': ['7z', 'arc', 'arj', 'bz2', 'daa', 'gz', 'rar', 'tar', 'zim', 'zip'].includes(document.doc_extension.toLowerCase()),
                                    'fa-file-pdf': document.doc_extension.toLowerCase() === 'pdf',
                                    'fa-file-alt': ['txt', 'log'].includes(document.doc_extension.toLowerCase()),
                                    'fa-file': !['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'htm', 'html', 'webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd', '7z', 'arc', 'arj', 'bz2', 'daa', 'gz', 'rar', 'tar', 'zim', 'zip', 'pdf', 'txt'].includes(document.doc_extension.toLowerCase())
                                });

                                let itemClasses = classnames({
                                    'documents-list-item': true,
                                    'selected': (props.selectedOrderDocument.id || 0) === document.id
                                });

                                return (
                                    <div className={itemClasses} key={index} onClick={() => {
                                        props.setSelectedOrderDocument(document);


                                    }}>
                                        <div className="item-info">
                                            <span className={docIconClasses}></span>
                                            <span>{document.user_id}</span>
                                            <span>{document.date_entered}</span>
                                            <span>{document.title}</span>
                                            <span>{document.subject}</span>
                                        </div>

                                        <div className="item-btn" onClick={(e) => {
                                            e.stopPropagation();

                                            if (window.confirm('Are you sure to delete this document?')) {
                                                $.post(props.serverUrl + '/deleteOrderDocument', {
                                                    doc_id: document.doc_id,
                                                    order_id: props.selected_order.id
                                                }).then(res => {
                                                    if (res.result === 'OK') {
                                                        if ((props.selectedOrderDocument.id || 0) === document.id) {
                                                            props.setSelectedOrderDocument({
                                                                id: 0,
                                                                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                                                date_entered: moment().format('MM/DD/YYYY')
                                                            });

                                                            refTitleInput.current.focus();
                                                        }

                                                        props.setSelectedOrder({ ...props.selected_order, documents: res.documents });
                                                    }
                                                })
                                            }
                                        }}>
                                            <span className='fas fa-trash-alt'></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="form-separator"></div>

                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">Notes</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className="mochi-button" onClick={() => {
                                if ((props.selectedOrderDocument.id || 0) > 0) {
                                    props.setSelectedOrderDocumentNote({ id: 0, order_document_id: props.selectedOrderDocument.id })
                                } else {
                                    window.alert('You must select a document first!');
                                }
                            }}
                                style={{
                                    pointerEvents: (props.selectedOrderDocument.id || 0) > 0 ? 'all' : 'none',
                                }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base" style={{ color: (props.selectedOrderDocument.id || 0) > 0 ? '#323232' : 'rgba(0,0,0,0.3)' }}>Add Note</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>

                    <div className="form-wrapper">
                        {
                            (props.selectedOrderDocument.notes || []).map((note, index) => {
                                return (
                                    <div className='documents-notes-list-item' key={index} onClick={() => {
                                        props.setSelectedOrderDocumentNote(note);
                                    }}>
                                        {note.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="documents-preview">
                <div className="form-bordered-box">
                    <div className="form-header">
                        <div className="top-border top-border-left"></div>
                        <div className="form-title">Preview</div>
                        <div className="top-border top-border-middle"></div>
                        <div className="form-buttons">
                            <div className="mochi-button" onClick={(e, id = 'frame-preview') => {
                                const iframe = document.frames
                                    ? document.frames[id]
                                    : document.getElementById(id);
                                const iframeWindow = iframe.contentWindow || iframe;

                                iframe.focus();
                                iframeWindow.print();

                                return false;
                            }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base">Print</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>

                    {
                        ((props.selectedOrderDocument.id || 0) > 0 &&
                            (['pdf', 'txt', 'htm', 'html', 'tmf', 'log'].includes(props.selectedOrderDocument.doc_extension.toLowerCase()))) &&
                        <iframe id="frame-preview" src={(props.serverUrl + '/order-documents/' + props.selectedOrderDocument.doc_id) + '#toolbar=1&navpanes=0&scrollbar=0'} frameBorder={0} allowFullScreen={true} width="100%" height="100%"></iframe>
                    }

                    {
                        ((props.selectedOrderDocument.id || 0) > 0 &&
                            (['webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd'].includes(props.selectedOrderDocument.doc_extension.toLowerCase()))) &&
                        <iframe id="frame-preview" src={(props.serverUrl + '/order-documents/' + props.selectedOrderDocument.doc_id) + '#toolbar=1&navpanes=0&scrollbar=0'} frameBorder={0} allowFullScreen={true} width="100%" height="100%"></iframe>
                    }

                    {
                        ((props.selectedOrderDocument.id || 0) > 0 &&
                            (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(props.selectedOrderDocument.doc_extension.toLowerCase()))) &&
                        <iframe id="frame-preview" src={('https://view.officeapps.live.com/op/embed.aspx?src=' + props.serverUrl + '/order-documents/' + props.selectedOrderDocument.doc_id) + '#toolbar=1&navpanes=0&scrollbar=0'} frameBorder={0} allowFullScreen={true} width="100%" height="100%"></iframe>
                    }

                    {
                        ((props.selectedOrderDocument.id || 0) > 0 &&
                            (['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz'].includes(props.selectedOrderDocument.doc_extension.toLowerCase()))) &&
                        // <div className="img-wrapper"><img src={props.serverUrl + '/order-documents/' + props.selectedOrderDocument.doc_id} alt="" /></div>
                        <iframe id="frame-preview" src={(props.serverUrl + '/order-documents/' + props.selectedOrderDocument.doc_id) + '#toolbar=1&navpanes=0&scrollbar=0'} frameBorder={0} allowFullScreen={true} width="100%" height="100%"></iframe>
                    }

                    {
                        ((props.selectedOrderDocument.id || 0) > 0 &&
                            (!['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'htm', 'html', 'webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd', '7z', 'arc', 'arj', 'bz2', 'daa', 'gz', 'rar', 'tar', 'zim', 'zip', 'pdf', 'txt', 'tmf', 'log'].includes(props.selectedOrderDocument.doc_extension.toLowerCase()))) &&
                        <div className="preview-not-available">
                            <span>No preview available for this file</span> <a href={props.serverUrl + '/order-documents/' + props.selectedOrderDocument.doc_id} download={true}>Download</a>
                        </div>
                    }
                </div>
            </div>

            {
                props.selectedOrderDocumentNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <OrderModal
                        selectedData={props.selectedOrderDocumentNote}
                        setSelectedData={props.setSelectedOrderDocumentNote}
                        selectedParent={props.selectedOrderDocument}
                        setSelectedParent={(notes) => {

                            props.setSelectedOrderDocument({ ...props.selectedOrderDocument, notes: notes });

                            props.setSelectedOrder({...props.selected_order, documents: props.selected_order.documents.map((document, index) => {
                                if (document.id === props.selectedOrderDocument.id){
                                    document.notes = notes;
                                }
                                return document;
                            })});
                        }}
                        savingDataUrl='/saveCustomerDocumentNote'
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isAdding={props.selectedOrderDocumentNote.id === 0} />
                </animated.div>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        dispatchOpenedPanels: state.dispatchReducers.dispatchOpenedPanels,
        serverUrl: state.systemReducers.serverUrl,
        selected_order: state.dispatchReducers.selected_order,
        selectedOrderDocument: state.dispatchReducers.selectedOrderDocument,
        orderDocumentTags: state.dispatchReducers.orderDocumentTags,
        selectedOrderDocumentNote: state.dispatchReducers.selectedOrderDocumentNote
    }
}

export default connect(mapStateToProps, {
    setDispatchPanels,
    setSelectedOrderDocument,
    setSelectedOrder,
    setOrderDocumentTags,
    setSelectedOrderDocumentNote,
    setDispatchOpenedPanels
})(Documents)