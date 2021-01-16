import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      
      (params: Params) => {
        this.id = +params['id']; //because this is the naming we used inside the app-routing 'id'
        //this check id the fetched id exist for edit or not
        this.editMode = params['id'] != null;        
      }
    );
  }

}
