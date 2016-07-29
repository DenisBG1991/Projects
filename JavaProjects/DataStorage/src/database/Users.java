package database;

import java.io.Serializable;

public class Users implements Serializable{

    private Storage storage;
    //Необходимо организовать класс Storage с конкретными полями и поддерживающий сериализацию//
    private Integer id;
    private static final long serialVersionID = 1L;

    public Users(Storage _storage, Integer _id){
        setId(_id);
        setStorage(_storage);
    }
    public  Users(Integer _id){
        this.id=_id;
    }

    public Storage getStorage() {
        return storage;
    }

    public void setStorage(Storage storage) {
        this.storage = storage;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        if (id > 0){
            this.id = id;
        }
    }
}
