import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe: Recipe;
//let store id into this prorperty
id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {   
    //use the route, the params observable and subscribe to the observable
   this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; //now with this we can react to any change in our route params.
        //having done that we can react to a new id --> so let store id property in the class above

        //now we can fetch a recipe whenever the id change
        this.recipe = this.recipeService.getRecipe(this.id);
      }
   );
  }

  //here we call this method --> pass ingredients to recipe service
  onAddToShoppingList(){
    //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

}
