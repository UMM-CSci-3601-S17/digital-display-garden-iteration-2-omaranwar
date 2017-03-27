import {OnInit, Component} from "@angular/core";
import {Bed} from "./bed";
import {BedListService} from "./bed-list.service";

@Component({
    selector: 'bed-list',
    templateUrl: 'bed-list.component.html'
})
export class BedListComponent implements OnInit {

    private bedNames: Bed[];

    constructor(private bedListService: BedListService) { }

    ngOnInit(): void {
        this.bedListService.getBedNames().subscribe(
            bedNames => this.bedNames = bedNames,
            err => {
                console.log(err);
            }
        );
    }
}