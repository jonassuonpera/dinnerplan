import React, { useState, useEffect, useContext } from 'react'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Dish } from '../interfaces/planInterface';
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { Button } from '../components/global/Button';
//import { UserContext } from '../util/UserContext';

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

    //const context = useContext(UserContext);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <div className="flex flex-row w-full">
            <div className="flex flex-col flex-grow">
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
            <div className="flex flex-col flex-grow">
                <div>Inspiration</div>
                <div>
                    {
                        data.dish.map((dishItem: Dish, index: number) => {
                            if (dishItem.created_by !== user.sub) {
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
        </div>
    )
}

