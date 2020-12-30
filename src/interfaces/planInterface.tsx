export interface Ingredient {
    name: String
}

export interface IngredientObject {
    ingredient: Ingredient
}

export interface Dish {
    name: String,
    recipe: String,
    dish_ingredients: Array<IngredientObject>
}

export interface Plan {
    week_number?: number,
    dish_monday?: Dish,
    dish_tuesday?: Dish,
    dish_wednesday?: Dish,
    dish_thursday?: Dish,
    dish_friday?: Dish,
    dish_saturday?: Dish,
    dish_sunday?: Dish,
}