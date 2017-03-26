import { Component, OnInit } from '@angular/core';
import { PlantListService } from "./plant-list.service";
import { Plant } from "./plant";
import { Bed } from "../../bed_list/src/bed";
import { FilterBy } from "../../filter.pipe";

@Component({
    selector: 'plant-list-component',
    templateUrl: 'plant-list.component.html',
    providers: [ FilterBy ]
})

export class PlantListComponent implements OnInit {
    private allPlants: Plant[];

    private filteredPlants: Plant[] = [];

    private gardenLocations: Bed[];



    private static readonly ALL_PLANTS: string = "Bed";

    // Don't filter if already filtered
    public currentBedFilter;

    constructor(private plantListService: PlantListService) {
        // this.plants = this.plantListService.getPlants();
        //this.filteredPlants = this.plants;
    }

    public getSelectedBed(): string{
        return (<HTMLInputElement>document.getElementById("locationDropdown")).value;
    }

    public populateFlowers(): void{

        var bed = this.getSelectedBed();
        var filterUrl = "?gardenLocation=" + bed;

        // this.plantListService.getFlowersByFilter(filterUrl).subscribe (
        //     plants => this.plants = plants,
        //     err => {
        //         console.log(err);
        //     }
        // );
    }

    public handleClick(bedName): void{
        console.log("Checking Bed number " + bedName );

        if(this.currentBedFilter != bedName) {

            if(bedName === PlantListComponent.ALL_PLANTS){
                console.log("All Plants");
                this.filteredPlants = this.allPlants;
            } else{
                console.log("Filter Plants");
                this.currentBedFilter = bedName;
                this.filterByBedNumber(bedName);
            }
        }
    }

    /**
     * Filters the Plant List by a bed name within the Bed list.
     * @param bedName - the name of the bed to filter by
     */
    public filterByBedNumber(bedName: string): void{

        this.filteredPlants = [];

        this.allPlants.forEach((plant, index) => {
           if(plant.gardenLocation == bedName)
               this.filteredPlants.push(plant);
        });
    }

    ngOnInit(): void {
        this.plantListService.getPlants().subscribe(
            plants => this.allPlants = plants,
            err => {
                console.log(err);
            }
        );


        this.plantListService.getGardenLocations().subscribe(
            gardenLocations => this.gardenLocations = gardenLocations,
            err => {
                console.log(err);
            }
        );
    }
}
