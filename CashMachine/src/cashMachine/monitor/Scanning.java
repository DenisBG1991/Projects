package cashMachine.monitor;

import cashMachine.operations.Operations;
import cashMachine.score.Count;
import java.util.Scanner;

public class Scanning {

    public  void scanning(){
        Count count = new Count(0);
        String command;
        do{
            StringBuilder builder = new StringBuilder("Введите пожалуйста команду в формате: " + "\n");
            builder.append("PUT<D><count>= - пополнение счета банкомата на D единиц в размере count штук." + "\n");
            builder.append("GET<amount> - вывод суммы в размере amount единиц." + "\n");
            builder.append("DUMP - вывод балланса банкомата по номиналу купюр." + "\n");
            builder.append("STATE - вывод балланса банкомата." + "\n");
            builder.append("QUIT - завершение работы с банкоматом." + "\n");
            System.out.println(builder);

            Scanner scanner = new Scanner(System.in);
            String command1 = scanner.next();
            String [] command2 = command1.split("<");
            command = command2[0];
            Operations operations = new Operations(command1);
            switch (command){
                case "PUT" : {
                    operations.put(count);
                    break;
                }
                case "GET" : {
                    operations.get(count);
                    break;
                }
                case "DUMP" : {
                    operations.dump(count);
                    break;
                }
                case "STATE" : {
                    operations.state(count);
                    break;
                }
                case "QUIT" : {
                    command = "QUIT";
                    break;
                }
                default: System.out.println("Введите операцию корректно!");

            }
            System.out.println("--------------------------------------------------");
        }while (!command.equals("QUIT"));
        System.out.println("Работа с банкоматом закончена!");
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
