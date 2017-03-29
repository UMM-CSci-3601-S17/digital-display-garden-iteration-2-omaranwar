/**
 * Copied from Rayquaza
 */

//Imports
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Plant } from './plant';
import { Observable } from "rxjs";


@Injectable()
export class PlantService {
    private plantUrl: string = API_URL + "plant";
    constructor(private http:Http) { }

    // getPlant(): Observable<Plant[]> {
    //     return this.http.request(this.plantUrl).map(res => res.json());
    // }

    getPlantById(id: string): Observable<Plant> {
        return this.http.request(this.plantUrl + "/" + id).map(res => res.json());
    }

    ratePlant(id: string, rating: string): Observable<Boolean> {
        console.log("Sending rating " + rating + " to " + id);
        return this.http.request(this.plantUrl + "/" + id + "/" + rating).map(res => res.json());
    }

    commentPlant(id: string, comment: string): Observable<Boolean> {
        console.log("Sending comment " + comment + " to " + id);
        let returnObject = {
            plantId: id,
            comment: comment
        };
        return this.http.post(this.plantUrl + "/" + "leaveComment", JSON.stringify(returnObject)).map(res => res.json());
    }
}