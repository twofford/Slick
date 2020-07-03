import React from 'react';
import { connect } from "react-redux";
import { closeModal } from '../../actions/modal_actions';
import NewChannelContainer from './new_channel_container';
import NewDMContainer from './new_dm_container';
import SearchbarContainer from '../searchbar/searchbar_container';

function Modal({ modal, closeModal }) {

    if (!modal) {
        return null;
    }

    let component;
    let modalClass;

    switch (modal) {
        case "addChannel":
            component = <NewChannelContainer/>;
            modalClass = "modal-background"
            break;
        case "addDM":
            component = <NewDMContainer/>;
            modalClass = "modal-background";
            break;
        case "search":
            component = <SearchbarContainer/>;
            modalClass = "search-modal-background";
            break;
        default:
            return null;
    }

    return (
        <div className={modalClass} onClick={closeModal}>
            <div className="modal-child" onClick={(e) => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        modal: state.ui.modal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);