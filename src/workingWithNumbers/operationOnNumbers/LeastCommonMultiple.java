package workingWithNumbers.operationOnNumbers;

public class LeastCommonMultiple {
    private int leastCommonMultiple;
    private Integer[] massive;

    public LeastCommonMultiple(Integer[] mas){
        this.massive=mas;
    }

    public void leastCommonMultiples(){
        int result = 0;
        result = Math.abs(this.massive[0]);
        OUT: for(int i = 1; i < massive.length; i++){
            if (massive[i] == 0 || massive[0] == 0) {
                result = 0;
                break OUT;
            }
            result = findLeast(result, Math.abs(massive[i]));
        }
        setLeastCommonMultiple(result);
        System.out.println("Наименьшее общее кратное : " + getLeastCommonMultiple());
    }

    public int findLeast (int a, int b){
        GreatestCommonDivisor.FindGreatestCommonDivisor findGreatestCommonDivisors =
                new GreatestCommonDivisor().new FindGreatestCommonDivisor();
        return a*(b/findGreatestCommonDivisors.findDivisor(a,b));
    }

    public void setLeastCommonMultiple(int leastCommonMultiple) {
        this.leastCommonMultiple = leastCommonMultiple;
    }

    public int getLeastCommonMultiple() {
        return leastCommonMultiple;
    }
}
