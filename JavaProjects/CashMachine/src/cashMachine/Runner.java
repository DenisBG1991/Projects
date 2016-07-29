package cashMachine;

import cashMachine.monitor.Scanning;
// Данная программа является макетом и нуждается в некоторой доработке, а именно дописать Exceptions,
// организовать многопоточность, упростить код по максимуму с сохранением данной функциональности,
// продумать кодобесопастность и написать тесты.
public class Runner {
    public static void main (String[] args){
        Scanning scanning = new Scanning();
        scanning.scanning();
    }
}
