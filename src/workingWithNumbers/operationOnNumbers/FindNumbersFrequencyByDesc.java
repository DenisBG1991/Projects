package workingWithNumbers.operationOnNumbers;

import java.util.*;
import static java.util.Collections.frequency;
import static java.util.Collections.sort;

public class FindNumbersFrequencyByDesc {
    private Integer[] massive;

    public FindNumbersFrequencyByDesc(Integer[] mas){
        this.massive=mas;
    }

    public void findNumbersFrequencyByDesc() {
        Map<Integer, Integer> map = new TreeMap<>();
        for (Integer sourceNumber : massive) {
            map.put(sourceNumber,
                    frequency(Arrays.asList(massive), sourceNumber));
        }
        System.out.println("Числа в порядке убывания частоты встречаемости "
                + "чисел <Число=Встречаемость>: "
                + sortNumbersWithDescByValue(map));
    }

    private static Map<Integer, Integer> sortNumbersWithDescByValue(
            Map<Integer, Integer> map) {
        List<Map.Entry<Integer, Integer>> frequencyList = new LinkedList<>(
                map.entrySet());
        sort(frequencyList, new Comparator<Object>() {
            @SuppressWarnings("unchecked")
            public int compare(Object o1, Object o2) {
                return ((Map.Entry<Integer, Integer>) (o2)).getValue().compareTo(
                        ((Map.Entry<Integer, Integer>) (o1)).getValue());
            }
        });
        Map<Integer, Integer> result = new LinkedHashMap<>();
        for (Map.Entry<Integer, Integer> frequency : frequencyList) {
            result.put(frequency.getKey(), frequency.getValue());
        }
        return result;
    }
}
