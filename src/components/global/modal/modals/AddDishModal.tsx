import React, { ReactElement } from 'react';
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Dish } from '../../../../interfaces/planInterface';
import { Button } from '../../Button';
import DishItem from '../../../dish/DishItem';



interface Props {
    handleSuccess:any,
    data: {
        day:string,
        planId:number
    }
}

const DISHES = gql`
    query {
        dish {
            id
            name
        }
    }
`;


function AddDishModal(props: Props): ReactElement {

    const { loading, error, data } = useQuery(DISHES);

    const ADD_DISH_TO_PLAN = gql`
        mutation ($planId:Int!, $dishId:Int!, $day:String!) {
        update_plan_by_pk(pk_columns: {id: $planId}, _set: {${props.data.day.toLowerCase()}: $dishId}) {
        id
        }
    }
`;

    const [addDishToPlan] = useMutation(ADD_DISH_TO_PLAN);

    const handleSelectDish = (dishId:number) => {
        console.log("dish name: ",dishId);
        addDishToPlan({variables: {planId:props.data.planId, dishId:dishId, day:props.data.day}});
    }

    console.log({props});
    

    return (
        <div className="flex flex-col">
            {
                !loading && data.dish.map((dishItem:Dish, index:number) => {
                    return (
                        <div key={index}>
                            <Button handleClick={() => handleSelectDish(dishItem.id)} text={dishItem.name} />                            
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AddDishModal
