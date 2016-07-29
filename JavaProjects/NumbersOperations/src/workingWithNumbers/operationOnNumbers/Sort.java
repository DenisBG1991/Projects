package workingWithNumbers.operationOnNumbers;

public class Sort {
    private Integer[] massive;

    public Sort(Integer[] mas){
        this.massive=mas;
    }

    public void sortinUp (){
        Integer[] result = massive.clone();
        boolean target = true;
        int j = 0;
        int temp;
        while (target){
            target = false;
            j++;
            for (int i=0; i<result.length-j; i++){
                if(result[i]>result[i+1]){
                    temp=result[i];
                    result[i]=result[i+1];
                    result[i+1]=temp;
                    target=true;
                }
            }
        }
        System.out.print("Сортировка по возрастанию: ");
        for (Integer el : result){
            System.out.print(el + " | ");
        }
    }

    public void sortinDown (){
        Integer[] result = massive.clone();
        boolean target = true;
        int j = 0;
        int temp;
        while (target){
            target = false;
            j++;
            for (int i=0; i<result.length-j; i++){
                if(result[i]<result[i+1]){
                    temp=result[i];
                    result[i]=result[i+1];
                    result[i+1]=temp;
                    target=true;
                }
            }
        }
        System.out.print("Сортировка по убыванию: ");
        for (Integer el : result){
            System.out.print(el + " | ");
        }
    }

}
