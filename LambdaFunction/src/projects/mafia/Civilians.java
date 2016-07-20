package projects.mafia;

public class Civilians implements Town{

    public void civiliansOn(){
        System.out.println("Мирные жители просыпаются");
    }

    @Override
    public void townOn(Object sender) {
        civiliansOn();
    }
}
