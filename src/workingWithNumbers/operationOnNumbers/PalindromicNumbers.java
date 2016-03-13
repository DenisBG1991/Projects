package workingWithNumbers.operationOnNumbers;

public class PalindromicNumbers {
    private Integer[] massive;

    public PalindromicNumbers(Integer[] mas){
        this.massive=mas;
    }

    public void palindromisNumbers(){
        StringBuilder builder;
        StringBuilder builder1;
        builder = new StringBuilder("Числа-палиндромы: ");
        for (Integer el : massive){
            builder1 = new StringBuilder(el.toString());
            if((builder1.toString()).equals(builder1.reverse().toString())){
                builder.append(builder1.toString()).append("; ");
            }
        }
        System.out.println(builder);
    }
}
