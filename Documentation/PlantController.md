# PlantController.java  

`PlantController.java` contains two classes: `PlantController` and `BedComparator`.


### PlantController  

PlantController has 7 methods:

`listPlants` will return a filtered JSON object of plants that can be filtered by either
gardenLocation or commonName.

`sortGardenLocations` This method sorts the gardenLocations in a custom order specified by the **Bed Comparator** below. In order to sort the garden locations, we break the JSON object, full of bed numbers from the database, into an array of *Bed* objects. The bed object simply stores the string representing the bed number.    

`getGardenLocations` will return a sorted JSON object of gardenLocations.
This is used to generate the bed list column on our front end.  

`printArray` takes an array of Bed objects, and prints the `_id` values for the Bed Object.

`getPlant` takes the id of a plant given in the excel sheet as a string and returns the plant as a strign of json.

`incrementMetadata` takes the plant id as a string and a field as a string. It goes into the data base to the plant property 'metadata', adding it if it doesn't exist, to the metadata property 'field' and increments the counter there by one, creating 'field' if it doesn't yet exist.

`storePlantComment` takes a string of json of the form "{\\"plantId\\" : \\"*id*\\",\\"comment\\" : \\"*comment*\\"}" and goes into the comments database, creating it if it doesn't yet exist, and adding the json string to it. It also calls incrementMetadata with the field name 'CommentsOnPlant'.



### BedComparator  
This comparator class exists as a means of bypassing the Java `String.sort()`.
Because we have strings that will be primarily viewed as numbers (although some strings will have both numbers and letters),
we run into astetic issues on our front end with the outcome of `String.sort()`. This comparator sorts strings with the following priorities:
* Strings that can be cast to doubles will appear first in the sorted array, and will be sorted as if they were doubles (as apposed to *lexagraphically* by `String.sort()`).  
* Strings that can't be sorted as doubles will appear last in the array, and will be sorted *lexagraphically*.    

The `compare()` method will return a sorted array of `Bed objects`.  
