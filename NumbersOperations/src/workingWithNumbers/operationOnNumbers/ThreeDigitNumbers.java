package workingWithNumbers.operationOnNumbers;

public class ThreeDigitNumbers {
    private Integer[] massive;

    public ThreeDigitNumbers(Integer[] mas){
        this.massive=mas;
    }

    public void treeDigitNumbers(){
        String number;
        StringBuilder builder;
        builder = new StringBuilder("Разноцифровые трехзначные числа: ");
        for (Integer mass : this.massive){
            number=mass.toString();
            if(number.length()==3 && number.charAt(0)!=number.charAt(1)
                    && number.charAt(1)!=number.charAt(2) && number.charAt(0)!=number.charAt(2)){
                builder.append(mass).append(";");
            }
        }
        System.out.println(builder);
    }
}
