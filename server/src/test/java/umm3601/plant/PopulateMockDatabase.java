package umm3601.plant;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.types.ObjectId;
import org.junit.Before;
import umm3601.digitalDisplayGarden.PlantController;

import javax.print.Doc;
import java.io.IOException;
import java.util.*;

import static org.junit.Assert.assertEquals;

public class PopulateMockDatabase {

    public PopulateMockDatabase(){

    }

    private PlantController plantController;
    private String begoniaIdString;
    public String hexAlternantheraID;


    public static void clearDB(){
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection plants = db.getCollection("plants");
        db.drop();
    }

    public void clearAndPopulateDBAgain() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("test");
        MongoCollection plants = db.getCollection("plants");
        db.drop();

        //First Plant Alternanthera
        Map<String, String > alternanthera = new HashMap<>();
        alternanthera.put("commonName", "Alternanthera");
        alternanthera.put("cultivar", "Experimental");
        alternanthera.put("gardenLocation", "10");
        alternanthera.put("Comments", "Name change from Purple Prince 14x18 spreader");
        alternanthera.put("HBHangBasketCContainerWWall", "");
        alternanthera.put("id", "16001");
        alternanthera.put("source", "PA");
        alternanthera.put("SSeedVVeg", "S");
        //alternanthera.put("garden", "hello!");
        Document doc = new Document();
        doc.putAll(alternanthera);
        plants.insertOne(doc);

        //Second Plant Begonia
        Map<String, String> begonia = new HashMap<>();
        begonia.put("commonName", "Begonia");
        begonia.put("cultivar", "Megawatt Rose Green Leaf");
        begonia.put("gardenLocation", "10");
        begonia.put("Comments", "Grow in same sun or shade area; grow close proximity to each other for comparison");
        begonia.put("HBHangBasketCContainerWWall", "");
        begonia.put("id", "16008");
        begonia.put("source", "PA");
        begonia.put("SSeedVVeg", "S");
        doc = new Document();
        doc.putAll(begonia);
        plants.insertOne(doc);

        //Third Plant Dianthus
        Map<String, String> dianthus = new HashMap<>();
        dianthus.put("commonName", "Dianthus");
        dianthus.put("cultivar", "Jolt™ Pink F1");
        dianthus.put("gardenLocation", "7");
        dianthus.put("Comments", "");
        dianthus.put("HBHangBasketCContainerWWall", "");
        dianthus.put("id", "16040");
        dianthus.put("source", "AAS");
        dianthus.put("SSeedVVeg", "S");
        doc = new Document();
        doc.putAll(dianthus);
        plants.insertOne(doc);


    }
}




