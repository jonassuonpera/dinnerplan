import React, { ReactElement, useState } from 'react'
import { Button } from '../Button';

interface Props {
    open:boolean,
    children:JSX.Element | JSX.Element[]
}

export const Modal = (props: Props) => {
    
    const [modalOpen, setModalOpen] = useState(props.open);

    const toggleModal = () => {
        setModalOpen(false);
        
    }

    if (modalOpen) {
        return (
            <div>
                <div>
                    <Button text="close" handleClick={toggleModal} />
                </div>
                <div>
                    {props.children}
                </div>
            </div>  
        )
    } else {
        return null
    };

}

