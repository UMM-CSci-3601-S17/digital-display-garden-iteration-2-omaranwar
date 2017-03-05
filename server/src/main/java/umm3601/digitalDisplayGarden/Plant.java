package umm3601.digitalDisplayGarden;
import org.bson.Document;

/**
 * Created by benek020 on 3/5/17.
 */
public class Plant {
    public Object id;
    public String commonName;
    public String cultivar;
    public String source;
    public String gardenLocation;

    public Plant(String id, String commonName, String cultivar, String source, String gardenLocation){
        this.id = id;
        this.commonName = commonName;
        this.cultivar = cultivar;
        this.source = source;
        this.gardenLocation = gardenLocation;
    }

    public Document toBSON(){
        Document doc = new Document();
        doc.append("id", id);
        doc.append("commonName", commonName);
        doc.append("cultivar", cultivar);
        doc.append("source", source);
        doc.append("gardenLocation", gardenLocation);

        return doc;
    }
}
