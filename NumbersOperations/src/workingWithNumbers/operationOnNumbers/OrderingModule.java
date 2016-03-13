package workingWithNumbers.operationOnNumbers;

public class OrderingModule {
    private Integer[] massive;

    public OrderingModule(Integer[] mas){
        this.massive=mas;
    }

    public void orderingModule (){
        Integer[] result = massive.clone();
        boolean target = true;
        int j = 0;
        int temp;
        while (target){
            target = false;
            j++;
            for (int i=0; i<result.length-j; i++){
                if(Math.abs(result[i])<Math.abs(result[i+1])){
                    temp=result[i];
                    result[i]=result[i+1];
                    result[i+1]=temp;
                    target=true;
                }
            }
        }
        System.out.print("Числа по убыванию модулей: ");
        for (Integer el : result){
            System.out.print(el + " | ");
        }
    }
}
