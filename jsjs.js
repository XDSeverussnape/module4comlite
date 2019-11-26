const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40
};

function Cashier(name, productsDatabase) {
  // 🔔 не забывайте о this при обращении к свойствам и методам будущего объекта
  this.name = name;
  this.productsDatabase = productsDatabase;
  this.totalPrice = 0;
  this.customerMoney = 0;
  this.changeAmount = 0;
  /* Создадим методы, необходимые для рассчетов при обслуживании */
  this.countTotalPrice = function(order) {
    for (let item in order) {
      this.totalPrice += order[item] * this.productsDatabase[item];
    }
    return this.totalPrice;
  };
  this.getCustomerMoney = function(value) {
    this.customerMoney = value;
  };
  this.countChange = function() {
    if (this.totalPrice > this.customerMoney) {
      return null;
    }
    this.changeAmount = this.customerMoney - this.totalPrice;
    return this.changeAmount;
  };
  this.reset = function() {
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;
  };
  /* Функция трансакции - обслуживание кассиром очередного покупателя. */
  this.tranaction = function(order, money) {
    /* Создадим методы, выдоющие сообщения при обслуживании */
    const greet = function(obj) {
      console.log(`Здравствуйте, вас обслуживает ${obj.name}`);
      return obj.name;
    };
    const onSuccess = function(obj) {
      if (obj.changeAmount > 0) {
        console.log(`Спасибо за покупку, ваша сдача ${obj.changeAmount}`);
      }
      if (obj.changeAmount === 0) {
        console.log("Спасибо за покупку");
      }
      return obj.changeAmount;
    };
    const onError = function() {
      console.log("Очень жаль, вам не хватает денег на покупки");
    };
    /* Производим обслуживание */
    console.log("кассир,", this.name); // Имя кассира
    console.log(
      `for start - totalPrice = ${this.totalPrice}, customerMoney = ${
        this.customerMoney
      }, changeAmount = ${this.changeAmount}`
    ); // 0, 0, 0
    greet(this); // Здравствуйте, вас обслуживает кассир ...
    console.log("Заказ: ", order); // Очередной заказ
    this.countTotalPrice(order);
    console.log("на общую сумму: ", this.totalPrice); // Проверям что посчитали
    this.getCustomerMoney(money);
    console.log("с покупателя получили: ", this.customerMoney); // Проверяем что в поле с деньгами пользователя
    const result = this.countChange();
    console.log("сдачи: ", result); // Проверяем что нам вернул countChange
    if (result !== null) {
      onSuccess(this);
    } else {
      // Спасибо за покупку, ваша сдача ..., При успешном обслуживании, onSuccess.
      onError();
    } // Очень жаль, вам не хватает денег на покупки, При неудачном обслуживании, onError
    this.reset();
    console.log(
      `after reset - totalPrice = ${this.totalPrice}, customerMoney = ${
        this.customerMoney
      }, changeAmount = ${this.changeAmount}`
    ); // 0, 0, 0
    return result;
  };
}

/* Заказ пользователя хранится в виде объекта следующего формата. "имя-продукта":"количество-единиц" */
const order1 = { bread: 2, milk: 2, apples: 1, cheese: 1 };
const order2 = { bread: 1, milk: 1, apples: 1, chicken: 2, cheese: 2 };
const order3 = { bread: 3, apples: 5, cheese: 1 };
const order4 = { milk: 3, apples: 4, chicken: 1, cheese: 3 };
const order5 = { bread: 2, milk: 2, cheese: 1 };
/* Создадим пару кассиров */
const vasya = new Cashier("Vasya", products);
const anna = new Cashier("Anna", products);

/* Пример использования */
console.log("Прайс: ", products); // ссылка на базу данных продуктов (объект products)

console.group(1);
vasya.tranaction(order1, 300);
console.groupEnd(1);

console.group(2);
vasya.tranaction(order2, 600);
console.groupEnd(2);

console.group(3);
anna.tranaction(order3, 200);
console.groupEnd(3);

console.group(4);
anna.tranaction(order4, 500);
console.groupEnd(4);

console.group(5);
vasya.tranaction(order5, 650);
console.groupEnd(5);





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

}
const order = { bread: 2, milk: 2, apples: 1, cheese: 1 };
const vasya = new Cashier("Vasya", products);
const anna = new Cashier("Anna", products);

console.log(vasya);