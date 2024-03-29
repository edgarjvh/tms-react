import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import $ from 'jquery';
import jqueryForm from 'jquery-form';
import Draggable from 'react-draggable';
import './Documents.css';
import moment from 'moment';
import DocViewer from "react-doc-viewer";
import { useSpring } from 'react-spring';
import CustomerModal from './../modal/Modal.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Transition, Spring, animated, config } from 'react-spring/renderprops';
import { faCaretDown, faCaretRight, faCalendarAlt, faPencilAlt, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import axios from 'axios';
import VideoJS from './../videojs/VideoJS.jsx';

function Documents(props) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const [isSavingDocument, setIsSavingDocument] = useState(false);
    const [progressUploaded, setProgressUploaded] = useState(0);
    const [progressTotal, setProgressTotal] = useState(0);

    const refTitleInput = useRef();
    const refTagInput = useRef();
    const refDocumentInput = useRef();
    const refIframeImg = useRef(null);
    const modalTransitionProps = useSpring({ opacity: (props.selectedOwnerDocumentNote.id !== undefined) ? 1 : 0 });

    const getSizeUnit = (size) => {
        let unit = 'B';

        if (size > (1024 ** 4)) {
            unit = 'TB'
        } else if (size > (1024 ** 3)) {
            unit = 'GB'
        } else if (size > (1024 ** 2)) {
            unit = 'MB'
        } else if (size > (1024 * 1)) {
            unit = 'KB'
        }

        return unit;
    }

    const getFileSize = (size) => {
        let newSize = size;

        if (size > (1024 ** 4)) {
            newSize = (size / (1024 ** 4)).toFixed(2)
        } else if (size > (1024 ** 3)) {
            newSize = (size / (1024 ** 3)).toFixed(2)
        } else if (size > (1024 ** 2)) {
            newSize = (size / (1024 ** 2)).toFixed(2)
        } else if (size > (1024 * 1)) {
            newSize = (size / (1024 * 1)).toFixed(2)
        }

        return isNaN(newSize) ? 0 : newSize;
    }

    const closePanelBtnClick = (e, name) => {
        props.setOpenedPanels(props.openedPanels.filter((item, index) => {
            return item !== name;
        }));
    }

    const tagsOnKeydown = (e) => {
        let keyCode = e.keyCode || e.which;

        if (keyCode === 13) {
            props.setSelectedOwnerDocument({ ...props.selectedOwnerDocument, tags: (props.selectedOwnerDocument.tags || '') === '' ? props.selectedOwnerDocumentTags : props.selectedOwnerDocument.tags + '|' + props.selectedOwnerDocumentTags });
            props.setSelectedOwnerDocumentTags('');
            refTagInput.current.focus();
        }
        if (keyCode === 9) {
            e.preventDefault();
            props.setSelectedOwnerDocument({ ...props.selectedOwnerDocument, tags: (props.selectedOwnerDocument.tags || '') === '' ? props.selectedOwnerDocumentTags : props.selectedOwnerDocument.tags + '|' + props.selectedOwnerDocumentTags });
            props.setSelectedOwnerDocumentTags('');
            refTagInput.current.focus();
        }
    }

    const validateDocumentToSave = (e) => {
        if ((props.selectedOwnerDocument.title || '').trim() === '') {
            window.alert('You must enter the title!');
            setIsSavingDocument(false);
            return;
        }

        if ((props.selectedOwnerDocument.subject || '').trim() === '') {
            window.alert('You must enter the subject!');
            setIsSavingDocument(false);
            return;
        }

        if ((props.selectedOwnerDocument.tags || '').trim() === '') {
            window.alert('You must enter the tags!');
            setIsSavingDocument(false);
            return;
        }

        let selectedOwnerDocument = props.selectedOwnerDocument;

        selectedOwnerDocument.tags = selectedOwnerDocument.tags.replace(/  +/g, ' ');
        selectedOwnerDocument.tags = selectedOwnerDocument.tags.trim();

        let formData = new FormData();
        let files = e.target.files;

        formData.append("doc", files[0]);
        formData.append("customer_id", props.selectedOwner.id);
        formData.append("carrier_id", props.selectedOwner.id);
        formData.append("factoring_company_id", props.selectedOwner.id);
        formData.append("invoice_id", props.selectedOwner.id);
        formData.append("order_id", props.selectedOwner.id);
        formData.append("user_id", selectedOwnerDocument.user_id);
        formData.append("date_entered", selectedOwnerDocument.date_entered);
        formData.append("title", selectedOwnerDocument.title);
        formData.append("subject", selectedOwnerDocument.subject);
        formData.append("tags", selectedOwnerDocument.tags);

        if (!isSavingDocument) {
            setIsSavingDocument(true);

            const options = {
                cancelToken: source.token,
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;

                    setProgressUploaded(isNaN(loaded) ? 0 : loaded);
                    setProgressTotal(isNaN(total) ? 0 : total);
                }
            }

            axios.post(props.serverUrl + props.savingDocumentUrl, formData, options)
                .then(res => {
                    if (res.data.result === "OK") {
                        props.setSelectedOwner({ ...props.selectedOwner, documents: res.data.documents });
                        props.setSelectedOwnerDocument({
                            id: 0,
                            user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                            date_entered: moment().format('MM/DD/YYYY')
                        });

                        refTitleInput.current && refTitleInput.current.focus();
                    }
                    refDocumentInput.current.value = "";
                    setIsSavingDocument(false);
                })
                .catch((err) => {
                    console.log("error saving document", err);
                    setIsSavingDocument(false);
                    refDocumentInput.current.value = "";
                })
                .then(() => {
                    setProgressUploaded(0);
                    setProgressTotal(0);
                });
        }
    }

    const uploadDocumentBtnClick = () => {
        if ((props.selectedOwnerDocument.title || '') === '') {
            window.alert('You must enter the title!');
            return;
        }

        if ((props.selectedOwnerDocument.subject || '') === '') {
            window.alert('You must enter the subject!');
            return;
        }

        if ((props.selectedOwnerDocument.tags || '').trim() === '') {
            window.alert('You must enter one tag, at least!');
            return;
        }

        refDocumentInput.current.click();
    }

    const quickTypeLinkClasses = classnames({
        'quick-filling-btn': true,
        'disabled': (props.selectedOwnerDocument.id || 0) > 0
    });

    return (
        <div className="panel-content">
            <div className="drag-handler" onClick={e => e.stopPropagation()}></div>
            <div className="close-btn" title="Close" onClick={e => closePanelBtnClick(e, props.panelName)}><span className="fas fa-times"></span></div>
            <div className="title">{props.title}</div><div className="side-title"><div>{props.title}</div></div>

            <Transition
                from={{ opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
                items={isSavingDocument}
                config={{ duration: 100 }}
            >
                {show => show && (styles => (
                    <div className="documents-loader-background" style={{ ...styles }}></div>
                ))}
            </Transition>

            <div className="documents-fields">
                <div className="documents-left-side">
                    <div className="documents-fields-row">
                        <div className="input-box-container">
                            <input type="text" placeholder="Id" readOnly={true} value={props.selectedOwnerDocument.user_id || 0} />
                        </div>

                        <div className="input-box-container" style={{ marginRight: 5 }}>
                            <input type="text" placeholder="Date Entered" readOnly={true} value={props.selectedOwnerDocument.date_entered || moment().format('MM/DD/YYYY')} />
                        </div>

                        <div className="mochi-button" onClick={() => {
                            props.setSelectedOwnerDocument({
                                id: 0,
                                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                date_entered: moment().format('MM/DD/YYYY')
                            });

                            refDocumentInput.current.value = "";

                            refTitleInput.current.focus();
                        }}>
                            <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                            <div className="mochi-button-base">Clear</div>
                            <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                        </div>

                        <div style={{
                            margin: '0 0.5rem',
                            fontSize: '0.7rem',
                            color: 'rgba(0,0,0,0.7)'
                        }}>Quick type links:</div>

                        {
                            (props.origin === 'dispatch' || props.origin === 'carrier') &&
                            <div className={quickTypeLinkClasses} onClick={() => {
                                props.setSelectedOwnerDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY'),
                                    title: 'Signed Rate Confirmation',
                                    subject: 'Signed Rate Confirmation',
                                    tags: 'Signed Rate Confirmation|Rate Confirmation'
                                });
                                refTagInput.current.focus();
                            }}>Signed Rate Confirmation</div>
                        }

                        {
                            (props.origin === 'dispatch' || props.origin === 'customer' || props.origin === 'carrier') &&
                            <div className={quickTypeLinkClasses} onClick={() => {
                                props.setSelectedOwnerDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY'),
                                    title: 'Signed Bill of Lading',
                                    subject: 'Signed BOL',
                                    tags: 'Signed BOL|BOL|Delivery Receipt'
                                });
                                refTagInput.current.focus();
                            }}>Signed BOL</div>
                        }

                        {
                            (props.origin === 'carrier') &&
                            <div className={quickTypeLinkClasses} onClick={() => {
                                props.setSelectedOwnerDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY'),
                                    title: 'W9',
                                    subject: 'W9',
                                    tags: 'W9|Federal EIN'
                                });
                                refTagInput.current.focus();
                            }}>W9</div>
                        }

                        {
                            (props.origin === 'carrier') &&
                            <div className={quickTypeLinkClasses} onClick={() => {
                                props.setSelectedOwnerDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY'),
                                    title: 'MC Authority',
                                    subject: 'Authority',
                                    tags: 'MC#|ICC#|Motor Carrier Number'
                                });
                                refTagInput.current.focus();
                            }}>MC Authority</div>
                        }

                        {
                            (props.origin === 'carrier') &&
                            <div className={quickTypeLinkClasses} onClick={() => {
                                props.setSelectedOwnerDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY'),
                                    title: 'Insurance',
                                    subject: 'Insurance',
                                    tags: 'Insurance'
                                });
                                refTagInput.current.focus();
                            }}>Insurance</div>
                        }

                        {
                            (props.origin === 'carrier') &&
                            <div className={quickTypeLinkClasses} onClick={() => {
                                props.setSelectedOwnerDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY'),
                                    title: 'Signed Broker Contract',
                                    subject: 'Broker Contract',
                                    tags: 'Signed Contract|Signed Broker Contract'
                                });
                                refTagInput.current.focus();
                            }}>Signed Contract</div>
                        }

                        {
                            (props.origin === 'carrier') &&
                            <div className={quickTypeLinkClasses} onClick={() => {
                                props.setSelectedOwnerDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY'),
                                    title: 'Carrier Information',
                                    subject: 'Carrier Information',
                                    tags: 'Carrier Packet|Carrier Information Packet'
                                });
                                refTagInput.current.focus();
                            }}>Carrier Information</div>
                        }

                        {
                            (props.origin === 'carrier' || props.origin === 'factoring.company') &&
                            <div className={quickTypeLinkClasses} onClick={() => {
                                props.setSelectedOwnerDocument({
                                    id: 0,
                                    user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                    date_entered: moment().format('MM/DD/YYYY'),
                                    title: 'Notice of Assignment',
                                    subject: 'NOA',
                                    tags: 'Notice of Assignment|NOA'
                                });
                                refTagInput.current.focus();
                            }}>NOA</div>
                        }
                    </div>

                    <div className="documents-fields-row">
                        <div className="input-box-container">
                            <input
                                ref={refTitleInput}
                                type="text"
                                placeholder="Title"
                                value={props.selectedOwnerDocument.title || ''}
                                onChange={(e) => { props.setSelectedOwnerDocument({ ...props.selectedOwnerDocument, title: e.target.value }) }}
                                readOnly={(props.selectedOwnerDocument.id || 0) > 0} />
                        </div>

                        <div className="input-box-container">
                            <input
                                type="text"
                                placeholder="Subject"
                                value={props.selectedOwnerDocument.subject || ''}
                                onChange={(e) => { props.setSelectedOwnerDocument({ ...props.selectedOwnerDocument, subject: e.target.value }) }}
                                readOnly={(props.selectedOwnerDocument.id || 0) > 0} />
                        </div>

                        <div className="input-box-container tags" style={{
                            flexGrow: 1, marginRight: 10
                        }}>
                            {
                                (props.selectedOwnerDocument.tags || '').split('|').map((item, index) => {
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
                                                    (props.selectedOwnerDocument.id || 0) === 0 &&
                                                    <span className="fas fa-trash-alt" style={{ marginRight: '5px', cursor: 'pointer' }}
                                                        onClick={() => {
                                                            props.setSelectedOwnerDocument({ ...props.selectedOwnerDocument, tags: (props.selectedOwnerDocument.tags || '').replace(item, '').trim() })
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
                                value={props.selectedOwnerDocumentTags || ''}
                                onChange={(e) => { props.setSelectedOwnerDocumentTags(e.target.value) }}
                                onInput={(e) => { props.setSelectedOwnerDocumentTags(e.target.value) }}
                                readOnly={(props.selectedOwnerDocument.id || 0) > 0} />
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
                        pointerEvents: (props.selectedOwnerDocument.id || 0) > 0 ? 'none' : 'all'
                    }} onClick={uploadDocumentBtnClick}>
                        <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                        <div className="mochi-button-base" style={{ color: (props.selectedOwnerDocument.id || 0) > 0 ? 'rgba(0,0,0,0.3)' : '#323232' }}>Upload Documents</div>
                        <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                    </div>

                    <form encType='multipart/form-data' style={{ display: 'none' }}>
                        <input type="file" ref={refDocumentInput} onChange={validateDocumentToSave} />
                    </form>
                </div>
            </div>

            <div className="progress-bar-container" style={{overflow: 'unset'}}>
                <Transition
                    from={{ opacity: 0 }}
                    enter={{ opacity: 1 }}
                    leave={{ opacity: 0 }}
                    items={isSavingDocument}
                    config={{ duration: 100 }}
                >
                    {show => show && (styles => (
                        <animated.div style={{ ...styles }}>
                            {/* <div style={{
                                position: 'absolute',
                                zIndex: 2,
                                top: '-1.2rem',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}>
                                <div className="mochi-button" style={{fontSize: '1rem', lineHeight: 1}} onClick={() => {
                                    source.cancel('uploading cancelled!');
                                    setIsSavingDocument(false);
                                }}>
                                    <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                    <div className="mochi-button-base" style={{color: 'darkred'}}>Cancel</div>
                                    <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                                </div>
                            </div> */}
                            <div className="progress-bar-title">{getFileSize(progressUploaded)}{getSizeUnit(progressUploaded)} of {getFileSize(progressTotal)}{getSizeUnit(progressTotal)} | {isNaN(Math.floor((progressUploaded * 100) / progressTotal)) ? 0 : Math.floor((progressUploaded * 100) / progressTotal)}%</div>
                            <div className="progress-bar-wrapper" style={{ width: (isNaN(Math.floor((progressUploaded * 100) / progressTotal)) ? 0 : Math.floor((progressUploaded * 100) / progressTotal)) + '%' }}></div>                            
                        </animated.div>

                    ))}
                </Transition>
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
                            (props.selectedOwner.documents || []).map((document, index) => {
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
                                    'selected': (props.selectedOwnerDocument.id || 0) === document.id
                                });

                                return (
                                    <div className={itemClasses} key={index} onClick={() => {
                                        props.setSelectedOwnerDocument(document);

                                    }}>
                                        <div className="item-info">
                                            <span className={docIconClasses}></span>
                                            <span>{document.user_id}</span>
                                            <span>{document.date_entered}</span>
                                            <span>{document.title}</span>
                                            <span>{document.subject}</span>
                                        </div>

                                        <div className="documents-list-col tcol documents-selected">
                                            {
                                                (document.id === (props.selectedOwnerDocument?.id || 0)) &&
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            }
                                        </div>
                                        <div className="item-btn" onClick={(e) => {
                                            e.stopPropagation();

                                            if (window.confirm('Are you sure to delete this document?')) {
                                                $.post(props.serverUrl + props.deletingDocumentUrl, {
                                                    doc_id: document.doc_id,
                                                    customer_id: props.selectedOwner.id
                                                }).then(res => {
                                                    if (res.result === 'OK') {
                                                        if ((props.selectedOwnerDocument.id || 0) === document.id) {
                                                            props.setSelectedOwnerDocument({
                                                                id: 0,
                                                                user_id: Math.floor(Math.random() * (15 - 1)) + 1,
                                                                date_entered: moment().format('MM/DD/YYYY')
                                                            });

                                                            refTitleInput.current.focus();
                                                        }

                                                        props.setSelectedOwner({ ...props.selectedOwner, documents: res.documents });
                                                    }
                                                })
                                            }
                                        }}>

                                            <FontAwesomeIcon icon={faTrashAlt} />

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
                                if ((props.selectedOwnerDocument.id || 0) > 0) {
                                    props.setSelectedOwnerDocumentNote({ id: 0, customer_document_id: props.selectedOwnerDocument.id })
                                } else {
                                    window.alert('You must select a document first!');
                                }
                            }}
                                style={{
                                    pointerEvents: (props.selectedOwnerDocument.id || 0) > 0 ? 'all' : 'none',
                                }}>
                                <div className="mochi-button-decorator mochi-button-decorator-left">(</div>
                                <div className="mochi-button-base" style={{ color: (props.selectedOwnerDocument.id || 0) > 0 ? '#323232' : 'rgba(0,0,0,0.3)' }}>Add Note</div>
                                <div className="mochi-button-decorator mochi-button-decorator-right">)</div>
                            </div>
                        </div>
                        <div className="top-border top-border-right"></div>
                    </div>

                    <div className="form-wrapper">
                        {
                            (props.selectedOwnerDocument.notes || []).map((note, index) => {
                                return (
                                    <div className='documents-notes-list-item' key={index} onClick={() => {
                                        props.setSelectedOwnerDocumentNote(note);
                                    }}>
                                        <div className="documents-notes-list-col tcol note-text">{note.text}</div>
                                        <div className="documents-notes-list-col tcol documents-notes-selected">
                                            {
                                                (note.id === (props.selectedOwnerDocumentNote?.id || 0)) &&
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            }
                                        </div>
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
                        ((props.selectedOwnerDocument.id || 0) > 0 &&
                            (['pdf', 'txt', 'htm', 'html', 'tmf', 'log'].includes(props.selectedOwnerDocument.doc_extension.toLowerCase()))) &&
                        <iframe id="frame-preview" src={(props.serverUrl + props.serverDocumentsFolder + props.selectedOwnerDocument.doc_id) + '#toolbar=1&navpanes=0&scrollbar=0'} frameBorder={0} allowFullScreen={true} width="100%" height="100%"></iframe>
                    }

                    {
                        ((props.selectedOwnerDocument.id || 0) > 0 &&
                            (['webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd'].includes(props.selectedOwnerDocument.doc_extension.toLowerCase()))) &&
                        // <VideoJS options={{
                        //     autoplay: true,
                        //     controls: true,
                        //     responsive: true,
                        //     fluid: true,
                        //     sources: [{
                        //         src: (props.serverUrl + props.serverDocumentsFolder + props.selectedOwnerDocument.doc_id),
                        //         type: 'video/' + props.selectedOwnerDocument.doc_extension.toLowerCase()
                        //     }]
                        // }} />
                        <iframe id="frame-preview" src={(props.serverUrl + props.serverDocumentsFolder + props.selectedOwnerDocument.doc_id) + '#toolbar=1&navpanes=0&scrollbar=0'} frameBorder={0} allowFullScreen={true} width="100%" height="100%"></iframe>
                    }

                    {
                        ((props.selectedOwnerDocument.id || 0) > 0 &&
                            (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(props.selectedOwnerDocument.doc_extension.toLowerCase()))) &&
                        <iframe id="frame-preview" src={('https://view.officeapps.live.com/op/embed.aspx?src=' + props.serverUrl + props.serverDocumentsFolder + props.selectedOwnerDocument.doc_id) + '#toolbar=1&navpanes=0&scrollbar=0'} frameBorder={0} allowFullScreen={true} width="100%" height="100%"></iframe>
                    }

                    {
                        ((props.selectedOwnerDocument.id || 0) > 0 &&
                            (['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz'].includes(props.selectedOwnerDocument.doc_extension.toLowerCase()))) &&
                        // <div className="img-wrapper"><img src={props.serverUrl + props.serverDocumentsFolder + props.selectedOwnerDocument.doc_id} alt="" /></div>
                        <iframe id="frame-preview" src={(props.serverUrl + props.serverDocumentsFolder + props.selectedOwnerDocument.doc_id) + '#toolbar=1&navpanes=0&scrollbar=0'} frameBorder={0} allowFullScreen={true} width="100%" height="100%"></iframe>
                    }

                    {
                        ((props.selectedOwnerDocument.id || 0) > 0 &&
                            (!['jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'png', 'gif', 'webp', 'tiff', 'tif', 'bmp', 'jp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'svg', 'svgz', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'htm', 'html', 'webm', 'mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'ogg', 'mp4', 'm4p', 'm4v', 'avi', 'wmv', 'mov', 'qt', 'flv', 'swf', 'avchd', '7z', 'arc', 'arj', 'bz2', 'daa', 'gz', 'rar', 'tar', 'zim', 'zip', 'pdf', 'txt', 'tmf', 'log'].includes(props.selectedOwnerDocument.doc_extension.toLowerCase()))) &&
                        <div className="preview-not-available">
                            <span>No preview available for this file</span> <a href={props.serverUrl + props.serverDocumentsFolder + props.selectedOwnerDocument.doc_id} download={true}>Download</a>
                        </div>
                    }
                </div>
            </div>

            {
                props.selectedOwnerDocumentNote.id !== undefined &&
                <animated.div style={modalTransitionProps}>
                    <CustomerModal
                        selectedData={props.selectedOwnerDocumentNote}
                        setSelectedData={props.setSelectedOwnerDocumentNote}
                        selectedParent={props.selectedOwnerDocument}
                        setSelectedParent={(notes) => {

                            props.setSelectedOwnerDocument({ ...props.selectedOwnerDocument, notes: notes });

                            props.setSelectedOwner({
                                ...props.selectedOwner, documents: props.selectedOwner.documents.map((document, index) => {
                                    if (document.id === props.selectedOwnerDocument.id) {
                                        document.notes = notes;
                                    }
                                    return document;
                                })
                            });
                        }}
                        savingDataUrl={props.savingDocumentNoteUrl}
                        deletingDataUrl=''
                        type='note'
                        isEditable={false}
                        isDeletable={false}
                        isAdding={props.selectedOwnerDocumentNote.id === 0} />
                </animated.div>
            }

        </div >
    )
}

export default connect(null, null)(Documents)