import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

// //to inject what is construct in the recipe class
@Injectable({
    providedIn: 'root',
  })
export class RecipeService {

    //this to store any changes made on the original copy of recipes array
 recipesChanged = new Subject<Recipe[]>();   
      
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

    //to add new recipe
    AddRecipe(recipe: Recipe){
        //here we take recipes array and push new one on it
        this.recipes.push(recipe);
        //having created a new property to  store changes,I emit a new value which is a new copy
        this.recipesChanged.next(this.recipes.slice());
    }

    //to update exisitng recipe
    updateRecipe(index: number, newRecipe: Recipe){
        //here we fetch by providing index of existing from recipes array then set it to new recipe
        this.recipes[index] = newRecipe;
        //emit new value (new copy of the array)
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        //call the recipes array then remove it
        this.recipes.splice(index, 1);
        //then call recipes changes and emit a new copy (updated recipes)
        this.recipesChanged.next(this.recipes.slice());
    }

}