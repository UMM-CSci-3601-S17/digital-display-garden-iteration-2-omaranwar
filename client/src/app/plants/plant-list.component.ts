import { Component, OnInit } from '@angular/core';
import { PlantListService } from "./plant-list.service";
import { Plant } from "./plant";
import { Bed } from "./bed";
import { FilterBy } from "./filter.pipe";

@Component({
    selector: 'plant-list-component',
    templateUrl: 'plant-list.component.html',
    providers: [ FilterBy ]
})

export class PlantListComponent implements OnInit {
    public plants: Plant[];
    public filteredPlants: Plant[] = [];
    public gardenLocations: Bed[];

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
                this.filteredPlants = this.plants;
            } else{
                console.log("Filter Plants");
                this.currentBedFilter = bedName;
                this.filterByBedNumber(bedName);
            }
        }
    }

    public filterByBedNumber(bedName: string): void{

        this.filteredPlants = [];

        this.plants.forEach((plant, index) => {
            // console.log("Checking " + plant.commonName + ": " + plant.gardenLocation + " === " + bedName);
           if(plant.gardenLocation == bedName) {
               console.log("Added " + plant.commonName + " to [" + index + "]");
               this.filteredPlants.push(plant);
           }
        });

        this.filteredPlants.forEach((plant, index) => {
            console.log(plant.commonName + " " + plant.cultivar);
        });
    }

    ngOnInit(): void {
        this.plantListService.getPlants().subscribe(
            plants => this.plants = plants,
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
