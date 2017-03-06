#ExcelParser.java  
This java class is responsible for converting from an excel file (`.xlsx`),
to our mongo database. This documentation was prepared to walk through how and why we implemented this class the way we did.   

##Why this parser is good  

##Apache POI

##Step 1: Extracting data from the xlsx document into a 2D Array  
In our main method, the first thing we do is call `extractFromXLSX()`.
This method is the only method we use that uses *Apache POI*.
The back bone for this method is from an [Apache POI example](http://www.mkyong.com/java/apache-poi-reading-and-writing-excel-file-in-java/) that prints all the content from an `xlsx` file.
We modified it to put that data in a 2D string array.
When playing around with this first method, we learned some important things.   
1. For whatever reason, the first row of any spread sheet we import is completely `null`.
We tried to fix this for a while and gave up, we rectify this problem when we start editing the 2D array.
Unfortunately, we can't grab any data from the first row. 
2. The default size for an `xlsx` document is **1000 rows, and 25 columns**.
As a consequence, our array is 1000 rows tall, and 25 columns wide, and each non-filled index is `null`.
We spend a lot of time shrinking the size of this array.  
3. General 2D array facts, for a 2D array named `cellValues`:    
  * `cellValues.length` gives us the height of the array   
  * `cellValues[i].length` gives us the length of a given row, `i`.  

##Step 2: Horizontally Collapse the Array  
Because most of our 2D array is null at this point, we horizontally collapse the array to get rid of all columns that are just filled with nulls. We could have collapsed both vertically and horizontally at the same time, but for read and write simplicity, we opted for doing each of these steps individually.
