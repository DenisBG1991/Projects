package workingWithNumbers;

import workingWithNumbers.createAnArray.Massive;
import workingWithNumbers.createAnArray.MassiveSize;
import workingWithNumbers.operationOnNumbers.*;

public class Runner {
    public static void main(String[] args){
        MassiveSize massive_size = new MassiveSize();
        massive_size.scannerSize();
        System.out.println("Размер массива " + massive_size.getSizeOne());
        Massive massive = new Massive(massive_size.getSizeOne());
        massive.scannerMassive();
        System.out.println("Массив создан");
        for (Integer el : massive.getMassiv()){
            System.out.print(el + " | ");
        }
        System.out.println();
        EvenNumbers evenNumbers = new EvenNumbers(massive.getMassiv());
        evenNumbers.evenNumbers();
        MaxAndMin maxAndMin = new MaxAndMin(massive.getMassiv());
        maxAndMin.maxAndMin();
        DividingBy dividingBy3 = new DividingBy(3, massive.getMassiv());
        dividingBy3.dividingBy();
        DividingBy dividingBy9 = new DividingBy(9, massive.getMassiv());
        dividingBy9.dividingBy();
        DividingBy dividingBy5 = new DividingBy(5, massive.getMassiv());
        dividingBy5.dividingBy();
        DividingBy dividingBy7 = new DividingBy(7, massive.getMassiv());
        dividingBy7.dividingBy();
        OrderingModule orderingModule = new OrderingModule(massive.getMassiv());
        orderingModule.orderingModule();
        System.out.println();
        ThreeDigitNumbers threeDigitNumbers = new ThreeDigitNumbers(massive.getMassiv());
        threeDigitNumbers.treeDigitNumbers();
        GreatestCommonDivisor greatestCommonDivisor = new GreatestCommonDivisor(massive.getMassiv());
        greatestCommonDivisor.gretestCommonDivisions();
        LeastCommonMultiple leastCommonMultiple = new LeastCommonMultiple(massive.getMassiv());
        leastCommonMultiple.leastCommonMultiples();
        Sort sort = new Sort(massive.getMassiv());
        sort.sortinDown();
        System.out.println();
        sort.sortinUp();
        System.out.println();
        Primes primes = new Primes(massive.getMassiv());
        primes.findPrimes();
        LuckyNumbers luckyNumbers = new LuckyNumbers(massive.getMassiv());
        luckyNumbers.luckyNumbers();
        FibonacciNumbers fibonachiNumbers = new FibonacciNumbers(massive.getMassiv());
        fibonachiNumbers.fibonacciNumbers();
        PalindromicNumbers palindromicNumbers = new PalindromicNumbers(massive.getMassiv());
        palindromicNumbers.palindromisNumbers();
        NumbersOfHalfSumOfNeighbors numbersOfHalfSumOfNeighbors = new NumbersOfHalfSumOfNeighbors(massive.getMassiv());
        numbersOfHalfSumOfNeighbors.numbersOfHalfSumOfNeighbors();
        PascalTriangle pascalTriangle = new PascalTriangle(massive.getMassiv());
        pascalTriangle.pascalTriangle();
        FindNumbersFrequencyByDesc findNumbersFrequencyByDescs = new FindNumbersFrequencyByDesc(massive.getMassiv());
        findNumbersFrequencyByDescs.findNumbersFrequencyByDesc();
    }
}
