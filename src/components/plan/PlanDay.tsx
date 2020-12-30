import React from 'react'
import { Dish, IngredientObject } from '../../interfaces/planInterface';
interface Props {
    day: String,
    dish: Dish | undefined
}

export const PlanDay = (props: Props) => {

    return (
        <div className="flex-col flex-grow border-2 border-gray-100 m-2 p-2">
            <div>{props.day}</div>
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
