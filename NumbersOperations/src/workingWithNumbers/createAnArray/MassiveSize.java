package workingWithNumbers.createAnArray;

import java.util.Scanner;

public class MassiveSize {
    private int sizeOne;

    public MassiveSize(){
    }

    public void scannerSize(){
        System.out.println("Введите размер массива");
        Scanner scan1 = new Scanner(System.in);
        this.sizeOne=scan1.nextInt();
    }

    public int getSizeOne(){
        return this.sizeOne;
    }
}
