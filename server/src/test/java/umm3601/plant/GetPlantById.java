package umm3601.plant;
import com.google.gson.Gson;
import org.bson.Document;
import org.junit.Before;
import org.junit.Test;
import umm3601.digitalDisplayGarden.Plant;
import umm3601.digitalDisplayGarden.PlantController;
import umm3601.plant.PopulateMockDatabase;

import java.io.IOException;

import static junit.framework.TestCase.assertEquals;

public class GetPlantById {
    @Before
    public void setUpDB() throws IOException{
        PopulateMockDatabase mockDatabase = new PopulateMockDatabase();
        mockDatabase.clearAndPopulateDBAgain();
    }

    @Test
    public void GetPlantByID() throws IOException {
        PlantController plantController = new PlantController();

        String jsonAsString = plantController.getPlant("16001");
        Document doc = Document.parse(jsonAsString);
        assertEquals("alternanthera", doc.getString("commonName"));

    }

    @Test
    public void GetNullPlant() throws IOException{

        PlantController plantController = new PlantController();

        assertEquals("null", plantController.getPlant("00000"));
    }

}
