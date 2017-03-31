package umm3601.digitalDisplayGarden;

import com.google.gson.Gson;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import com.mongodb.util.JSON;
import org.bson.BsonInvalidOperationException;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.bson.conversions.Bson;

import java.io.IOException;
import java.util.*;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Projections.include;
import static com.mongodb.client.model.Updates.*;
import static com.mongodb.client.model.Projections.fields;
import static java.lang.Double.parseDouble;

public class PlantController {

    private final MongoCollection<Document> plantCollection;
    private MongoCollection<Document> commentCollection;

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
        commentCollection = db.getCollection("comments");

        commentCollection.drop();
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





    /**
     * Takes a String, the ID number of a plant,
     * and when the ID is found in the database returns a JSON document
     * as a String of the following form
     *
     * <code>
     * {
     *  "_id"        : { "$oid": String },
     *  "commonName" : String,
     *  "cultivar"   : String,
     *  "id"         : String
     * }
     * </code>
     *
     * If the ID is invalid or not found, the following JSON value is
     * returned
     *
     * <code>
     *  null
     * </code>
     *
     * @param id the given ID number of a plant in the excel file (and therefore the DB)
     * @return a string representation of a JSON value
     */
    public String getPlant(String id) {

        FindIterable<Document> jsonPlant;
        String returnVal;
        try {
            jsonPlant = plantCollection.find(eq("id", id))
                    .projection(fields(include("commonName", "cultivar", "id", "gardenLocation", "metadata", "metadata.CommentsOnPlants")));

            Iterator<Document> iterator = jsonPlant.iterator();

            if (iterator.hasNext()) {
                incrementMetadata(id, "pageViews");
                returnVal = iterator.next().toJson();
            } else {
                returnVal = "null";
            }

        } catch (IllegalArgumentException e) {
            returnVal = "null";
        }

        return returnVal;

    }

    /**
     * Finds a plant and atomically increments the specified field
     * in its metadata object. This method returns true if the plant was
     * found successfully (false otherwise), but there is no indication of
     * whether the field was found.
     *
     * @param id the given ID number of a plant in the excel file (and therefore the DB)
     * @param field a field to be incremented in the metadata object of the plant
     * @return true if a plant was found
     * @throws com.mongodb.MongoCommandException when the id is valid and the field is empty
     */
    public boolean incrementMetadata(String id, String field) {

        ObjectId objectId;


        Document searchDocument = new Document();
        searchDocument.append("id", id);

        Bson updateDocument = inc("metadata." + field, 1);

        return null != plantCollection.findOneAndUpdate(searchDocument, updateDocument);
    }

    /**
     * Accepts string representation of JSON object containing
     * at least the following.
     * <code>
     *     {
     *         plantId: String,
     *         comment: String
     *     }
     * </code>
     * If either of the keys are missing or the types of the values are
     * wrong, false is returned.
     * @param json string representation of JSON object
     * @return true iff the comment was successfully submitted
     */
    public boolean storePlantComment(String json) {

        try {
            Document toInsert = new Document();
            Document parsedDocument = Document.parse(json);


            if (parsedDocument.containsKey("plantId") && parsedDocument.get("plantId") instanceof String) {
                toInsert.put("commentOnObjectOfId", parsedDocument.getString("plantId"));
            } else {
                return false;
            }

            if (parsedDocument.containsKey("comment") && parsedDocument.get("comment") instanceof String) {
                toInsert.put("comment", parsedDocument.getString("comment"));
            } else {
                return false;
            }

            this.incrementMetadata(parsedDocument.getString("plantId"), "CommentsOnPlant");
            commentCollection.insertOne(toInsert);

        } catch (BsonInvalidOperationException e){
//            e.printStackTrace();
            return false;
        } catch (org.bson.json.JsonParseException e){
//            e.printStackTrace();
            return false;
        }

        return true;
    }
}

class BedComparator implements Comparator<Bed> {

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
        } catch (NumberFormatException e) {
            firstBedDouble = false;
        }

        try {
            otherAsDouble = parseDouble(secondBed._id.toString());
            otherBedDouble = true;
        } catch (NumberFormatException e) {
            otherBedDouble = false;
        }

        if (firstBedDouble && otherBedDouble) {
            return firstAsDouble.compareTo(otherAsDouble);
        } else if (firstBedDouble) {
            return -1;
        } else if (otherBedDouble) {
            return 1;
        } else {
            return currentBedString.compareTo(otherBedString);
        }
    }
}