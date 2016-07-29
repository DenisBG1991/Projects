package projects.mafia;

public class Sheriff implements Town{

    public void sheriffOn(){
        System.out.println("Шириф просыпается");
    }

    @Override
    public void townOn(Object sender) {
        sheriffOn();
    }
}
