#PlantController.java

`PlantController.java` contains two classes: `PlantController` and `BedComparator`. 


###PlantController

PlantController has 7 methods:

`listPlants` 


`sortGardenLocations` takes a string of json (of plants) and sorts the plants into each bed according to the bed number, which it then returns as a string of json. BedComparator.compare is used to sort the beds


`getGardenLocations` runs through the plant list as returns a strign of json that is a list of all the bed numbers.

`printArray` takes an array and prints it out.

`getPlant` takes the id of a plant given in the excel sheet as a string and returns the plant as a strign of json.

`incrementMetadata` takes the plant id as a string and a field as a string. It goes into the data base to the plant property 'metadata', adding it if it doesn't exist, to the metadata property 'field' and increments the counter there by one, creating 'field' if it doesn't yet exist. 

`storePlantComment` takes a string of json of the form "{\\"plantId\\" : \\"*id*\\",\\"comment\\" : \\"*comment*\\"}" and goes into the comments database, creating it if it doesn't yet exist, and adding the json string to it. It also calls incrementMetadata with the field name 'CommentsOnPlant'.



###BedComparator

BedComparator only has one method, `compare`

`compare` takes two Beds and returns an int, either 1 or -1 