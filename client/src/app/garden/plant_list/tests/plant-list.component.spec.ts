import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Observable } from "rxjs";
import {PlantListComponent} from "../src/plant-list.component";
import {PlantListService} from "../src/plant-list.service";
import {Plant} from "../src/plant";

describe("Plant list", () => {

    let plantList: PlantListComponent;
    let fixture: ComponentFixture<PlantListComponent>;

    let plantListServiceStub: {
        getPlants: () => Observable<Plant[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        plantListServiceStub = {
            getPlants: () => Observable.of([
                {
                    id: "1",
                    plantID: "PlantID1",
                    plantType: "PlantType1",
                    commonName: "CommonName1",
                    cultivar: "Cultivar1",
                    source: "Source1",
                    gardenLocation: "BedName1",
                    year: "Year1",
                    pageURL: "PageURL1",
                    plantImageURLs: null,
                    recognitions: null
                },
                {
                    id: "2",
                    plantID: "PlantID2,",
                    plantType: "PlantType2,",
                    commonName: "CommonName2,",
                    cultivar: "Cultivar2,",
                    source: "Source2,",
                    gardenLocation: "BedName2,",
                    year: "Year2,",
                    pageURL: "PageURL2,",
                    plantImageURLs: null,
                    recognitions: null
                },
                {
                    id: "3",
                    plantID: "PlantID3",
                    plantType: "PlantType3",
                    commonName: "CommonName3",
                    cultivar: "Cultivar3",
                    source: "Source3",
                    gardenLocation: "BedName3",
                    year: "Year3",
                    pageURL: "PageURL3",
                    plantImageURLs: null,
                    recognitions: null
                }
                ])
        };

        TestBed.configureTestingModule({
            declarations: [ PlantListComponent ],
            providers:    [ { provide: PlantListService, useValue: plantListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(PlantListComponent);
            plantList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("Get Instance of PlantListComponent", () => {
        let plc: PlantListComponent  = new PlantListComponent(null);
        expect(PlantListComponent.getInstance() == null).toBe(false);
    });

    it("Set Filtered Plants", () => {

        let plants: Plant[] = [];
        plants.push(new Plant("Plant 1", "Bed1"));
        plants.push(new Plant("Plant 2", "Bed2"));
        plants.push(new Plant("Plant 3", "Bed3"));

        expect(plants.length).toBe(3);

        plantList.setFilteredPlants(plants);

        expect(plantList.getFilteredPlants().length).toBe(3);
    });

});
