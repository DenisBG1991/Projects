package projects.mafia;

public class Mafia {

    public static void game(Object sender){
        System.out.println("Game!");
    }

    public static void main(String [] args){

        ChangeTheTimeOfDay changeTheTimeOfDay = new ChangeTheTimeOfDay();
        Civilians civilians = new Civilians();
        Sheriff sheriff = new Sheriff();

        //event subscribe
        changeTheTimeOfDay.addTowns(civilians);
        changeTheTimeOfDay.addTowns(sheriff);
        changeTheTimeOfDay.addTowns(new Town(){

            @Override
            public void townOn(Object sender) {
                System.out.println("Игра началась!!!");
            }
        });
        changeTheTimeOfDay.addTowns(sender -> System.out.println("Game begin!!!"));
        changeTheTimeOfDay.addTowns(s -> Mafia.game(s));
        changeTheTimeOfDay.addTowns(Mafia :: game);


        changeTheTimeOfDay.dayOn();
    }
}
