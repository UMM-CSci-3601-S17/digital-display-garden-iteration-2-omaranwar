export class Plant {
    id: string;
    plantID: string;
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

