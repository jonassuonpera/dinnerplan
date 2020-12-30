import React, { useState, useEffect } from 'react'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Dish } from '../interfaces/planInterface';
import { useAuth0 } from "../auth/react-auth0-wrapper";

const DISHES = gql`
    query MyQuery {
        dish {
        name
        recipe
        is_public
        created_by
        dish_ingredients {
            ingredient {
            name
            }
        }
        }
    }
`;

interface Props {

}

export default function DishView() {

    const { loading, error, data } = useQuery(DISHES);

    const { user } = useAuth0();

    // useEffect(() => {
    //     if (data) {
    //         data.plan.filter((obj: Dish) => {
    //             if (obj.week_number === weekNumber) {
    //                 setWeekPlan(obj);
    //             }
    //         });
    //     }
    // });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    console.log({ data });
    console.log({ user });



    return (
        <div className="flex-col w-full">
            <div className="flex flex-col">
                <div>My dishes</div>
                <div>
                    {
                        data.dish.map((dishItem: Dish, index: number) => {
                            if (dishItem.created_by === user.sub) {
                                return (
                                    <div key={index}>
                                        {dishItem.name}
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <div>Inspiration</div>
                <div></div>
            </div>
        </div>
    )
}

