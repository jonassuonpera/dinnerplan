
import { ReactElement } from 'react';
import CreateDishModal from './modals/CreateDishModal';

export const MODAL_TYPE = {
    CREATE_DISH_MODAL:'createDishModal'
}

// interface ShowModalProps {
//     MODAL_TYPE:String
// }

// export const showModal = (props:ShowModalProps) => {

// }

interface Props {
    modalType:String
}

export const ModalConductor = (props:Props):ReactElement => {

    const getModalHTML = ():ReactElement | undefined => {
        switch (props.modalType) {
            case MODAL_TYPE.CREATE_DISH_MODAL:
                return <CreateDishModal />
        }
    }

    return (
        <div>
            {getModalHTML()}
        </div>
    )
}

