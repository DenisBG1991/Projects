package cashMachine.operations;

import cashMachine.score.Count;

public class Operations {

    final Integer ONE = 1;
    final Integer THREE = 3;
    final Integer FIVE = 5;
    final Integer TEN = 10;
    final Integer TWENTYFIVE = 25;
    final Integer FIFTY = 50;
    final Integer HUNDRED = 100;
    final Integer FIVEHUNDRED = 500;
    final Integer ONETHOUSAND = 1000;
    final Integer FIVETHOUSAND = 5000;
    int quantityOne;
    int quantityThree;
    int quantityFive;
    int quantityTen;
    int quantityTwentyfive;
    int quantityFifty;
    int quantityHundred;
    int quantityFivehundred;
    int quantityOnethousand;
    int quantityFivethousand;
    private String command;

    public Operations(String commands){
        this.command=commands;
    }

    public Count put(Count count){
        String [] command3 = command.split("><");
        Integer a = Integer.parseInt(command3[0].substring(command3[0].indexOf('<')+1));
        Integer b = Integer.parseInt(command3[1].substring(0, command3[1].indexOf('>')));
        count.setAmount(count.getAmount()+a*b);
        System.out.println(command);
        System.out.println("Всего пополнено: " + a*b);
        return count;
    }

    public Count get (Count count){
        Integer summ = Integer.parseInt(command.substring(command.indexOf('<')+1, command.indexOf('>')));
        if (summ<=count.getAmount()){
            setQuantityFivethousand((int) Math.floor (summ /FIVETHOUSAND));
            int ost1 = summ %FIVETHOUSAND;

            setQuantityOnethousand((int) Math.floor (ost1/ONETHOUSAND));
            int ost2 = ost1%ONETHOUSAND;

            setQuantityFivehundred((int) Math.floor (ost2/FIVEHUNDRED));
            int ost3 = ost2%FIVEHUNDRED;

            setQuantityHundred((int) Math.floor (ost3/HUNDRED));
            int ost4 = ost3%HUNDRED;

            setQuantityFifty((int) Math.floor (ost4/FIFTY));
            int ost5 = ost4%FIFTY;

            setQuantityTwentyfive((int) Math.floor (ost5/TWENTYFIVE));
            int ost6 = ost5%TWENTYFIVE;

            setQuantityTen((int) Math.floor (ost6/TEN));
            int ost7 = ost6%TEN;

            setQuantityFive((int) Math.floor (ost7/FIVE));
            int ost8 = ost7%FIVE;

            setQuantityThree((int) Math.floor (ost8/THREE));
            int ost9 = ost8%THREE;

            setQuantityOne((int) Math.floor (ost9/ONE));

            count.setAmount(count.getAmount()- summ);
            System.out.println(command);
            System.out.println("Вывод: " + FIVETHOUSAND + "=" + getQuantityFivethousand() + ", "
                    + ONETHOUSAND + "=" + getQuantityOnethousand() + ", " + FIVEHUNDRED + "=" +
                    getQuantityFivehundred() + ", " + HUNDRED + "=" + getQuantityHundred() + ", " +
                    FIFTY + "=" + getQuantityFifty() + ", " + TWENTYFIVE + "=" + getQuantityTwentyfive() + ", "
                    + TEN + "=" + getQuantityTen() + ", " + FIVE + "=" + getQuantityFive() + ", " +
                    THREE + "=" + getQuantityThree() + ", " + ONE + "=" + getQuantityOne() + ", всего: " + summ);
            return count;
        }else {
            Integer residue;
            residue = summ-count.getAmount();
            System.out.println("Вы пытаетесь снять сумму, превосходящую суммы в наличии! " +
                    "Будет снята сумма без " + residue + " единиц.");
            Integer sum2 = count.getAmount();
            setQuantityFivethousand((int) Math.floor (sum2/FIVETHOUSAND));
            int ost1 = sum2%FIVETHOUSAND;

            setQuantityOnethousand((int) Math.floor (ost1/ONETHOUSAND));
            int ost2 = ost1%ONETHOUSAND;

            setQuantityFivehundred((int) Math.floor (ost2/FIVEHUNDRED));
            int ost3 = ost2%FIVEHUNDRED;

            setQuantityHundred((int) Math.floor (ost3/HUNDRED));
            int ost4 = ost3%HUNDRED;

            setQuantityFifty((int) Math.floor (ost4/FIFTY));
            int ost5 = ost4%FIFTY;

            setQuantityTwentyfive((int) Math.floor (ost5/TWENTYFIVE));
            int ost6 = ost5%TWENTYFIVE;

            setQuantityTen((int) Math.floor (ost6/TEN));
            int ost7 = ost6%TEN;

            setQuantityFive((int) Math.floor (ost7/FIVE));
            int ost8 = ost7%FIVE;

            setQuantityThree((int) Math.floor (ost8/THREE));
            int ost9 = ost8%THREE;

            setQuantityOne((int) Math.floor (ost9/ONE));

            count.setAmount(count.getAmount()-sum2);
            System.out.println(command);
            System.out.println("Вывод: " + FIVETHOUSAND + "=" + getQuantityFivethousand() + ", "
                    + ONETHOUSAND + "=" + getQuantityOnethousand() + ", " + FIVEHUNDRED + "=" +
                    getQuantityFivehundred() + ", " + HUNDRED + "=" + getQuantityHundred() + ", " +
                    FIFTY + "=" + getQuantityFifty() + ", " + TWENTYFIVE + "=" + getQuantityTwentyfive() + ", "
                    + TEN + "=" + getQuantityTen() + ", " + FIVE + "=" + getQuantityFive() + ", " +
                    THREE + "=" + getQuantityThree() + ", " + ONE + "=" + getQuantityOne() + ", всего: " + sum2);
            return count;
        }
    }

