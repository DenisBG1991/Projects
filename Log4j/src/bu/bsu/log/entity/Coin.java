package bu.bsu.log.entity;
/**
 * Created by Денис on 01.02.2016.
 */
public class Coin {
    private int id;
    private int value;
    private String currencyName;
    public Coin(){
    }
    public Coin(int id, int value, String currencyName){
        this.id=id;
        this.value=value;
        this.currencyName=currencyName;
    }

    public int getId() {
        return this.id;
    }

    public int getValue() {
        return this.value;
    }

    public String getCurrencyName() {
        return this.currencyName;
    }
}
