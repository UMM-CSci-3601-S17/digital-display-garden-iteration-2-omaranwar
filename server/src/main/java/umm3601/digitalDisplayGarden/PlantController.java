package umm3601.digitalDisplayGarden;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.io.IOException;
import java.util.*;

import static com.mongodb.client.model.Filters.eq;
import static java.lang.Double.parseDouble;

public class PlantController {

    private final MongoCollection<Document> plantCollection;

    public PlantController() throws IOException {
        // Set up our server address
        // (Default host: 'localhost', default port: 27017)
        // ServerAddress testAddress = new ServerAddress();

        // Try connecting to the server
        //MongoClient mongoClient = new MongoClient(testAddress, credentials);
        MongoClient mongoClient = new MongoClient(); // Defaults!

        // Try connecting to a database
        MongoDatabase db = mongoClient.getDatabase("test");

        plantCollection = db.getCollection("plants");
    }

    // List plants
    public String listPlants(Map<String, String[]> queryParams) {
        Document filterDoc = new Document();

        if (queryParams.containsKey("gardenLocation")) {
            String location = (queryParams.get("gardenLocation")[0]);
            filterDoc = filterDoc.append("gardenLocation", location);
        }


        if (queryParams.containsKey("commonName")) {
            String commonName = (queryParams.get("commonName")[0]);
            filterDoc = filterDoc.append("commonName", commonName);
        }

        FindIterable<Document> matchingPlants = plantCollection.find(filterDoc);

        return JSON.serialize(matchingPlants);
    }

    public String sortGardenLocations(String gardenLocationJSON) {
        Bed[] filteredBeds;
        Gson gson = new Gson();

        filteredBeds = gson.fromJson(gardenLocationJSON, Bed[].class);

        BedComparator bedComparator = new BedComparator();
        Arrays.sort(filteredBeds, bedComparator);

        return gson.toJson(filteredBeds);
    }

    public String getGardenLocations() {
        AggregateIterable<Document> documents
                = plantCollection.aggregate(
                Arrays.asList(
                        Aggregates.group("$gardenLocation"),
                        Aggregates.sort(Sorts.ascending("_id"))
                ));
        System.err.println(JSON.serialize(documents));

        String toReturn = sortGardenLocations(JSON.serialize(documents));

        return toReturn;

    }


    public static void printArray(Bed[] bedArray) {
        System.out.print("[");
        for (int i = 0; i < bedArray.length; i++) {
            if(i == bedArray.length -1){
                System.out.println(bedArray[i]._id + "]");
                break;
            }
            System.out.print(bedArray[i]._id + ", ");
        }
    }

}

class BedComparator implements Comparator<Bed>{

    @Override
    public int compare(Bed firstBed, Bed secondBed) {

        boolean firstBedDouble = false;
        boolean otherBedDouble = false;

        Double firstAsDouble = new Double(0);
        Double otherAsDouble = new Double(0);

        String currentBedString = firstBed._id.toString();
        String otherBedString = secondBed._id.toString();

        try {
            firstAsDouble = parseDouble(firstBed._id.toString());
            firstBedDouble = true;
        }catch (NumberFormatException e){
            firstBedDouble = false;
        }

        try {
            otherAsDouble = parseDouble(secondBed._id.toString());
            otherBedDouble = true;
        }catch (NumberFormatException e){
            otherBedDouble = false;
        }

        if(firstBedDouble && otherBedDouble){
            return firstAsDouble.compareTo(otherAsDouble);
        }
        else if(firstBedDouble){
            return -1;
        }
        else if(otherBedDouble) {
            return 1;
        }
        else {
            return currentBedString.compareTo(otherBedString);
        }
    }
}