import {Plant} from "../src/plant";
import {PlantCollection} from "../src/plantcollection";
describe("Plant list", () => {

    it("Check Proper Construction", () => {
        let plants: Plant[] = [];
        plants.push(new Plant("Plant 1", "Bed1"));
        plants.push(new Plant("Plant 2", "Bed1"));
        plants.push(new Plant("Plant 3", "Bed2"));

        let plantCollection: PlantCollection = new PlantCollection(plants);

        expect(plantCollection.getPlants().length).toBe(3);
    });
});
