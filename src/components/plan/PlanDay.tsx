import React, { useState } from 'react';
import { Dish, IngredientObject } from '../../interfaces/planInterface';
import { Button } from '../global/Button';
import ModalWrapper from '../global/modal/ModalWrapper';

interface Props {
    day: String,
    dish: Dish | undefined
}

export const PlanDay = (props: Props) => {

    const [showAddDishModal, setShowAddDishModal] = useState(false);

    const dishAdded = () => {

    } 

    return (
        <div className="flex-col flex-grow border-2 border-gray-100 m-2 p-2">
            <div className="flex flex-row">
                <div>
                {props.day}
                </div>
                {
                    !props.dish && (
                        <div className="mx-5">
                            <Button text="Add dish" handleClick={() => setShowAddDishModal(true)} />
                        </div>
                    )
                    
                }
                            {
                showAddDishModal && (
                    <ModalWrapper onSuccess={() => dishAdded} handleClose={() => setShowAddDishModal(false)} title="Add dish" modalType="addDish"/>
                )
            }
            </div>
            <div>{props.dish?.name}</div>
            <div>{props.dish?.recipe}</div>
            <div>
                <ul>
                    {
                        props.dish?.dish_ingredients?.map((item: IngredientObject, index) => {
                            return (
                                <li key={index}>{item.ingredient.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
