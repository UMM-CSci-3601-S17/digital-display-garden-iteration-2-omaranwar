import { Component, OnInit } from '@angular/core';
import { PlantListService } from "./plant-list.service";
import { Plant } from "./plant";
import { FilterBy } from "./filter.pipe";

@Component({
    selector: 'plant-list-component',
    templateUrl: 'plant-list.component.html',
    providers: [ FilterBy ]
})

export class PlantListComponent implements OnInit {
    public plants: Plant[];
    public locations: Plant[];

    // Don't filter if already filtered
    public currentBedFilter;

    constructor(private plantListService: PlantListService) {
        // this.plants = this.plantListService.getPlants();
        //this.locations = this.plants;
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
    public handleClick(bedNumber): void{
        console.log("Checking Bed number " + bedNumber );

        // if(this.currentBedFilter != bedNumber) {
        //     this.currentBedFilter = bedNumber;
        //     this.filterByBedNumber(bedNumber);
        // }
    }

    public filterByBedNumber(bedNumber: string): void{

        // if("13" == bedNumber)
        //     console.log("String 13 === " + bedNumber);
        //
        // if(13 === bedNumber)
        //     console.log("Value 13 === " + bedNumber);

        console.log("Bed number " + bedNumber );

        this.plants.forEach((plant, index) => {
            console.log("Checking: " + plant.gardenLocation + " === " + bedNumber);
           if(plant.gardenLocation == bedNumber) {
               console.log("Added " + plant.commonName + " to [" + index + "]");
               this.locations[index] = new Plant(plant.commonName);
           }
        });

        // this.locations.forEach((plant, index) => {
        //     console.log(plant.commonName + " " + plant.cultivar);
        // });
    }

    ngOnInit(): void {
        this.plantListService.getPlants().subscribe(
            plants => this.plants = plants,
            err => {
                console.log(err);
            }
        );

        // this.plantListService.getGardenLocations().subscribe(
        //     locations => this.locations = locations,
        //     err => {
        //         console.log(err);
        //     }
        // );
    }
}
