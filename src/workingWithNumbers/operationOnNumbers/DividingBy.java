package workingWithNumbers.operationOnNumbers;

public class DividingBy {
    private Integer[] massive;
    private int divider;

    public DividingBy(int div,Integer[] mas){
        this.divider=div;
        this.massive=mas;
    }

    public void dividingBy(){
        StringBuilder builder1;
        builder1 = new StringBuilder("Числа которые делятся на " + this.divider+ " : ");
        for (Integer el : this.massive){
            int i = el % this.divider;
            if(i ==0) {
                builder1.append(el).append("; ");
            }
        }
        System.out.println(builder1);
    }

    public void setDivider(int div){
        this.divider=div;
    }

    public int getDivider(){
        return divider;
    }
}
