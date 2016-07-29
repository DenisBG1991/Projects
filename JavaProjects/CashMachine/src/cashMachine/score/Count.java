package cashMachine.score;

public class Count {

    private Integer amount;

    public Count(Integer amounts){
        this.amount=amounts;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amoun) {
        if (amoun >= 0){
            this.amount = amoun;
        }else System.out.println("Введите положительную сумму.");
    }
}
