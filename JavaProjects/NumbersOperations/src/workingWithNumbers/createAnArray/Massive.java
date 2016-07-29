package workingWithNumbers.createAnArray;

import java.util.Scanner;

public class Massive {
    private Integer[]massiv;
    private int size;

    public Massive(int n){
        if(n>0){
            this.size=n;
        }else {
            System.out.println("отрицательный размер массива");
        }
    }

    public void scannerMassive(){
        Integer[] mas = new Integer[this.size];
        Scanner scan2;
        System.out.println("Заполните ваш массив");
        for (int i=0; i<this.size; i++){
            scan2 = new Scanner(System.in);
            mas[i]=scan2.nextInt();
        }
        setMassiv(mas);
    }

    public void setSize(int n){
        this.size=n;
    }

    public void setMassiv(Integer[] array){
        this.massiv=array;
    }

    public int getSize() {
        return this.size;
    }

    public Integer[] getMassiv(){
        return this.massiv;
    }
}
