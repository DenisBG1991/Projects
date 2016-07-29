package database;

import java.util.HashMap;
import java.util.Map;

public class DataStorage {

    private Integer id;
    private HashMap<Integer,Storage> map;

    public DataStorage(Integer _id){
        this.id=_id;
    }

    public HashMap load(){
        Users user = new Users(id);
        String file = "data\\demo.data";
        Serializator sz = new Serializator();
        boolean b = sz.serialization(user, file);
        map = new HashMap<>(100);
        map.put(id,user.getStorage());
        return map;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public HashMap<Integer, Storage> getMap() {
        return map;
    }

    public void setMap(HashMap<Integer, Storage> map) {
        this.map = map;
    }
}
