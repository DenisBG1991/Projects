package workingWithNumbers.operationOnNumbers;

public class GreatestCommonDivisor {
    private int greatestCommonDivisor;
    private Integer[] massive;

    public GreatestCommonDivisor(){
    }
    public GreatestCommonDivisor(Integer[] mas){
        this.massive=mas;
    }

    public void gretestCommonDivisions(){
        int result;
        result = Math.abs(this.massive[0]);
        for (int i = 1; i < massive.length; i++) {
            if (massive[i] == 0 || massive[0] == 0) {
                result = 1;
                break;
            }
            FindGreatestCommonDivisor findGreatestCommonDivisors = new FindGreatestCommonDivisor();
            result = findGreatestCommonDivisors.findDivisor(result, Math.abs(this.massive[i]));
        }
        setGreatestCommonDivisor(result);
        System.out.println("Наибольший общий делитель : " + getGreatestCommonDivisor());
    }

    public void setGreatestCommonDivisor(int value){
        this.greatestCommonDivisor=value;
    }

    public int getGreatestCommonDivisor(){
        return greatestCommonDivisor;
    }

    class FindGreatestCommonDivisor {
        private int divisor;
        public int getDivisor() {
            return divisor;
        }
        public void setDivisor(int divisor) {
            this.divisor = divisor;
        }
        public int findDivisor(int a, int b) {
            while (b>0){
                int temp = b;
                b = a % b;
                a = temp;
            }
            setDivisor(a);
            return getDivisor();
        }
    }
}
