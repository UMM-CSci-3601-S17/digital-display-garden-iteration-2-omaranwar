package umm3601.digitalDisplayGarden;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.Iterator;
import org.bson.Document;

public class ExcelParser {
    public static MongoClient mongoClient = new MongoClient();
    private static final String FILE_NAME = "/home/Dogxx000/IdeaProjects/digital-display-garden-iteration-1-claudearabo/server/src/main/java/umm3601/digitalDisplayGarden/AccessionList2016.xlsx";

    public static void main(String[] args) {

        try {

            System.out.println("Attempting to read from file in: "+ new File(FILE_NAME).getCanonicalPath());
            FileInputStream excelFile = new FileInputStream(new File(FILE_NAME));

            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet datatypeSheet = workbook.getSheetAt(0);
            Iterator<Row> iterator = datatypeSheet.iterator();

            // ---------- our stuff -----------
            String[][] cellValues = new String[datatypeSheet.getLastRowNum() + 1][];
            Row currentRow = datatypeSheet.getRow(1);
            // ---------- our stuff -----------

            Cell firstCell = iterator.next().getCell(1);
            while (iterator.hasNext() && !firstCell.equals(null)) {

                currentRow = iterator.next();
                Iterator<Cell> cellIterator = currentRow.iterator();

                cellValues[currentRow.getRowNum()] = new String[currentRow.getLastCellNum() - 1];

                while (cellIterator.hasNext()) {

                    Cell currentCell = cellIterator.next();


                    //getCellTypeEnum shown as deprecated for version 3.15
                    //getCellTypeEnum ill be renamed to getCellType starting from version 4.0
                    if (currentCell.getCellTypeEnum() == CellType.STRING) {
                        System.out.print(currentCell.getStringCellValue() + "--");
                        cellValues[currentCell.getRowIndex()][currentCell.getColumnIndex()] = currentCell.getStringCellValue();
                    } else if (currentCell.getCellTypeEnum() == CellType.NUMERIC) {
                        System.out.print(currentCell.getNumericCellValue() + "--");
                        cellValues[currentCell.getRowIndex()][currentCell.getColumnIndex()] = ("" + currentCell.getNumericCellValue());
                    }

                }
                System.out.println();


            }

            System.out.println(cellValues.length);
            System.out.println(cellValues[1].length);
            printDoubleArray(cellValues);

            Plant aPlant = new Plant(cellValues[10][0], cellValues[10][1], cellValues[10][2], cellValues[10][3],
                    cellValues[10][6]);

            MongoDatabase test = mongoClient.getDatabase("test");
            //test.createCollection("plants");
            MongoCollection plants = test.getCollection("plants");

            plants.insertOne(aPlant.toBSON());
            System.out.println(aPlant.commonName);


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static void printDoubleArray(String[][] input){
        for(int i = 1; i < input.length; i++){
            if (!input[i].equals(null)) {
                for (int j = 0; j < input[i].length; j++) {
                    System.out.print(" | " + input[i][j] );
                }
                System.out.println();
                System.out.println("-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
            }
        }
    }

}
