#Excel File Requirements  
One of our priorities is to provide a modular future proof system for inputing an Excel file. We understand that the way you will want to use the Digital Dipslay Garden will evolve and that our code will have to be modular enough to keep pace. We have developed a parser capable of handeling formatting changes to the spreadsheets you will give to our system. With our code, you will be able to add, delete, and rearrange content with a large degree of freedom. This document walks through what our code needs from your Excel file.  

##File Type
Our code takes in a simple Excel file with a `.xlsx` file ending.

##What our code needs from the Excel File  
We allow any spreadsheet provided it contains these properties. 

![ExampleSpreadSheet](https://github.com/UMM-CSci-3601-S17/digital-display-garden-iteration-1-claudearabo/blob/MakeMarkdownDocumentation/Documentation/Graphics/SpreadSheetRequirements.png)

###Key Row  
Our system does not search for certain keys, instead it will add any key with its values into our database. The red box in the figue above describes a region of the spreadsheet we refer to as the *key rows*. These are rows 2 through 4. Any words in this text will be interpreted as a key, you have words on one line or all three, and our system will add these to the database all the same.
* Our system will combine any text of a column together. For example, the column that includes *Common Name* will be interpreted as Common name. But the column containing S=VEG will be interpreted as *S=SeedV=Veg*

