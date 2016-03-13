package workingWithNumbers.operationOnNumbers;

public class MaxAndMin {
    private Integer[] massive;

    public MaxAndMin(Integer[] mas){
        this.massive=mas;
    }

    public void maxAndMin(){
        StringBuilder builder1;
        StringBuilder builder2;
        builder1 = new StringBuilder("Максимальное число: ");
        builder2 = new StringBuilder("Минимальное число: ");
        int i = -2147483648;
        int j = 2147483647;
        for (Integer el : this.massive){
            if(el>i) {
                i = el;
            }
            if(el<j){
                j=el;
            }
        }
        builder1.append(i).append(";");
        builder2.append(j).append(";");
        System.out.println(builder1);
        System.out.println(builder2);
    }
}
