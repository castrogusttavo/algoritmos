var PromptSync = require("prompt-sync");
var prompt = PromptSync();
function fibonacciSequence(length) {
    var sequence = [0, 1];
    for (var i = 2; i < length; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence.slice(0, length);
}
function fettuccineSequence(month, day, length) {
    var sequence = [month, day];
    for (var i = 2; i < length; i++) {
        if (i % 2 === 0) {
            sequence.push(sequence[i - 2] - sequence[i - 1]);
        } else {
            sequence.push(sequence[i - 2] + sequence[i - 1]);
        }
    }
    return sequence;
}
function primeNumbersFromAge(age, length) {
    var primes = [];
    var num = age > 1 ? age : 2;
    var isPrime = function (n) {
        for (var i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
            if (n % i === 0) return false;
        }
        return true;
    };
    while (primes.length < length) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }
    return primes;
}
function evenNumbersFromDay(day, length) {
    var start = day % 2 === 0 ? day : day - 1;
    var evens = [];
    while (evens.length < length) {
        evens.push(start);
        start += 2;
    }
    return evens;
}
function oddNumbersFromMonth(month, length) {
    var start = month % 2 === 1 ? month : month + 1;
    var odds = [];
    while (odds.length < length) {
        odds.push(start);
        start += 2;
    }
    return odds;
}
function mainEx1() {
    var idade = 19;
    console.log("Fibonacci:", fibonacciSequence(idade));
    console.log("Fettuccine:", fettuccineSequence(9, 28, idade));
    console.log("Primos:", primeNumbersFromAge(idade, idade));
    console.log("Pares:", evenNumbersFromDay(28, idade));
    console.log("Ímpares:", oddNumbersFromMonth(9, idade));
}
mainEx1();
// Exercício 2
console.log("Exercício 2");
function jurosSimples(valorInicial, taxa, meses) {
    var valores = [];
    var taxaDecimal = taxa / 100;
    for (var i = 0; i <= meses; i++) {
        var juros = valorInicial * taxaDecimal * i;
        var totalAcumulado = valorInicial + juros;
        valores.push({
            mes: i,
            juros: parseFloat(juros.toFixed(2)),
            totalAcumulado: parseFloat(totalAcumulado.toFixed(2)),
        });
    }
    return valores;
}
function jurosCompostos(valorInicial, valorMensal, taxa, meses) {
    var valores = [];
    var totalAcumulado = valorInicial;
    var taxaDecimal = taxa / 100;
    for (var i = 1; i <= meses; i++) {
        var juros = totalAcumulado * taxaDecimal;
        totalAcumulado += juros + valorMensal;
        valores.push({
            mes: i,
            juros: parseFloat(juros.toFixed(2)),
            totalAcumulado: parseFloat(totalAcumulado.toFixed(2)),
        });
    }
    return valores;
}
// Menu Interativo
function mainEx2() {
    var _a;
    var tipo =
        (_a = prompt(
            "Digite 'S' para Juros Simples ou 'C' para Juros Compostos: "
        )) === null || _a === void 0
            ? void 0
            : _a.toUpperCase();
    var valorInicial = parseFloat(prompt("Digite o valor inicial: "));
    var valorMensal =
        tipo === "C" ? parseFloat(prompt("Digite o valor mensal: ")) : 0;
    var taxa = parseFloat(prompt("Digite a taxa de juros (em %): "));
    var meses = parseInt(
        prompt("Digite o período (em meses, entre 6 e 12): "),
        10
    );
    if (meses < 6 || meses > 12) {
        console.log("NÚMERO DE PARCELAS INVÁLIDO.");
        return;
    }
    if (valorInicial < 100) {
        console.log("VALOR MÍNIMO PARA PARCELAMENTO DEVE SER R$1000,00.");
        return;
    }
    if (taxa <= 0 || taxa > 10) {
        console.log("VALOR DO JUROS NÃO PODE SUPERAR 10%.");
        return;
    }
    if (tipo === "S") {
        console.log(jurosSimples(valorInicial, taxa, meses));
    } else if (tipo === "C") {
        console.log(jurosCompostos(valorInicial, valorMensal, taxa, meses));
    } else {
        console.log("Opção de juros inválida!");
    }
}
mainEx2();
// Exercício 3
console.log("Exercício 3");
function shiftMatrix(matrix, positions) {
    var flattened = matrix.flat();
    var length = flattened.length;
    var shifted = Array(length);
    for (var i = 0; i < length; i++) {
        shifted[(i + positions) % length] = flattened[i];
    }
    return [shifted.slice(0, 3), shifted.slice(3, 6), shifted.slice(6, 9)];
}
function doubleMatrix(matrix) {
    return matrix.map(function (row) {
        return row.map(function (value) {
            return value * 2;
        });
    });
}
function filterMatrix(matrix, age) {
    return matrix.map(function (row) {
        return row.map(function (value) {
            return value >= age ? value : 0;
        });
    });
}
// Menu Interativo
function mainEx3() {
    var _a;
    var matrix = [];
    for (var i = 0; i < 3; i++) {
        matrix.push([
            parseInt(prompt("Digite o valor para matriz[".concat(i, "][0]: ")), 10),
            parseInt(prompt("Digite o valor para matriz[".concat(i, "][1]: ")), 10),
            parseInt(prompt("Digite o valor para matriz[".concat(i, "][2]: ")), 10),
        ]);
    }
    console.log("Escolha uma opção:");
    console.log("a. Mudar a posição dos elementos em duas posições à frente");
    console.log("b. Mudar a posição dos elementos em n posições à frente");
    console.log("c. Popular nova matriz com valores dobrados");
    console.log("d. Popular nova matriz com valores >= idade ou zerar");
    var option =
        (_a = prompt("Digite a opção desejada (a, b, c, d): ")) === null ||
            _a === void 0
            ? void 0
            : _a.toLowerCase();
    var age = 19; // Substitua pela sua idade
    switch (option) {
        case "a":
            console.log(shiftMatrix(matrix, 2));
            break;
        case "b":
            var n = parseInt(prompt("Digite o número de posições (1 a 8): "), 10);
            if (n < 1 || n > 8) {
                console.log("Valor inválido!");
            } else {
                console.log(shiftMatrix(matrix, n));
            }
            break;
        case "c":
            console.log(doubleMatrix(matrix));
            break;
        case "d":
            console.log(filterMatrix(matrix, age));
            break;
        default:
            console.log("Opção inválida!");
    }
}
mainEx3();
// Exercício 4
console.log("Exercício 4");
function potencia(base, expoente) {
    return Math.pow(base, expoente);
}
function somaInclusiva(num1, num2) {
    var _a;
    if (num1 > num2) {
        (_a = [num2, num1]), (num1 = _a[0]), (num2 = _a[1]); // Desestruturação para troca
    }
    return Array.from({ length: num2 - num1 + 1 }, function (_, index) {
        return num1 + index;
    }).reduce(function (a, b) {
        return a + b;
    }, 0);
}
function produtoExclusivo(num1, num2) {
    var _a;
    if (num1 > num2) {
        (_a = [num2, num1]), (num1 = _a[0]), (num2 = _a[1]); // Desestruturação para troca
    }
    var produto = 1;
    for (var i = num1 + 1; i < num2; i++) {
        produto *= i;
    }
    return produto;
}
function carregarVetor(idade, primeiro, salto) {
    var vetor = [];
    for (var i = 0; i < idade; i++) {
        vetor.push(primeiro + i * salto);
    }
    return vetor;
}
function mainEx4() {
    var _a, _b, _c;
    var num1 = Number(
        (_a = prompt("Digite o primeiro número inteiro:")) !== null && _a !== void 0
            ? _a
            : "0"
    );
    var num2 = Number(
        (_b = prompt("Digite o segundo número inteiro:")) !== null && _b !== void 0
            ? _b
            : "0"
    );
    while (true) {
        console.log("\nMenu:");
        console.log(
            "a) O valor do primeiro número elevado à potência do segundo número"
        );
        console.log("b) A soma dos números entre os dois digitados, incluindo-os");
        console.log("c) O produto entre os dois números, não incluindo-os");
        console.log("d) Carregar um vetor conforme a sua idade");
        console.log("e) Sair");
        var opcao =
            (_c = prompt("Escolha uma opção (a, b, c, d, e):")) === null ||
                _c === void 0
                ? void 0
                : _c.toLowerCase();
        if (opcao === "a") {
            var resultado = potencia(num1, num2);
            console.log("Resultado: ".concat(resultado));
        } else if (opcao === "b") {
            var resultado = somaInclusiva(num1, num2);
            console.log("Soma inclusiva: ".concat(resultado));
        } else if (opcao === "c") {
            var resultado = produtoExclusivo(num1, num2);
            console.log("Produto exclusivo: ".concat(resultado));
        } else if (opcao === "d") {
            var idade = 19;
            var vetor = carregarVetor(idade, num1, num2);
            console.log("Vetor carregado com sucesso.");
            console.log(vetor);
        } else if (opcao === "e") {
            console.log("Saindo...");
            break;
        } else {
            console.log("Opção inválida! Tente novamente.");
        }
    }
}
mainEx4();
