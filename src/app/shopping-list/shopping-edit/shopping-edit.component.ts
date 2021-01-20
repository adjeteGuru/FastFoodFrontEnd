import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //after edited item , now we want to update the form---> so we need access to the form
  //but using the reference together with the view child to rich out #f
  @ViewChild('f') shoplistForm: NgForm;
 //create the subscription so we can destroy it later
 subscription: Subscription;
 //store the info of whether we allow to edit or create a new item
 editMode = false;
 //we need to store the item we are editing
 editedItemIndex: number;
 //after get the item to be edited--store it here
 editedItem: Ingredient;
  constructor(private shoppingService: ShoppingListService) { }
 
  ngOnInit(): void {
    
    //store the subscription property
    this.subscription = this.shoppingService.startedEditing.subscribe(
      (index: number) => {        
        //store the edited index
        this.editedItemIndex = index;
        //now surely we are in editing mode
        this.editMode =true;
        //we store the edited item
        this.editedItem = this.shoppingService.getIngredient(index);
        // here we rich out the form and assign a new values
        this.shoplistForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount 
        });
      }
    );   
  }

  onSubmit(form: NgForm){ 
    const value = form.value;   
    const newIngredient = new Ingredient(value.name, value.amount);
    //check for new or existing one
    if(this.editMode){
      //if the item exist then we pass on the index then save changes
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      // otherwise add it as a new ingredient
      this.shoppingService.addIngredient(newIngredient);
    }
    
    //after finish we need to switchback or end editMode
    this.editMode = false;
    //then reset the form
    form.reset();

  }  

  //to clear/cancel
  onClear(){   
    //this to clear the form
    this.shoplistForm.reset()
     //and make sure I am back to initial mode
     this.editMode= false;
  }

  //to delete
  onDelete(){
    //here simply call the shop list service delete method and pass the current index item        
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    //clear
    this.onClear();
  }

  //this is to cleanup the subscription to avoid memory leak
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
