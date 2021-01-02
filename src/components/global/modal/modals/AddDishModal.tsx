import React, { ReactElement } from 'react';
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Dish } from '../../../../interfaces/planInterface';
import { Button } from '../../Button';



interface Props {
    handleSuccess:any
}

const DISHES = gql`
    query MyQuery {
        dish {
            name
        }
    }
`;

function AddDishModal(props: Props): ReactElement {

    const { loading, error, data } = useQuery(DISHES);

    const handleSelectDish = () => {
        console.log("selected");
        
    }

    return (
        <div className="flex flex-col">
            {
                !loading && data.dish.map((dishItem:Dish, index:number) => {
                    return (
                        <div key={index}>
                            <Button handleClick={() => handleSelectDish()} text={dishItem.name} />                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AddDishModal
