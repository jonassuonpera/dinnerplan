import React, { ReactElement, useState } from 'react'
import { gql } from 'apollo-boost';
import { useMutation } from "@apollo/react-hooks";
import UserContext from '../../../../UserContext';
import Input from '../../Input';

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

    const user = React.useContext(UserContext); 

    return (
        <div className="border-gray-500 border-2">
            <form className="formInput" onSubmit={(e) => {
            e.preventDefault();
            if (user !== null) {
                createDish({variables: {createdBy:user.sub, name:dishName, recipe:recipe }});
            }
            }}>

            <Input 
                placeholder="Dish name" 
                type="text" 
                value={dishName} 
                onChange={(value:string) => setDishName(value)}
            />

            <Input 
                placeholder="Recipe"
                type="text"
                value={recipe}
                onChange={(value:string) => setRecipe(value)}
            />            
    
            <input 
                type="submit"

            />

            </form>
        </div>
    )
}

export default CreateDishModal
