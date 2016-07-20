package bu.bsu.log.base;
import java.util.ArrayList;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.apache.log4j.xml.DOMConfigurator;
import bu.bsu.log.entity.Coin;
/**
 * Created by Денис on 01.02.2016.
 */
public class FilterDemoLog {
    static {
        new DOMConfigurator().doConfigure("log4j.xml, LogManager.getLoggerRepository()");
    }
    private static Logger logger = Logger.getLogger(FilterDemoLog.class);
    public static void main(String args[]){
        ArrayList<Coin> list = new ArrayList<Coin>() {
            {
                this.add(new Coin(956, 1, "$"));
                this.add(new Coin(3462, 10, "руб"));
                this.add(new Coin(758, 2, "тенге"));
                this.add(new Coin(2101, 5, "zl"));
            }
        };
        for (Coin coin : list){
            logger.info(coin);
        }
    }
}
