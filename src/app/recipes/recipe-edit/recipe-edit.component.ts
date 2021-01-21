import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
//create an id property then store data on it for availability on subscription
id: number;

//this property to check if id exist
editMode = false;

//the form itself is a property of type formGroup
recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      
      (params: Params) => {
        this.id = +params['id']; //because this is the naming we used inside the app-routing 'id'
        //this check id the fetched id exist for edit or not
        this.editMode = params['id'] != null;  
        //CALL this initForm when the route params change (means the page is reloaded)
        this.initForm();      
      }
    );
  }

  //this is responsible for initialise form
  private initForm(){
    let recipeName ='';
    let recipeImagePath = '';
    let recipeDescription ='';
//we need to know whether we re in edit mode
    if(this.editMode){
      //if yes the fetch the id of the current item
      const recipe = this.recipeService.getRecipe(this.id);
      //store the recipe reached out name on this property
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
    }
    //here are object where we have key pair value for the control we want to register
    this.recipeForm = new FormGroup({
      //here it will be empty by default or recipeName value if we are in editMode
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription)
    });
  }

  onSubmit(){
    console.log(this.recipeForm);
  }

}
