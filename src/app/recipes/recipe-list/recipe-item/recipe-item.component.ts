import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
 @Output() recipeSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(){
    this.recipeSelected.emit()
  }

}
