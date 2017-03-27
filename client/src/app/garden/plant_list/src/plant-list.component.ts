/**
 * @author Skye Antinozzi
 * @author Shawn Saliyev
 */
import { Component } from '@angular/core';
import { PlantListService } from "./plant-list.service";
import { Plant } from "./plant";
import { FilterBy } from "../../filter.pipe";

@Component({
    selector: 'plant-list',
    templateUrl: 'plant-list.component.html',
    providers: [ FilterBy ]
})

export class PlantListComponent {

    // The list of filtered plant to display within the HTML
    private filteredPlants: Plant[] = [];

    // Static factory class instance variable
    private static plantListComponent: PlantListComponent;

    constructor(private plantListService: PlantListService) {
        // Keep track of 'this' for static factory method
        PlantListComponent.plantListComponent = this;
    }

    /**
     * Static factory method to return the currently instantiated PlantListComponent.
     * @returns {PlantListComponent} - the current PlantListComponent
     */
    public static getInstance(): PlantListComponent{
        return PlantListComponent.plantListComponent;
    }

    /**
     * TODO: Needs to open a plant page overlay.
     * @param selectedPlant - the cultivar of the selected plant
     */
    public handlePlantListClick(selectedPlant: String){
        console.log("Plants: " + this.plantListService.getPlants());
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

    public filterByBedName(bedName: string): void{
        this.plantListService.filterByBedName(bedName);
    }

}
