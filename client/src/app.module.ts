import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent }         from './app/app.component';
import { NavbarComponent } from './app/navbar/navbar.component';
import { HomeComponent} from './app/home/home.component';
import { PlantListComponent } from './app/garden/plant_list/src/plant-list.component';
import { PlantListService } from './app/garden/plant_list/src/plant-list.service';
import { DialogComponent} from './app/dialog/dialog.component';
import { routing } from './app/app.routes';
import { FormsModule } from '@angular/forms';

import { PipeModule } from './pipe.module';
import {PlantComponent} from "./app/garden/plant_list/src/plant.component";
import {BedListComponent} from "./app/garden/bed_list/src/bed-list.component";
import {BedListService} from "./app/garden/bed_list/src/bed-list.service";
import {GardenComponent} from "./app/garden/src/garden-component";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing,
        FormsModule,
        PipeModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        PlantListComponent,
        GardenComponent,
        DialogComponent,
        BedListComponent
    ],
    providers: [ PlantListService, BedListService ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}
