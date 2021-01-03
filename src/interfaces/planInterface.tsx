export interface Ingredient {
    name: string
}

export interface IngredientObject {
    ingredient: Ingredient
}

export interface Dish {
    id:number,
    name: string,
    recipe: string,
    is_public: Boolean,
    created_by: string,
    dish_ingredients: Array<IngredientObject>
}

export interface Plan {
    id:number,
    week_number?: number,
    dish_monday?: Dish,
    dish_tuesday?: Dish,
    dish_wednesday?: Dish,
    dish_thursday?: Dish,
    dish_friday?: Dish,
    dish_saturday?: Dish,
    dish_sunday?: Dish,
}