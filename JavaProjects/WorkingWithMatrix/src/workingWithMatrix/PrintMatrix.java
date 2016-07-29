package workingWithMatrix;

public class PrintMatrix {

    private int size;
    private Integer[][] matrix;

    public PrintMatrix(int siz, Integer[][] matr){
        this.size=siz;
        this.matrix=matr;
    }

    public void printMatrix(){
        StringBuilder stringBuilder = new StringBuilder("Полученная матрица " + size + "x" + size + ": " + "\n");
        for (Integer[] aMatrix : matrix) {
            for (int j = 0; j < matrix.length; j++) {
                if (aMatrix[j] <= (-100)) {
                    stringBuilder.append(aMatrix[j] + "  ");
                }
                if (aMatrix[j] <= (-10) && aMatrix[j] > (-100)) {
                    stringBuilder.append(" " + aMatrix[j] + "  ");
                }
                if (aMatrix[j] < 0 && aMatrix[j] > (-10)) {
                    stringBuilder.append("  " + aMatrix[j] + "  ");
                }
                if (aMatrix[j] < 10 && aMatrix[j]>=0) {
                    stringBuilder.append("   " + aMatrix[j] + "  ");
                }
                if (aMatrix[j] >= 10 && aMatrix[j] < 100) {
                    stringBuilder.append("  " + aMatrix[j] + "  ");
                }
                if (aMatrix[j] >= 100) {
                    stringBuilder.append(" " + aMatrix[j] + "  ");
                }
            }
            stringBuilder.append("\n");
        }
        System.out.println(stringBuilder);
    }
}
