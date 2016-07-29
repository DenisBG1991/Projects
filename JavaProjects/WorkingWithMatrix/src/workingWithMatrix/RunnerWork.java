package workingWithMatrix;

import workingWithMatrix.theCreationOfAMatrix.CreationOfAMatrix;
import workingWithMatrix.operationWithMatrix.*;

public class RunnerWork {
    public static void main(String[] args){
        CreationOfAMatrix creationOfAMatrix = new CreationOfAMatrix();
        creationOfAMatrix.sizeMatrixs();
        creationOfAMatrix.creationOfAMatrix(creationOfAMatrix.getSizeMatrix());

        CreationOfAMatrix clonMatrix1 = mutation(creationOfAMatrix);

        PrintMatrix printMatrix1 = new PrintMatrix(clonMatrix1.getSizeMatrix(), clonMatrix1.getMatrix());
        printMatrix1.printMatrix();

        CreationOfAMatrix clonMatrix2 = mutation(clonMatrix1);

        OrderingMatrix orderingMatrixs = new OrderingMatrix(clonMatrix2.getSizeMatrix(),clonMatrix2.getMatrix());
        orderingMatrixs.orderingMatrix();
        PrintMatrix printMatrix2 = new PrintMatrix
                (orderingMatrixs.getSizeMatrixByOrdering(),orderingMatrixs.getMatrixByOrdering());
        printMatrix2.printMatrix();

        PrintMatrix printMatrix3 = new PrintMatrix(creationOfAMatrix.getSizeMatrix(), creationOfAMatrix.getMatrix());
        printMatrix3.printMatrix();


        /*TheShiftMatrix theShiftMatrix = new TheShiftMatrix(size, matriz);
        theShiftMatrix.shiftMatrix();
        PrintMatrix printMatrix4 = new PrintMatrix(creationOfAMatrix.getSizeMatrix(),theShiftMatrix.getMatrix());
        printMatrix4.printMatrix();*/

    }

    public static CreationOfAMatrix mutation(CreationOfAMatrix mtr){
        try {
            mtr=(CreationOfAMatrix)mtr.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return mtr;
    }
}
