import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
 
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients(); //at the time we load the app to get these ingredients --->
    //we will also get hold of the shoppingService to subscribe to that ingredients changed event 
    this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => { //here whenever ingredients change we get the updadte and pass it to this.ingeredients equal to ingredients
        this.ingredients = ingredients;
      }
    );
  }

  
}
