import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/recipes",
        pathMatch: "full"
    },
    { 
        path: "recipes",
        component: RecipesComponent,
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
    },
    { 
        path: "shopping-list",
        component: ShoppingListComponent
    },
    {
        path: "auth",
        component: AuthComponent
    }
] 

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}