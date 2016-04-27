// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

    var log_file = 'log.txt';

// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { module: {}, console: console, setTimeout: setTimeout, setInterval: setInterval, util: util, require: requireWrap };
context.global = context;

context.console.logEx = context.console.log;
context.console.log = function (s) {
    var str = createMessage(s);
    console.logEx(str);
    fs.appendFile(log_file, str + '\n');
};

function createMessage(s) {
    return process.argv[1].substring(process.argv[1].lastIndexOf('\\') + 1, process.argv[1].length) + "  " + new Date().toDateString() + "  " + s;
}


function requireWrap(rq) {
    var str = createMessage(rq);
    fs.appendFile(log_file, str + '\n');
    return require(rq);
}

for (var i = 2; i < process.argv.length; i++) {

    var sandbox = vm.createContext(context);

    // Читаем исходный код приложения из файла
    var fileName = './' + process.argv[i];
    fs.readFile(fileName, function (err, src) {
        // Тут нужно обработать ошибки
        if (err) {
            console.log("File not found");
        } else {
            // Запускаем код приложения в песочнице
            var script = vm.createScript(src, fileName);
            script.runInNewContext(sandbox);

            var s = sandbox.module.exports;
            s.doSomething();

            var s1 = s.variableName.prop1;
             var s2 = s.variableName.prop2;
             console.log(typeof s1 + "  " + s1);
             console.log(typeof s2 + "  " + s2);
              s.sum(2, 3);
            
            var str = s.sum.toString();
            console.log('function parameters: ' + str.substring(str.indexOf('(') + 1, str.indexOf(')')));
            // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
            // сохранить в кеш, вывести на экран исходный код приложения и т.д.
        }
    });
}