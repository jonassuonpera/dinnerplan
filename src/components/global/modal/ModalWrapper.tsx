import React, { ReactElement, useState, useEffect } from 'react'
import { createPortal } from 'react-dom';
import { Button } from '../Button'

const modalRoot = document.getElementById( 'modal' );

interface Props {
    children:ReactElement,
    title?:String,
}

function ModalWrapper(props:Props): ReactElement { 

    const element = document.createElement('div');

    useEffect(() => {
        modalRoot?.appendChild(element);
        return () => {
            modalRoot?.removeChild(element);
        }
    });    

    const getModalHTML = () => {
        return (
        <div className="h-screen w-100 aboslute z-1 bg-green-200 right-0">
            Show this shit
            <div>
                {/* <Button handleClick={props.handleClose}/> */}
            </div>
            {/* {props.children} */}
        </div>
        )
    }

    return createPortal(getModalHTML()/*<div>testing</div>*/, element);    

}

export default ModalWrapper;

