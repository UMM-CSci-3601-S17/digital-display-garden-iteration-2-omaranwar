/**
 * Will filter any given collection of plants based on the provided methods.
 * Used for future reuse and extensibility.
 * @author Shawn Saliyev
 * @author Skye Antinozzi
 */
import {Plant} from "./plant";

export class PlantFilter {

    /**
     * Title for the bed list view on the HTML Bed List Component.
     * This is used for filtering to show all plants.
     */
    public static readonly FILTER_BY_ALL_PLANTS = "Bed";

    /**
     * Filters the provided plant collection by the provided bed name.
     * @param bedName - the bed name to filter by
     * @param plants - the plants array to filter
     * @returns {Plant[]} - the filtered plant array
     */
    public static filterByBedName(bedName: string, plants: Plant[]): Plant[]{

        let filteredPlants: Plant[] = [];

        plants.forEach((plant, index) => {
            console.log("Checking " + plant.gardenLocation + "==" + bedName);
            if (plant.gardenLocation == bedName)
                filteredPlants.push(plant);
        });

        return filteredPlants;
    }
}