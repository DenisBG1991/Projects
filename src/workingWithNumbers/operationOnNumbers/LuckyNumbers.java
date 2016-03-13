package workingWithNumbers.operationOnNumbers;

public class LuckyNumbers {
    private Integer[] massive;

    public  LuckyNumbers(Integer[] mas){
        this.massive=mas;
    }

    public void luckyNumbers(){
        String name;
        StringBuilder builder = new StringBuilder("Счастливые числа: ");
        for (Integer el : massive){
            name =el.toString();
            if(name.length()==4 && name.charAt(0)+name.charAt(1)==name.charAt(2)+name.charAt(3)){
                builder.append(name).append(";");
            }
        }
        System.out.println(builder);
    }
}
