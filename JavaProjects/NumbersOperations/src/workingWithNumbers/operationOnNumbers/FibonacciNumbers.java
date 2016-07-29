package workingWithNumbers.operationOnNumbers;

public class FibonacciNumbers {
    private Integer[] massive;

    public FibonacciNumbers(Integer[] mas){
        this.massive=mas;
    }

    public void fibonacciNumbers(){
        StringBuilder builder = new StringBuilder("Числа Фибоначи: ");
        for (int i=0; i<massive.length-2;i++){
            if(massive.length<3){
                break;
            }else{
                if(massive[i+2]==massive[i+1]+massive[i]){
                    builder.append(massive[i+2]).append(";");
                }
            }
        }
        System.out.println(builder);
    }
}
