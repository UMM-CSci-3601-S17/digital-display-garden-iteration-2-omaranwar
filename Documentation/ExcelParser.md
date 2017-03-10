#ExcelParser.java  
This java class is responsible for converting from an excel file (`.xlsx`),
to our mongo database. This documentation was prepared to walk through how and why we implemented this class the way we did.   

##Why this parser is good  

##Apache POI

##Setup: 
In our constructor we pass in a boolean, `test`. 
This boolean will change the excel file to our test spreadsheet and populate the database so our excelParser tests know what the outputs should be. 

##Step 1: Extracting data from the xlsx document into a 2D Array  
In our main method, the first thing we do is call `extractFromXLSX()`.
This method is the only method we use that uses *Apache POI*.
The back bone for this method is from an [Apache POI example](http://www.mkyong.com/java/apache-poi-reading-and-writing-excel-file-in-java/) that prints all the content from an `xlsx` file.
We heavily modified it to put that data in a 2D string array.
When playing around with this first method, we learned some important things:  

1. The default size for an `xlsx` from a Microsoft Excel document is **1000 rows, and 25 columns**.
As a consequence, our array is 1000 rows tall, and 25 columns wide, and each non-filled index is `null`.
We spend a lot of time shrinking the size of this array.  
2. General 2D array facts, for a 2D array named `cellValues`:    
  * `cellValues.length` gives us the height of the array   
  * `cellValues[i].length` gives us the length of a given row, `i`.  

##Step 2: Horizontally Collapse the Array  
Because most of our 2D array is null at this point, we horizontally collapse the array to get rid of all columns that are just filled with nulls.
We could have collapsed both vertically and horizontally at the same time, but for read and write simplicity, we opted for doing each of these steps individually. There are two steps involved in this proccess; locating the column to collapse the array at, and actually collapsing the array.  

###Locating the collapse point `collapseHorizontally()`  
In the example `xlsx` file below, there are three rows that are grayed out. We designate these three rows (rows 1 through 3) as *key rows*. When collapsing horizontally, we start at row one at the rightmost part of our 2D array. We check to see if any of the three rows in the column are not null. If they are null, we will shift one column to the left and repeat. We keep doing this process until we reach a cell that is not null. 

![HorizontalCallapse](https://github.com/UMM-CSci-3601-S17/digital-display-garden-iteration-1-claudearabo/blob/MakeMarkdownDocumentation/Documentation/Graphics/HorizontalCorrected.png)  

###Collapsing the array `trimArrayHorizontally()`  
This method starts where `collapseHorizontally()` leaves off. Because there is no built in method to trim arrays, let alone 2D arrays, we built one!  It simply makes a new 2D array of a size specified by `collapseHorizontally()`, copies the old array into the new one and returns it. 
