import React, { useState, useEffect } from 'react'
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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

export default function Dishes() {
    return (
        <div className="flex-col w-full">
            <div className="flex flex-col">
                <div>My dishes</div>
                <div></div>
            </div>
            <div className="flex flex-col">
                <div>Inspiration</div>
                <div></div>
            </div>
        </div>
    )
}

