import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  recipes$: Observable<Recipe[]> = new Observable();
  // recipes$!: Recipe[];
  subscription!: Subscription;

  constructor(private router: Router, private recipesService: RecipesService) {
    this.recipes$ = recipesService.recipes$.pipe(
      map((recipes: Recipe[]) => {
        console.log(recipes);
        return recipes;
      })
    );
  }

  ngOnInit(): void {}
  onAddRecipe() {
    this.router.navigate(['/recipes/new']);
  }
}
