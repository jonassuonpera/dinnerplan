import React, { ReactElement, useState } from 'react'
import { gql } from 'apollo-boost';
import { useMutation } from "@apollo/react-hooks";

interface Props {
    handleSuccess:any
}

const CREATE_DISH = gql`
mutation ($createdBy:String!, $name:String!, $recipe:String!) {
    insert_dish(objects: {created_by: $createdBy, name: $name, recipe: $recipe}) {
      affected_rows
    }
  }
`;

function CreateDishModal(props: Props): ReactElement {

    const [dishName, setDishName] = useState<string>("");
    const [recipe, setRecipe] = useState<string>("");

    const [createDish] = useMutation(CREATE_DISH);

    return (
        <div className="border-gray-500 border-2">
            <form className="formInput" onSubmit={(e) => {
            e.preventDefault();
            createDish({variables: {createdBy:"auth0|5fea67b9c409730076195c8d", name:dishName, recipe:recipe }});
            }}>
            <input
                className="input"
                placeholder="Dish name"
                type="text"
                value={dishName}
                onChange={e => (setDishName(e.target.value))}
            />
            <input
                className="input"
                placeholder="Recipe"
                type="text"
                value={recipe}
                onChange={e => (setRecipe(e.target.value))}
            />            
            </form>
        </div>
    )
}

export default CreateDishModal
