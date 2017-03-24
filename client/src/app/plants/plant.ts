export class Plant {
    id: string;
    plantID: string;
    plantType: string;
    commonName: string;
    cultivar: string;
    source: string;
    gardenLocation: string;
    year: number;
    pageURL: string;
    plantImageURLs: string[];
    recognitions: string[];

    constructor(commonName: string) {
        this.commonName = commonName;
    }
}

