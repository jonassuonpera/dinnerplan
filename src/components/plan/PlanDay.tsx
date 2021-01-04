import React, { useState } from 'react';
import { Dish, IngredientObject } from '../../interfaces/planInterface';
import { Button } from '../global/Button';
import ModalWrapper from '../global/modal/ModalWrapper';

interface Props {
    day: string,
    planId:number | undefined,
    dish: Dish | undefined
}

export const PlanDay = (props: Props) => {

    const [showAddDishModal, setShowAddDishModal] = useState(false);

    const dishAdded = () => {

    } 

    return (
        <div className="flex-col flex-grow border-2 border-gray-100 m-2 p-2">
            <div className="flex flex-col">
                <div className="font-bold text-sm">
                {props.day}
                </div>
                {
                    !props.dish && (
                        <div className="my-4">
                            <Button text="Add dish" handleClick={() => setShowAddDishModal(true)}  classes="p-1 font-bold rounded bg-green-500 border-green-500 border-2 hover:bg-transparent"/>
                        </div>
                    )
                    
                }
                {
                    showAddDishModal && (
                        <ModalWrapper onSuccess={() => dishAdded} handleClose={() => setShowAddDishModal(false)} title="Add dish" modalType="addDish" data={props}/>
                    )
                }
            </div>
            <div className="text-2xl">{props.dish?.name}</div>

            <div className="w-full flex flex-row 2xl:flex-col">
                {
                    props.dish?.dish_ingredients && props.dish.dish_ingredients.length > 0 ? (
                        <div className="flex flex-col flex-grow">
                            <div>Ingredients</div>
                            <div>
                                <ul className="list-disc list-inside">
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
                    ) : null
                }                
                {
                    props.dish?.recipe ? (
                        <div className="flex flex-col flex-grow">
                            <div>Recipe:</div>
                            <div>{props.dish?.recipe}</div>
                        </div>                        
                    ) : null
                }
            </div>

        </div>
    )
}
