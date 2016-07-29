package workingWithNumbers.operationOnNumbers;

public class Primes {
    private Integer[] massive;

    public Primes(Integer[] mas){
        this.massive=mas;
    }

    public void findPrimes(){
        StringBuilder builder;
        builder = new StringBuilder("Простые числа: ");
        for(Integer el : massive){
            if(isPrimeNumber(el)){
                builder.append(el).append(" ; ");
            }
        }
        System.out.println(builder);
    }

    private boolean isPrimeNumber(Integer el){
        boolean prime = true;
        if(el<=1){
            prime = false;
        }
        for (int i = 3; i <= Math.sqrt(el); i += 2) {
            if (el % i == 0) {
                prime = false;
                break;
            }
        }
        return (el>2 && (el%2!=0) && prime)||(el==2);
    }
}
