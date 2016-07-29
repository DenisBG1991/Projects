package projects.mafia;

import java.util.ArrayList;
import java.util.List;

public class ChangeTheTimeOfDay {

    private List<Town> towns = new ArrayList<>();

    public void addTowns(Town town){
        towns.add(town);
    }

    public void removeTowns(Town town){
        towns.remove(town);
    }

    public void dayOn(){
        System.out.println("Начался новый день!");
        for (Town t: towns){
            t.townOn(this);
        }
    }
}
