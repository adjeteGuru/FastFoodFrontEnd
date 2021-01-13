import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];  

  constructor(private recipeService: RecipeService, private router: Router,
    private route: ActivatedRoute) { }  

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  } 

  onNewRecipe(){
    //use this router to navigate to target the path (which is 'new') I want to go to ..
    //bear in mind we are currently in the recipe-list
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
