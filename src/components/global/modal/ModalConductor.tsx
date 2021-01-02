
import { ReactElement, useState } from 'react';
import { Button } from '../Button';
import CreateDishModal from './modals/CreateDishModal';

export const MODAL_TYPE = {
    CREATE_DISH_MODAL:'createDishModal'
}

interface Props {
    modalType:String,
    open:boolean
}

export const ModalConductor = (props:Props):ReactElement => {

    const [modalOpen, setModalOpen] = useState(true);

    const closeModal = () => {
        setModalOpen(false);
    }

    const getModalHTML = ():ReactElement | undefined => {
        switch (props.modalType) {
            case MODAL_TYPE.CREATE_DISH_MODAL:
                return <CreateDishModal />
        }
    }

    return (
        <div>
            <div><Button text="close" handleClick={closeModal} /></div>
            <div>{getModalHTML()}</div>
        </div>
    )
}

