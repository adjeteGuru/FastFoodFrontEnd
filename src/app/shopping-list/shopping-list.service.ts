
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    //this can emit array of Ingredients or Ingredient[] that will be passed on
    ingredientsChanged = new Subject<Ingredient[]>();

    //this allow a current item selected on the shopping list to be edited
    startedEditing = new Subject<number>()
    private ingredients: Ingredient[] = [  
        new Ingredient('tomatos', 3),
        new Ingredient('apple', 5)
      ];

      //retrieve the ingredient index we want to edit--> we can rich out the shopping list item
      getIngredient(index: number){
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        //here whenever we change array, we simply call ingredientChanged and emit new event
        //which is a new copy of the latest true copy of the ingredients array 
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      
      getIngredients(){
        return this.ingredients.slice()
    }  

      //here we will recive ingredients of type array
      addIngredients(ingredients: Ingredient[]){
        // //one way to add them but not efficient
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        //viable option which to add all ingredients in one go pread operator which allow to turn an array of elements into a list of elements
        this.ingredients.push(...ingredients);
        //then send the new ingredientChanged as a new copy
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      //here we expected the index of item to be edited and the new item/ingredient
      updateIngredient(index: number, newIngredient: Ingredient){
        //we can rich out the edited item
        this.ingredients[index] = newIngredient;
        //then call ingredient changed and emit my update ingredient and finally make a copy
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number){
        //get the ingredients array then splice one element of it
        this.ingredients.splice(index, 1);
        //then call ingredient changes
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}