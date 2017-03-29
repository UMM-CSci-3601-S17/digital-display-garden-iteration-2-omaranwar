import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Plant} from './plant';
import {PlantService} from './plant.service';
import {PlantListService} from './plant-list.service';
import 'rxjs/add/operator/switchMap';
import {PlantListComponent} from "./plant-list.component";

@Component({
    selector: 'plant-component',
    templateUrl: 'plant.component.html'
})
export class PlantComponent implements OnInit {
    private rated: Boolean = false;
    private commented: Boolean = false;
    private currentQuery: string = "";
    // public plant: Plant = null;
    public plant: Plant = {id: "", commonName: "", cultivar: "", gardenLocation: ""};
    private id: string;

    // Maintain a static class instance variable to provide data interaction between components
    private static plantComponent: PlantComponent;

    // The plant that has its data presented within the PlantComponent interface
    // private plant: Plant;

    // private route: ActivatedRoute,
    constructor( private plantService: PlantService, private route: ActivatedRoute ) {
        PlantComponent.plantComponent = this;
        console.log("Set " + PlantListComponent.getInstance().getSelectedPlant());
    }

    /**
     * Static factory method to return the currently instantiated PlantComponent.
     * Used for retrieving instances of the class when outside of the class.
     * @returns {PlantComponent} - the current PlantComponent
     */
    public static getInstance(): PlantComponent{
        return PlantComponent.plantComponent;
    }

    //region Unused in Current Refactoring (To be used in the future)
    ngOnInit(): void {
        // this.route.params
        //     .switchMap((params: Params) => this.plantService.getPlantById(params['id']))
        //     .subscribe(plant => this.plant = plant);
        this.plant = PlantListComponent.getInstance().getSelectedPlant();
    }

    private rate(rating: string): void {
        if (!this.rated) {
            this.plantService.ratePlant(this.plant.id, rating)
                .subscribe(succeeded => this.rated = succeeded);
        }
    }

    private comment(comment: string): void {
        if (!this.commented) {
            if (comment != null) {
                this.plantService.commentPlant(this.plant.id, comment)
                    .subscribe(succeeded => this.commented = succeeded);
            }
        }
    }
    //endregion

}
