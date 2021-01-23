import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
     private recipeService: RecipeService,
      private router: Router) { }

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

  //add new control to the formcontrol
  onAddIngredient(){
//here we need to access the recipForm and get the ingredients control which will be a formArray typ
    (<FormArray>this.recipeForm.get('ingredients')).push(
      //here we push a formgroup (a group of input)
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  //
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  //this is responsible for initialise form
  private initForm(){
    let recipeName ='';
    let recipeImagePath = '';
    let recipeDescription ='';
    //initialise this with a default value of empty array bcos we don't have any ingredient by defau
    let recipeIngredients = new FormArray([]);
      //we need to know whether we re in edit mode
    if(this.editMode){
      //if yes the fetch the id of the current item
      const recipe = this.recipeService.getRecipe(this.id);
      //store the recipe reached out name on this property
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      //we need to check if recipe have any ingredient to begin with 
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
         //here we need to push the two form control into the array hence FormGroup containing them 
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, 
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    //here are object where we have key pair value for the control we want to register
    this.recipeForm = new FormGroup({
      //here it will be empty by default or recipeName value if we are in editMode
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      //then assign the (ingredients control) which is recipeIngredients into the recipeForm
      'ingredients': recipeIngredients //for ingredient set above
    });
  }

  //USE THIS APPROACH or bellow
  // onSubmit(){
  //   const newRecipe = new Recipe(
  //     this.recipeForm.value['name'],
  //     this.recipeForm.value['description'],
  //     this.recipeForm.value['imagePath'],
  //     this.recipeForm.value['ingredients']
  //     )
  //   if(this.editMode){
  //     this.recipeService.updateRecipe(this.id, newRecipe);
  //   }
  //   else{
  //     this.recipeService.AddRecipe(newRecipe);
  //   }
  // }

  //OR use this approach
  onSubmit(){   
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeService.AddRecipe(this.recipeForm.value);
    }

    //add this here so it will be call after sbmit
    this.onCancel();
  }

  //cancel 
  onCancel(){
    //access through router to navigate and go up one level
    //BUT we need to tell angular what is the current route hence add second param {relativeTo: this route}
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  

   //delete
   onDeleteRecipe(){    
    this.recipeService.deleteRecipe(this.id);
    //navigate away
    this.router.navigate(['/recipes']);
  }

  //
  onDeleteIngredient(index: number){
    //call the recipeForm to get the ingredients and pass the method removeAt() the index to delete
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
   //(<FormArray>this.recipeForm.get('ingredients')).clear();
  }

}
