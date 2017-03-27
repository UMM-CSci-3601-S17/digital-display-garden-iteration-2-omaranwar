/**
 * @author Shawn Saliyev
 * @author Skye Antinozzi
 */
import {OnInit, Component} from "@angular/core";
import {Bed} from "./bed";
import {BedListService} from "./bed-list.service";
import {PlantListService} from "../../plant_list/src/plant-list.service";
import {PlantFilter} from "../../plant_list/src/plantfilter";

@Component({
    selector: 'bed-list',
    templateUrl: 'bed-list.component.html'
})
export class BedListComponent implements OnInit {

    private bedNames: Bed[];

    /**
     * Title for the bed list view on the HTML Bed List Component.
     * This is used for filtering to show all plants and is linked to the PlantFilter class.
     */
    public readonly BED_LIST_HEADER: string = PlantFilter.FILTER_BY_ALL_PLANTS;

    constructor(private bedListService: BedListService, private plantListService: PlantListService) { }

    /**
     * Should filter by the provided bed name.
     * @param bedName - the bed name to filter by
     */
    private handleBedListClick(bedName): void{
        this.plantListService.filterByBedName(bedName);
    }

    ngOnInit(): void {
        this.bedListService.getBedNames().subscribe(
            bedNames => this.bedNames = bedNames,
            err => {
                console.log(err);
            }
        );
    }
}