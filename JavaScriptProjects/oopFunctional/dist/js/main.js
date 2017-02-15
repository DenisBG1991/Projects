$(document).ready(function () {
   let set = new Set({name: "Denis", age: 25}, [4, 8, 15, 16, 23, 42], "Spain is the best country!!");
   console.log(set.size());
   set.foreach(console.log);
   set.add(function hi() {
       alert("Hi");
   });
   console.log(set.size());
   set.foreach(console.log);
   console.log("===============================================");
   let Coin = enumeration({Penny: 1, Nickel: 5, Dime: 10, Quarter: 25});
   let c = Coin.Dime;
   console.log(c instanceof Coin);
   console.log(c.constructor == Coin);
   console.log(Coin.Quarter + 3*Coin.Nickel);
   console.log(Coin.Dime == 10);
   console.log(Coin.Nickel > Coin.Penny);
   console.log(String(Coin.Dime) + ": " + Coin.Dime);
});
