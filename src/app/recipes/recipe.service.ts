import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe-list/recipe.model";

export class RecipeService {
    //the property and it will hold some recipes data 
   recipeSelected = new EventEmitter<Recipe>();
   
    recipes: Recipe[] = [
        new Recipe('Kofte Kebab', 'This is simple grill kofta sample','https://cdn.pixabay.com/photo/2020/03/21/18/04/kabab-4954818_1280.jpg'),
        new Recipe('Steak Kebab', 'This is beef meat sample', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mO0_VqfcYTK5jGNF4rgMFIbTisXl7nfJMQ&usqp=CAU'),
        new Recipe('Mozarella Pizza', 'This is cheese pizza sample', 'https://cdn.pixabay.com/photo/2017/12/05/20/08/pizza-3000273__340.jpg')
    ];

    getRecipes(){
        // the object slice() which means it the exact copy of the exisiting array
        return this.recipes.slice();
    }
}