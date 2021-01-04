import React, { useState } from 'react'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Dish } from '../interfaces/planInterface';
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { Button } from '../components/global/Button';
import ModalWrapper from '../components/global/modal/ModalWrapper';

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

export default function DishView() {

    const { loading, error, data } = useQuery(DISHES);

    const { user } = useAuth0();

    const [showCreateDishModal, setShowCreateDishModal] = useState(false);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const dishCreated = () => {

    } 

    return (
        <div className="flex flex-col w-full">
            {
                showCreateDishModal && (
                    <ModalWrapper onSuccess={() => dishCreated} handleClose={() => setShowCreateDishModal(false)} title="Create new dish" modalType="createDish"/>
                )
            }
            <div>
            <Button classes="p-1 font-bold rounded bg-green-500 border-green-500 border-2 hover:bg-transparent" text="Create new dish" handleClick={() => setShowCreateDishModal(true)} />                  
            </div>
            <div className="flex flex-col sm:flex-row w-full">
                <div className="flex flex-col flex-grow">
                    <div className="text-2xl mt-5">My dishes</div>
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
                    <div className="text-2xl mt-5">Inspiration</div>
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
        </div>
    )
}

