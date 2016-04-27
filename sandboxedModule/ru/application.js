// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');


 console.log("is string 'string'? " + util.isString('string'));
 console.log("is null 'string'? " + util.isNull('string'));

 setTimeout(function () { console.log("Hello from setTimeout"); }, 1000);
  
 setInterval(function () { console.log("Hello from setInterval"); }, 1000);







module.exports = { };

module.exports.hello = function () { 
};

module.exports.doSomething = function () {
    console.log('Do something');
};

module.exports.variableName = { prop1: 12, prop2: 'str'};

module.exports.sum = function (a, b) {
    var sum = a + b;
    console.log(a + '+' + b + '=' + sum);
};
