/**
 * @author Skye Antinozzi
 * @author Shawn Saliyev
 */
import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Plant } from './plant';
import { Observable } from "rxjs";
import {PlantCollection} from "./plantcollection";
import {PlantListComponent} from "./plant-list.component";
import {PlantFilter} from "./plantfilter";

@Injectable()
export class PlantListService {

    private readonly URL: string = API_URL + "plants";

    private plantCollection: PlantCollection;

    // The bed filter we have currently filtered by
    private currentBedFilter;

    constructor(private http:Http) {

        this.getPlantsFromServer().subscribe(
            plants => this.plantCollection = new PlantCollection(plants),
            err => {
                console.log(err);
            }
        );
    }

    /**
     * Requests that the plant collection be sent from the server.
     * @returns {Observable<R>} - the received Observable Plant collection
     */
    private getPlantsFromServer(): Observable<Plant[]> {
        return this.http.request(this.URL).map(res => res.json());
    }

    /**
     * Returns the plant collection.
     * @returns {Plant[]} - the returned plants
     */
    public getPlants(): Plant[]{
        return this.plantCollection.getPlants();
    }

    /**
     * If the data has not already been filtered by the current bed name this method
     * filters the plant data.
     * @param bedName - bed name to filter by
     */
    public filterByBedName(bedName: string): void{

        // Check that we haven't already filtered
        if(this.currentBedFilter != bedName) {

            this.currentBedFilter = bedName;

            if(this.currentBedFilter === PlantFilter.FILTER_BY_ALL_PLANTS)
                PlantListComponent.getInstance().setFilteredPlants(this.plantCollection.getPlants());

            // Filter by the bed name
            else {
                let filteredPlants: Plant[] = PlantFilter.filterByBedName(bedName, this.plantCollection.getPlants());
                PlantListComponent.getInstance().setFilteredPlants(filteredPlants);
            }
        }
    }
}