import React, { ReactElement, useState, useEffect } from 'react'
import { createPortal } from 'react-dom';
import { Button } from '../Button'
import CreateDishModal from './modals/CreateDishModal';

const modalRoot = document.getElementById( 'modal' );

interface Props {
    handleClose:any,
    children?:ReactElement,
    title?:String,
    modalType:String
}

export const MODAL_TYPE = {
    CREATE_DISH: 'createDish'
}

function ModalWrapper(props:Props): ReactElement { 

    const element = document.createElement('div');

    useEffect(() => {
        modalRoot?.appendChild(element);
        return () => {
            modalRoot?.removeChild(element);
        }
    });    

    const onSuccess = () => {

    }

    const getModal = () => {
        switch (props.modalType) {
            case MODAL_TYPE.CREATE_DISH:
                return <CreateDishModal handleSuccess={() => onSuccess}/>
                
        }
    }

    const getModalHTML = () => {
        return (
        <div className="h-screen w-300 z-50 absolute bg-green-200 right-0">
            <div>
                <Button text="Close modal" handleClick={props.handleClose}/>
            </div>
            {props.title}
            {getModal()}
        </div>
        )
    }

    return createPortal(getModalHTML(), element);    

}

export default ModalWrapper;

