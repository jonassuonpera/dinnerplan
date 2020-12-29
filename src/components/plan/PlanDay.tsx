import React from 'react'

interface Ingredient {
    name: String
}

interface Dish {
    name: String,
    recipe?: String,
    dish_ingredients?: Array<Ingredient>
}

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
                        props.dish?.dish_ingredients?.map((item: Ingredient, index) => {
                            console.log("item: ", item.name);

                            return (
                                <li key={index}>{item.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
            {/* <div>{props.day}</div>
            <div>
                <div>{props.dishName}</div>
                <ul>
                    {
                        props.ingredients.map((ingredient, index) => {
                            return (
                                <li key={index}>{ingredient}</li>
                            )
                        })
                    }
                </ul>
                <div>{props.recipe}</div>
            </div> */}
        </div>
    )
}
