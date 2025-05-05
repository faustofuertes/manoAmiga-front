import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PostFormComponent } from './components/post-form/post-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'categorias/:ubicacion/:trabajo', component: CategoriesComponent },
    { path: 'perfil/:id', component: ProfileComponent },
    { path: 'mi-perfil', component: MyProfileComponent },
    { path: 'crear-publicacion', component: PostFormComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
