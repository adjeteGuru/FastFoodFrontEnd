import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
 
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  //we need to create a property to store ingredients changes
  private ingChangeSub: Subscription;
  constructor(private shoppingService: ShoppingListService) { }
 

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients(); //at the time we load the app to get these ingredients --->
    //we will also get hold of the shoppingService to subscribe to that ingredients changed event 
    //here we store the changed
    this.ingChangeSub = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => { //here whenever ingredients change we get the updadte and pass it to this.ingeredients equal to ingredients
        this.ingredients = ingredients;
      }
    );
  }

  onEditItem(index: number){
    //fecth the current item and emit new value --> now we can edit it in the shopping edit
    this.shoppingService.startedEditing.next(index);  
  }

  //destroy whenever we leave the page
  ngOnDestroy(): void {
    this.ingChangeSub.unsubscribe();
  }
  
}
