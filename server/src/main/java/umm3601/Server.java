package umm3601;

import umm3601.user.UserController;
import umm3601.digitalDisplayGarden.PlantController;

import java.io.IOException;

import static spark.Spark.*;

import umm3601.digitalDisplayGarden.ExcelParser;


public class Server {
    public static void main(String[] args) throws IOException {


        ExcelParser parser = new ExcelParser(false);
        parser.parseExcel();

        // This users looks in the folder `public` for the static web artifacts,
        // which includes all the HTML, CSS, and JS files generated by the Angular
        // build. This `public` directory _must_ be somwhere in the classpath;
        // a problem which is resolved in `server/build.gradle`.
        staticFiles.location("/public");

        UserController userController = new UserController();
        PlantController plantController = new PlantController();

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
 
            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        // Simple example route
        get("/hello", (req, res) -> "Hello World");

        // Redirects for the "home" page
        redirect.get("", "/");
        redirect.get("/", "http://localhost:9000");

        // List users
        get("api/users", (req, res) -> {
            res.type("application/json");
            return userController.listUsers(req.queryMap().toMap());
        });

        // See specific user
        get("api/users/:id", (req, res) -> {
            res.type("application/json");
            String id = req.params("id");
            return userController.getUser(id);
        });

        // Get average ages by company
        get("api/avgUserAgeByCompany", (req, res) -> {
            res.type("application/json");
            return userController.getAverageAgeByCompany();
        });

        // List plants
        get("api/plants", (req, res) -> {
            res.type("application/json");
            return plantController.listPlants(req.queryMap().toMap());
        });

        get("api/gardenLocations", (req, res) -> {
            res.type("application/json");
            return plantController.getGardenLocations();
        });

        // Handle "404" file not found requests:
        notFound((req, res) -> {
            res.type("text");
            res.status(404);
            return "Sorry, we couldn't find that!";
        });

    }

}
