import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

// //to inject what is construct in the recipe class
@Injectable({
    providedIn: 'root',
  })
export class RecipeService {
    //the property and it will hold some recipes data 
   recipeSelected = new EventEmitter<Recipe>();

     
    private recipes: Recipe[] = [
        new Recipe('Kofte Kebab', 
        'This is simple grill kofta sample',
        'https://cdn.pixabay.com/photo/2020/03/21/18/04/kabab-4954818_1280.jpg', 
        [
            new Ingredient('salad', 1),
            new Ingredient('burger sauce', 1)
        ]),
        new Recipe('Steak Kebab', 
        'This is beef meat sample', 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mO0_VqfcYTK5jGNF4rgMFIbTisXl7nfJMQ&usqp=CAU', 
        [
            new Ingredient('all salad', 1),
            new Ingredient('peter bread', 2),
            new Ingredient('yogourt', 2)
        ]),
        new Recipe('Mozarella Pizza', 
        'This is cheese pizza sample', 
        'https://cdn.pixabay.com/photo/2017/12/05/20/08/pizza-3000273__340.jpg', 
        [
            new Ingredient('french fries', 20),
            new Ingredient('all salad', 2),
            new Ingredient('donner', 2)
        ])
    ];

    //after injectable service into service we can now inject in the constructor the shopping service
    constructor(private shoppingService: ShoppingListService) {}
         
    getRecipes(){
        // the object slice() which means it the exact copy of the exisiting array
        return this.recipes.slice();
    }

    //we return a single recipe
    getRecipe(index: number){
        return this.recipes[index];
    }

    //here we need to access shopping list service hence inject service into service (@Injectable() at the top to allow that)
    //we expect to recive ingredients
    addIngredientsToShoppingList(ingredients: Ingredient[]){
       //shopping service now available as..
        this.shoppingService.addIngredients(ingredients);
    }


}