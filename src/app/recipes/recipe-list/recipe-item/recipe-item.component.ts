import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from '../../recipe.service';
//to make available recipe model
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 //Here is where we can now use the recipe model created
 @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
