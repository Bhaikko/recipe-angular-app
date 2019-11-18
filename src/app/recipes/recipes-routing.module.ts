import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipes-resolver.service';

const routes: Routes = [
    { 
        // this path is assigned in app.module for lazy loading
        path: "",
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: "",
                component: RecipesStartComponent
            },
            {
                path: "new",    // static paths should be placed before dynamic
                component: RecipeEditComponent
            },
            {
                path: ":id",
                component: RecipeDetailComponent,
                resolve: [RecipeResolverService]    // this resolver is run before this route is loaded to fetch data
            },
            {
                path: ":id/edit",
                component: RecipeEditComponent,
                resolve: [RecipeResolverService]
            }
        ]
    }
] 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}