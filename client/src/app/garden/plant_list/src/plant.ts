export class Plant {
    // _id is the unique primary key in the db
    id: string; // id in the excel sheet
    plantID: string; // is undefined
    plantType: string;
    commonName: string;
    cultivar: string;
    source: string;
    gardenLocation: string;
    year: string;
    pageURL: string;
    plantImageURLs: string[];
    recognitions: string[];

    constructor(cultivar: string, bedName: string) {
        this.cultivar = cultivar;
        this.gardenLocation = bedName;
    }

}

