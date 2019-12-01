/*
Создайте скрипт кассира, который получает список продуктов и деньги, подсчитывает общую стоимость продуктов, и в зависимости от того хватает денег или нет, 
уведомляет покупателя о результате.
*/

/* Есть база данных товаров, в формате "имя-товара":"цена за одну единицу" */


/* 
Необходимо создать функцию-конструктор Cashier. Поля будущего объекта кассира (🔔 объявляются как this.имя_поля в конструкторе): 
    - name - строка, имя кассира, передается при вызове конструктора
    - productsDatabase - объект база данных продуктов, передается при вызове конструктора
    - totalPrice - число, общая стоимость покупок текущего покупателя, всегда начинается с 0 
    - customerMoney - число, сумма введенная пользователем при запросе денег, всегда начинается с 0 
    - changeAmount - число, сдача, всегда начинается с 0
    - greet() - метод, выводит в консоль строку `Здравствуйте, вас обслуживает ${имя_кассира}`
    - onSuccess() - метод, выводит в консоль строку `Спасибо за покупку, ваша сдача ${сдача}` если сдача больше 0, и строку `Спасибо за покупку` если сдача 
    равна 0.
    - onError() - метод, выводит в консоль строку 'Очень жаль, вам не хватает денег на покупки'    
    - countTotalPrice(order) - метод, получает список покупок, считает общую стоимость исходя из поля productsDatabase. Записывает результат в поле 
    totalPrice.
    - getCustomerMoney(value) - метод, получает число - деньги покупателя и записывает его в поле customerMoney
    - countChange() - метод, считает сдачу, разницу между общей суммой покупок и деньгами покупателя, записывает результат в поле changeAmount.
        * Обязательно проверьте что customerMoney не меньше чем значение поля totalPrice
        * Если денег было передано достаточно, возвращает текущее значение changeAmount
        * Если было передано меньше денег чем в поле totalPrice, возвращает null 
    - reset() - метод, сбрасывает поля totalPrice, customerMoney и changeAmount в 0.
*/


const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40
};

class Cashier {
  constructor(name, productsDatabase){
      this.name = name;
      this.productsDatabase = productsDatabase;
      this.totalPrice = 0;
      this.customerMoney = 0;
      this.changeAmount = 0;
  }

  greet(){
      console.log(`Здравствуйте, вас обслуживает ${this.name}`);
  }
  onSuccess() {
      if (this.changeAmount > 0) {
          console.log(`Спасибо за покупку, ваша сдача ${this.changeAmount}`);
      } else if (this.changeAmount = 0) {
          console.log(`Спасибо за покупку!`);
      } else {
          this.onError();
      }
  }

  onError(){
      console.log( "Очень жаль, вам не хватает денег на покупки" );
  }

  countTotalPrice(order){

      for (let item of Object.values(order)) {
        this.totalPrice += item;
      }
      return this.totalPrice;
  }

  getCustomerMoney(value){
      this.customerMoney = value;
  }

  countChange(){
      if (this.customerMoney > this.totalPrice) {
          this.changeAmount = this.customerMoney - this.totalPrice;
      } else if (this.customerMoney = this.totalPrice){
          this.changeAmount = 0;
      } else {
          this.changeAmount = null;
      }
  }

  reset(){
      this.totalPrice = 0;
      this.customerMoney = 0;
      this.changeAmount = 0;
  }

  tranaction(){
      this.greet();
      this.getCustomerMoney(value);
      this.countTotalPrice(order);
      this.countChange();
      this.onSuccess();
      this.reset();
  }

}

const value = 500;
const order = { bread: 2, milk: 2, apples: 1, cheese: 1 };
const vasya = new Cashier("Vasya", products);
const anna = new Cashier("Anna", products);

console.log(vasya.tranaction());