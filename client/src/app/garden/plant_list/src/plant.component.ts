import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Plant} from './plant';
import {PlantService} from './plant.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'plant-component',
    templateUrl: 'plant.component.html'
})
export class PlantComponent implements OnInit {
    private rated: Boolean = false;
    private commented: Boolean = false;
    private currentQuery: string = "";
    // public plant: Plant = null;
    public plant: Plant = {id: "", plantID: "", plantType: "", commonName: "", cultivar: "", gardenLocation: "", year: "", source: "", pageURL: "", plantImageURLs: [], recognitions: []};
    private id: string;

    constructor(private plantService: PlantService,
                private route: ActivatedRoute,) {
    }

    private subscribeToServiceForId() {
        // if (this.id) {id" :
        //     this.plantListService.getPlantById(this.id).subscribe(
        //         plant => this.plant = plant,
        //         err => {
        //             console.log(err);
        //         }
        //     );
        // }
    }

    setId(id: string) {
        this.id = id;
        this.subscribeToServiceForId();
    }

    // ngOnInit(): void {
    //     this.subscribeToServiceForId();
    // }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.plantService.getPlantById(params['id']))
            .subscribe(plant => this.plant = plant);
        console.log("CommonName = " + this.plant.commonName);

    }

    // private rate(rating: string): void {
    //     if (!this.rated) {
    //         this.plantService.ratePlant(this.plant["_id"]["$oid"], rating)
    //             .subscribe(succeeded => this.rated = succeeded);
    //     }
    // }

    private rate(rating: string): void {
        if (!this.rated) {
             console.log("clicked = " + rating + " " + this.plant["_id"]["$oid"]);
            this.plantService.ratePlant(this.plant["id"], rating)
                .subscribe(succeeded => this.rated = succeeded);
        }
        console.log("id = " + this.plant.id + " plantID = " + this.plant.plantID + " commonName = " + this.plant.commonName);
    }

    private comment(comment: string): void {
        if (!this.commented) {
            if (comment != null) {
                this.plantService.commentPlant(this.plant["_id"]["$oid"], comment)
                    .subscribe(succeeded => this.commented = succeeded);
            }
        }
    }
}
