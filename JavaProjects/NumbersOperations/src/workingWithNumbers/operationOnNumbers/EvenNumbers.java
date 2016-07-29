package workingWithNumbers.operationOnNumbers;

public class EvenNumbers {
    private Integer[] massive;

    public EvenNumbers(Integer[] mas){
        this.massive=mas;
    }

    public void evenNumbers(){
        StringBuilder builder1;
        StringBuilder builder2;
        builder1 = new StringBuilder("Четные числа: ");
        builder2 = new StringBuilder("Нечетные числа: ");
        for (Integer el : this.massive){
            int i = el % 2;
            if(i ==0){
                builder1.append(el).append("; ");
            }else builder2.append(el).append("; ");
        }
        System.out.println(builder1);
        System.out.println(builder2);
    }
}
