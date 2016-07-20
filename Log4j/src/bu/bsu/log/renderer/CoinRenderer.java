package bu.bsu.log.renderer;
import org.apache.log4j.or.ObjectRenderer;
import bu.bsu.log.entity.Coin;
/**
 * Created by Денис on 01.02.2016.
 */
public class CoinRenderer implements ObjectRenderer{
    public String doRender(Object obj){
        StringBuilder builder = new StringBuilder(32);
        if (obj instanceof Coin){
            Coin coin = (Coin) obj;
            String currency = coin.getCurrencyName();
            int id = coin.getId();
            int value = coin.getValue();
            builder.append(id + ": " + value + "(" + currency + ")");
        }
        return builder.toString();
    }
}
