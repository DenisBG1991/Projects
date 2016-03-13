package workingWithNumbers.operationOnNumbers;

public class NumbersOfHalfSumOfNeighbors {
    private Integer[] massive;

    public NumbersOfHalfSumOfNeighbors(Integer[] mas){
        this.massive=mas;
    }

    public void numbersOfHalfSumOfNeighbors(){
        StringBuilder builder;
        builder = new StringBuilder("Элементы, которые равны полусумме соседних элементов: ");
        for (int i=1; i<massive.length-1;i++){
            if(massive.length<3){
                break;
            }else {
                if (massive[i]==(massive[i-1]+massive[i+1])/2){
                    builder.append(massive[i]).append(";");
                }
            }
        }
        System.out.println(builder);
    }
}
