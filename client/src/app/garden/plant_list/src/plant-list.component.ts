/**
 * @author Skye Antinozzi
 * @author Shawn Saliyev
 */
import { Component } from '@angular/core';
import { PlantListService } from "./plant-list.service";
import { Plant } from "./plant";
import { FilterBy } from "../../filter.pipe";
import { PlantComponent } from "./plant.component";

@Component({
    selector: 'plant-list',
    templateUrl: 'plant-list.component.html',
    providers: [ FilterBy ]
})

export class PlantListComponent {

    // The list of filtered plant to display within the HTML
    private filteredPlants: Plant[] = [];

    // The currently selected plant within the list
    private selectedPlant: Plant;

    // Maintain a static class instance variable to provide data interaction between components
    private static plantListComponent: PlantListComponent;

    constructor(private plantListService: PlantListService) {
        // Keep track of 'this' for static factory method
        PlantListComponent.plantListComponent = this;
    }


    /**
     * Static factory method to return the currently instantiated PlantListComponent.
     * Used for retrieving instances of the class when outside of the class.
     * @returns {PlantListComponent} - the current PlantListComponent
     */
    public static getInstance(): PlantListComponent{
        return PlantListComponent.plantListComponent;
    }

    /**
     * TODO: Needs to open a plant page overlay.
     * @param selectedPlant - the cultivar of the selected plant
     */
    public handlePlantListClick(selectedPlant: Plant){
        console.log("handlePlantListClick(selectedPlant: Plant)");
        console.log(selectedPlant.commonName);
        this.filteredPlants.forEach((plant, index) => {
            if(selectedPlant == plant){;
                console.log(plant);
                console.log(" [" + index + "]");

                this.selectedPlant = selectedPlant;

            }
        });
    }

    public getSelectedPlant(): Plant{
        console.log(this.selectedPlant);
        return this.selectedPlant;
    }

    /**
     * Sets the array of filtered plants.
     * @param filteredPlants - the filtered plants to set
     */
    public setFilteredPlants(filteredPlants: Plant[]){
        this.filteredPlants = filteredPlants;
    }

    /**
     * Gets the filtered plants collection.
     * Currently implemented for testing.
     * @returns {Plant[]} - the filtered plants collection
     */
    public getFilteredPlants(): Plant[]{
        return this.filteredPlants;
    }

    /**
     *
     * @param bedName
     */
    public filterByBedName(bedName: string): void{
        this.plantListService.filterByBedName(bedName);
    }
}
