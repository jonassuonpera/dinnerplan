import React, { ReactElement, useState } from 'react'
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from "@apollo/react-hooks";
import UserContext from '../../../../UserContext';
import Input from '../../Input';
import SearchSuggester from '../../SearchSuggester';
import { Ingredient } from '../../../../interfaces/planInterface';

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


const INGREDIENT_SEARCH = gql`
query ($name:String!) {
    ingredient(where: {name: {_ilike: $name}}) {
      id
      name
    }
  }
`;



function CreateDishModal(props: Props): ReactElement {

    const [dishName, setDishName] = useState<string>("");
    const [recipe, setRecipe] = useState<string>("");

    const [ingredientSearchText, setIngredientSearchText] = useState<string | null>(null);

    const [ingredients, setIngredients] = useState<Array<string>>([]);

    const [createDish] = useMutation(CREATE_DISH);

    const { loading, error, data } = useQuery(INGREDIENT_SEARCH, {
        variables: { name: `${ingredientSearchText}%` },
    });

    const user = React.useContext(UserContext); 

    const searchIngredient = (text:string) => {        
        setIngredients(ingredients => [...ingredients, text]);
    }
    
    const seachInputUpdate = (text:string) => {
        if (text.length > 2) {
            setIngredientSearchText(text);
        }
        if (ingredientSearchText?.length === 3 && text.length === 2) {
            setIngredientSearchText(null);
        }
    }

    let ingredientNames:Array<string> = [];
    if (data && !loading) {
        ingredientNames = data.ingredient.map((ingredient:Ingredient) => ingredient.name)        
    }

    return (
        <div className="border-gray-500 border-2">
            <form className="formInput flex flex-col" onSubmit={(e) => {
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

            {
                <ul>
                {
                    ingredients.map((ingredient:string, index:number) => {
                        return (
                            <li key={index}>{ingredient}</li>
                        )
                    })  
                }                  
                </ul>
            }    


            {/* <SearchSuggester 
                placeholder="Add ingredient" 
                items={ingredientNames}
                handleSelection={(text:string) => searchIngredient(text)}
                emitInputToParent={(text:string) => seachInputUpdate(text)}
            />       */}
    
            <input 
                type="submit"

            />

            </form>
        </div>
    )
}

export default CreateDishModal
