package workingWithNumbers.operationOnNumbers;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class PascalTriangle {
    private Integer[] massive;

    public PascalTriangle(Integer[] mas){
        this.massive=mas;
    }

    public void pascalTriangle(){
        List<Integer> positiveNumbers = new ArrayList<>();
        Scanner scan = null;
        for(Integer el : massive){
            if(el>0){
                positiveNumbers.add(el);
            }
        }
        for (Integer positiveNumber : positiveNumbers) {
            int posNumber = positiveNumber;
            System.out.println("Сколько строк треугольника вывести для числа " + posNumber + " ?");
            scan = new Scanner(System.in);
            int row = scan.nextInt();
            for (int y = 0; y < row; y++) {
                int c = posNumber;
                for (int j = 0; j < row - y; j++) {
                    System.out.print(" ");
                }
                for (int x = 0; x <= y; x++) {
                    System.out.print(" " + c + " ");
                    c = c * (y - x) / (x + 1);
                }
                System.out.println();
            }
        }
        assert (scan != null) : "CLOSE SCAN!!!";
        scan.close();
    }
}
