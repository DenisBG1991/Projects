package workingWithMatrix.operationWithMatrix;

public class OrderingMatrix {

    private int sizeMatrixByOrdering;
    private Integer[][] matrixByOrdering;

    public OrderingMatrix(int sizeMatrixByOrder, Integer[][] matrixByOrder){
        this.sizeMatrixByOrdering=sizeMatrixByOrder;
        this.matrixByOrdering=matrixByOrder;
    }

    public void orderingMatrix(){
        Integer[] controllMatrix = new Integer[sizeMatrixByOrdering * sizeMatrixByOrdering];
        int m=0;
        for (Integer[] aMatrix : matrixByOrdering) {
            for (int j = 0; j < matrixByOrdering[0].length; j++) {
                controllMatrix[m] = aMatrix[j];
                m++;
            }
        }
        boolean target = true;
        int temp;
        int k=0;
        while (target){
            target=false;
            k++;
            for (int p = 0; p<controllMatrix.length-k;p++){
                if(controllMatrix[p]>controllMatrix[p+1]){
                    temp=controllMatrix[p];
                    controllMatrix[p]=controllMatrix[p+1];
                    controllMatrix[p+1]=temp;
                    target=true;
                }
            }
        }
        int s=0;
        for(int i = 0; i<matrixByOrdering.length; i++){
            for(int j = 0; j<matrixByOrdering[0].length; j++){
                matrixByOrdering[i][j]=controllMatrix[s];
                s++;
            }
        }
        setMatrixByOrdering(matrixByOrdering);
    }

    public int getSizeMatrixByOrdering() {
        return sizeMatrixByOrdering;
    }

    public void setSizeMatrixByOrdering(int sizeMatrixByOrdering) {
        this.sizeMatrixByOrdering = sizeMatrixByOrdering;
    }

    public Integer[][] getMatrixByOrdering() {
        return matrixByOrdering;
    }

    public void setMatrixByOrdering(Integer[][] matrixByOrdering) {
        this.matrixByOrdering = matrixByOrdering;
    }
}