    public Count dump(Count count){
        Integer sum = count.getAmount();

        setQuantityFivethousand((int) Math.floor (sum/FIVETHOUSAND));
        int ost1 = sum%FIVETHOUSAND;

        setQuantityOnethousand((int) Math.floor (ost1/ONETHOUSAND));
        int ost2 = ost1%ONETHOUSAND;

        setQuantityFivehundred((int) Math.floor (ost2/FIVEHUNDRED));
        int ost3 = ost2%FIVEHUNDRED;

        setQuantityHundred((int) Math.floor (ost3/HUNDRED));
        int ost4 = ost3%HUNDRED;

        setQuantityFifty((int) Math.floor (ost4/FIFTY));
        int ost5 = ost4%FIFTY;

        setQuantityTwentyfive((int) Math.floor (ost5/TWENTYFIVE));
        int ost6 = ost5%TWENTYFIVE;

        setQuantityTen((int) Math.floor (ost6/TEN));
        int ost7 = ost6%TEN;

        setQuantityFive((int) Math.floor (ost7/FIVE));
        int ost8 = ost7%FIVE;

        setQuantityThree((int) Math.floor (ost8/THREE));
        int ost9 = ost8%THREE;

        setQuantityOne((int) Math.floor (ost9/ONE));

        System.out.println(command);
        System.out.println("Вывод: " + FIVETHOUSAND + "=" + getQuantityFivethousand() + ", "
                + ONETHOUSAND + "=" + getQuantityOnethousand() + ", " + FIVEHUNDRED + "=" +
                getQuantityFivehundred() + ", " + HUNDRED + "=" + getQuantityHundred() + ", " +
                FIFTY + "=" + getQuantityFifty() + ", " + TWENTYFIVE + "=" + getQuantityTwentyfive() + ", "
                + TEN + "=" + getQuantityTen() + ", " + FIVE + "=" + getQuantityFive() + ", " +
                THREE + "=" + getQuantityThree() + ", " + ONE + "=" + getQuantityOne() + ", всего: " + sum);
        return count;
    }

    public Count state(Count count){
        System.out.println(command);
        System.out.println("Всего в банкомате: " + count.getAmount());
        return count;
    }

    public int getQuantityOne() {
        return quantityOne;
    }

    public void setQuantityOne(int quantityOne) {
        this.quantityOne = quantityOne;
    }

    public int getQuantityThree() {
        return quantityThree;
    }

    public void setQuantityThree(int quantityThree) {
        this.quantityThree = quantityThree;
    }

    public int getQuantityFive() {
        return quantityFive;
    }

    public void setQuantityFive(int quantityFive) {
        this.quantityFive = quantityFive;
    }

    public int getQuantityTen() {
        return quantityTen;
    }

    public void setQuantityTen(int quantityTen) {
        this.quantityTen = quantityTen;
    }

    public int getQuantityTwentyfive() {
        return quantityTwentyfive;
    }

    public void setQuantityTwentyfive(int quantityTwentyfive) {
        this.quantityTwentyfive = quantityTwentyfive;
    }

    public int getQuantityFifty() {
        return quantityFifty;
    }

    public void setQuantityFifty(int quantityFifty) {
        this.quantityFifty = quantityFifty;
    }

    public int getQuantityHundred() {
        return quantityHundred;
    }

    public void setQuantityHundred(int quantityHundred) {
        this.quantityHundred = quantityHundred;
    }

    public int getQuantityFivehundred() {
        return quantityFivehundred;
    }

    public void setQuantityFivehundred(int quantityFivehundred) {
        this.quantityFivehundred = quantityFivehundred;
    }

    public int getQuantityOnethousand() {
        return quantityOnethousand;
    }

    public void setQuantityOnethousand(int quantityOnethousand) {
        this.quantityOnethousand = quantityOnethousand;
    }

    public int getQuantityFivethousand() {
        return quantityFivethousand;
    }

    public void setQuantityFivethousand(int quantityFivethousand) {
        this.quantityFivethousand = quantityFivethousand;
    }
}
