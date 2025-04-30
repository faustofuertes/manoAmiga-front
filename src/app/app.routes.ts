import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './components/list/list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'categoria/:nombre', component: CategoriesComponent },
    { path: 'perfil/:id', component: ProfileComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
