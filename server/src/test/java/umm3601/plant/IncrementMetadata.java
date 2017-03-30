package umm3601.plant;
import com.google.gson.Gson;
import org.bson.Document;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.Test;
import umm3601.digitalDisplayGarden.Plant;
import umm3601.digitalDisplayGarden.PlantController;
import umm3601.plant.PopulateMockDatabase;
import java.io.IOException;
import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;

public class IncrementMetadata {
    @Before
    public void setUpDB() throws IOException{
        PopulateMockDatabase mockDatabase = new PopulateMockDatabase();
        mockDatabase.clearAndPopulateDBAgain();
    }

    @Test
    public void AddLikeAndDislike() throws IOException {
        PlantController plantController = new PlantController();

        PopulateMockDatabase mockUp = new PopulateMockDatabase();
        mockUp.clearAndPopulateDBAgain();

        Boolean likeWorked = plantController.incrementMetadata("16001", "like");
        assertTrue(likeWorked);

        Boolean dislikeWorked = plantController.incrementMetadata("16001", "dislike");
        assertTrue(dislikeWorked);

    }

    @Test
    public void AddComment() throws IOException {
        PlantController plantController = new PlantController();

        PopulateMockDatabase mockUp = new PopulateMockDatabase();
        mockUp.clearAndPopulateDBAgain();

        Boolean commentWorked = plantController.storePlantComment("{\"plantId\" : \"16001\",\"comment\" : \"thing\"}");
        assertTrue(commentWorked);

    }
    @AfterClass
    public static void clean(){
        PopulateMockDatabase.clearDB();
    }
}
