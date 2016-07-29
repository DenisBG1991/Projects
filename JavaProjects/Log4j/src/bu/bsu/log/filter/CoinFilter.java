package bu.bsu.log.filter;
import org.apache.log4j.spi.Filter;
import org.apache.log4j.spi.LoggingEvent;
import bu.bsu.log.entity.Coin;
/**
 * Created by Денис on 01.02.2016.
 */
public class CoinFilter extends Filter{
    public int deside(LoggingEvent event){
        int result = Filter.NEUTRAL;
        Object object = event.getMassage();
        if (object instanceof Coin){
            Coin coin =(Coin) object;
            int id = coin.getId();
            result = id < 1_000 ? Filter.DENY : Filter.ACCEPT;
        }
        return result;
    }
}
