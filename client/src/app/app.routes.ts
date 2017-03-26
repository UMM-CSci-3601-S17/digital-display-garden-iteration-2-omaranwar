// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {PlantListComponent} from "./garden/plant_list/src/plant-list.component";
import {PlantComponent} from "./garden/plant_list/src/plant.component";
import {DialogComponent} from "./dialog/dialog.component";

// Route Configuration
export const routes: Routes = [
    { path: '', component: PlantListComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);