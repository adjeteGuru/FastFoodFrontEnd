import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    //this property will hold ingredient data
   // ingredientAdded = new EventEmitter<Ingredient>();

    //this can emit array of Ingredients or Ingredient[] that will be passed on
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [  
        new Ingredient('tomatos', 3),
        new Ingredient('apple', 5)
      ];

      getIngredients(){
          return this.ingredients.slice()
      }  

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        //here whenever we change array, we simply call ingredientChanged and emit new event
        //which is a new copy of the latest true copy of the ingredients array 
        this.ingredientsChanged.emit(this.ingredients.slice());
      }

      //here we will recive ingredients of type array
      addIngredients(ingredients: Ingredient[]){
        // //one way to add them but not efficient
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        //viable option which to add all ingredients in one go pread operator which allow to turn an array of elements into a list of elements
        this.ingredients.push(...ingredients);
        //then emit the new ingredientChanged as a new copy
        this.ingredientsChanged.emit(this.ingredients.slice());
      }
}