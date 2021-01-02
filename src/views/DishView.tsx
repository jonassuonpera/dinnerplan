import React, { useEffect, useContext, useState } from 'react'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Dish } from '../interfaces/planInterface';
import { useAuth0 } from "../auth/react-auth0-wrapper";
import { Button } from '../components/global/Button';

//import { UserContext } from '../util/UserContext';
import ModalWrapper from '../components/global/modal/ModalWrapper';
import CreateDishModal from '../components/global/modal/modals/CreateDishModal';

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

    const [showCreateDishModal, setShowCreateDishModal] = useState(false);

    //const context = useContext(UserContext);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const worked  = () => {
        console.log("worked");
        
    }

    return (
        <div className="flex flex-col w-full">
            {
                showCreateDishModal && (
                    <ModalWrapper handleClose={() => setShowCreateDishModal(false)} title="Create new dish" modalType="createDish"/>
                )
            }
            <Button text="Create new dish" handleClick={() => setShowCreateDishModal(true)} />
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
        </div>
    )
}

