import {PlantFilter} from "../src/plantfilter";
import {Plant} from "../src/plant";
describe("Plant list", () => {

    it("Check Bed List Header", () => {
        expect(PlantFilter.FILTER_BY_ALL_PLANTS).toBe("Bed");
    });

    it("Filter by Bed Number", () => {
        let plants: Plant[] = [];
        plants.push(new Plant("Plant 1", "Bed1"));
        plants.push(new Plant("Plant 2", "Bed1"));
        plants.push(new Plant("Plant 3", "Bed2"));

        let filteredPlants: Plant[] = PlantFilter.filterByBedName("Bed1", plants);
        expect(filteredPlants.length).toBe(2);

        filteredPlants = PlantFilter.filterByBedName("Bed2", plants);
        expect(filteredPlants.length).toBe(1);
    });

});
