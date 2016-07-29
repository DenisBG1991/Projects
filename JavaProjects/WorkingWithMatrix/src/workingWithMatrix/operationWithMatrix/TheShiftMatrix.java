package workingWithMatrix.operationWithMatrix;

import workingWithMatrix.PrintMatrix;
import java.util.Scanner;

public class TheShiftMatrix {
    private Integer[][] matrix;
    private  int sizeMatrix;

    public TheShiftMatrix(int size, Integer[][] matr){
        this.sizeMatrix=size;
        this.matrix=matr;
    }

    public void shiftMatrix(){
        System.out.println("Введине направление здвига (верх/низ/право/лево)");
        Scanner scann = new Scanner(System.in);
        String direction = scann.next();
        int k = shiftValue(direction);
        scann.close();
        switch (direction){
            case ("лево"):{
                shiftOnLeft(k);
                break;
            }
            case ("право"):{
                shiftOnRight(k);
                break;
            }
            case ("верх"):{

                break;
            }
            case ("низ"):{

                break;
            }default: System.out.println("Неверное направление");
        }
    }

    private int shiftValue(String name){
        System.out.println("Введите величину здвига на " + name + ":");
        Scanner scan = new Scanner(System.in);
        return scan.nextInt();
    }

    private  void shiftOnRight(int k){
        Integer[][] clon =matrix.clone();
        for (int i = 0; i < clon.length; i++){
            int m = 0;
            while (m<k){
                int temp = clon[i][0];
                for (int j = 0; j<clon[0].length-1; j++){
                    int c = temp;
                    temp = clon[i][j+1];
                    clon[i][j+1]=c;
                }
                clon[i][0]=temp;
                m++;
            }
        }
        setMatrix(clon);
    }

    private  void shiftOnLeft(int k){
        Integer[][] clon =matrix.clone();
        for (int i = 0; i < clon.length; i++){
            int m = 0;
            while (m<k){
                int temp = clon[i][clon[0].length-1];
                for (int j=clon[0].length-1; j>0; j--){
                    int c = temp;
                    temp = clon[i][j-1];
                    clon[i][j-1]=c;
                }
                clon[i][clon[0].length-1]=temp;
                m++;
            }
        }
        setMatrix(clon);
    }

    public void setMatrix(Integer[][] mtr){
        this.matrix=mtr;
    }
    public Integer[][] getMatrix(){
        return this.matrix;
    }
}
