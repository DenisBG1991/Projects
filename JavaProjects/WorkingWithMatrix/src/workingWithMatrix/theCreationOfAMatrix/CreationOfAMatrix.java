package workingWithMatrix.theCreationOfAMatrix;

import java.util.Scanner;

public class CreationOfAMatrix implements Cloneable{

    private int sizeMatrix;
    private Integer[][] matrix;

    public CreationOfAMatrix(){
    }

    public void sizeMatrixs(){
        System.out.println("Задайте размер n матрицы nxn:");
        Scanner scanner;
        scanner = new Scanner(System.in);
        setSizeMatrix(scanner.nextInt());
    }

    public void creationOfAMatrix(int n){
        Integer[][] matr = new Integer[n][n];
        for (int i=0; i<matr.length; i++){
            for(int j=0; j<matr.length; j++){
                matr[i][j]= (int)(Math.random()*1000)-500;
            }
        }
        setMatrix(matr);
    }

    public int getSizeMatrix() {
        return sizeMatrix;
    }

    public void setSizeMatrix(int sizeMatrix) {
        this.sizeMatrix = sizeMatrix;
    }

    public Integer[][] getMatrix() {
        return matrix;
    }

    public void setMatrix(Integer[][] matrix) {
        this.matrix = matrix;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
