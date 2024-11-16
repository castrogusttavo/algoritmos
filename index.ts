import PromptSync = require('prompt-sync');
const prompt = PromptSync();

function fibonacciSequence(length: number): number[] {
    let sequence = [0, 1];
    for (let i = 2; i < length; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence.slice(0, length);
}

function fettuccineSequence(month: number, day: number, length: number): number[] {
    let sequence = [month, day];
    for (let i = 2; i < length; i++) {
        if (i % 2 === 0) {
            sequence.push(sequence[i - 2] - sequence[i - 1]);
        } else {
            sequence.push(sequence[i - 2] + sequence[i - 1]);
        }
    }
    return sequence;
}

function primeNumbersFromAge(age: number, length: number): number[] {
    const primes: number[] = [];
    let num = age > 1 ? age : 2;

    const isPrime = (n: number): boolean => {
        for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
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

function evenNumbersFromDay(day: number, length: number): number[] {
    let start = day % 2 === 0 ? day : day - 1;
    const evens: number[] = [];
    while (evens.length < length) {
        evens.push(start);
        start += 2;
    }
    return evens;
}

function oddNumbersFromMonth(month: number, length: number): number[] {
    let start = month % 2 === 1 ? month : month + 1;
    const odds: number[] = [];
    while (odds.length < length) {
        odds.push(start);
        start += 2;
    }
    return odds;
}

function mainEx1(): void {
    const idade = 19;
    console.log("Fibonacci:", fibonacciSequence(idade));
    console.log("Fettuccine:", fettuccineSequence(9, 28, idade));
    console.log("Primos:", primeNumbersFromAge(idade, idade));
    console.log("Pares:", evenNumbersFromDay(28, idade));
    console.log("Ímpares:", oddNumbersFromMonth(9, idade));
}

mainEx1();

// Exercício 2

console.log("Exercício 2");

function jurosSimples(
  valorInicial: number, 
  taxa: number, 
  meses: number
): { mes: number; juros: number; totalAcumulado: number }[] {
  const valores = [];
  const taxaDecimal = taxa / 100;

  for (let i = 0; i <= meses; i++) {
    const juros = valorInicial * taxaDecimal * i;
    const totalAcumulado = valorInicial + juros;
    valores.push({
      mes: i,
      juros: parseFloat(juros.toFixed(2)),
      totalAcumulado: parseFloat(totalAcumulado.toFixed(2)),
    });
  }

  return valores;
}

function jurosCompostos(
  valorInicial: number,
  valorMensal: number,
  taxa: number,
  meses: number
): { mes: number; juros: number; totalAcumulado: number }[] {
  const valores = [];
  let totalAcumulado = valorInicial;
  const taxaDecimal = taxa / 100;

  for (let i = 1; i <= meses; i++) {
    const juros = totalAcumulado * taxaDecimal;
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
  const tipo = prompt("Digite 'S' para Juros Simples ou 'C' para Juros Compostos: ")?.toUpperCase();
  const valorInicial = parseFloat(prompt("Digite o valor inicial: ")!);
  const valorMensal = tipo === 'C' ? parseFloat(prompt("Digite o valor mensal: ")!) : 0;
  const taxa = parseFloat(prompt("Digite a taxa de juros (em %): ")!);
  const meses = parseInt(prompt("Digite o período (em meses, entre 6 e 12): ")!, 10);

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

  if (tipo === 'S') {
    console.log(jurosSimples(valorInicial, taxa, meses));
  } else if (tipo === 'C') {
    console.log(jurosCompostos(valorInicial, valorMensal, taxa, meses));
  } else {
    console.log("Opção de juros inválida!");
  }
}
mainEx2();

// Exercício 3

console.log("Exercício 3");
function shiftMatrix(matrix: number[][], positions: number): number[][] {
  const flattened = matrix.flat();
  const length = flattened.length;
  const shifted = Array(length);

  for (let i = 0; i < length; i++) {
    shifted[(i + positions) % length] = flattened[i];
  }

  return [
    shifted.slice(0, 3),
    shifted.slice(3, 6),
    shifted.slice(6, 9)
  ];
}

function doubleMatrix(matrix: number[][]): number[][] {
  return matrix.map(row => row.map(value => value * 2));
}

function filterMatrix(matrix: number[][], age: number): number[][] {
  return matrix.map(row => row.map(value => (value >= age ? value : 0)));
}

// Menu Interativo
function mainEx3() {
  const matrix: number[][] = [];
  for (let i = 0; i < 3; i++) {
    matrix.push([
      parseInt(prompt(`Digite o valor para matriz[${i}][0]: `)!, 10),
      parseInt(prompt(`Digite o valor para matriz[${i}][1]: `)!, 10),
      parseInt(prompt(`Digite o valor para matriz[${i}][2]: `)!, 10)
    ]);
  }

  console.log("Escolha uma opção:");
  console.log("a. Mudar a posição dos elementos em duas posições à frente");
  console.log("b. Mudar a posição dos elementos em n posições à frente");
  console.log("c. Popular nova matriz com valores dobrados");
  console.log("d. Popular nova matriz com valores >= idade ou zerar");

  const option = prompt("Digite a opção desejada (a, b, c, d): ")?.toLowerCase();
  const age = 19; // Substitua pela sua idade

  switch (option) {
    case 'a':
      console.log(shiftMatrix(matrix, 2));
      break;
    case 'b':
      const n = parseInt(prompt("Digite o número de posições (1 a 8): ")!, 10);
      if (n < 1 || n > 8) {
        console.log("Valor inválido!");
      } else {
        console.log(shiftMatrix(matrix, n));
      }
      break;
    case 'c':
      console.log(doubleMatrix(matrix));
      break;
    case 'd':
      console.log(filterMatrix(matrix, age));
      break;
    default:
      console.log("Opção inválida!");
  }
}
mainEx3();


// Exercício 4

console.log("Exercício 4");

function potencia(base: number, expoente: number): number {
  return Math.pow(base, expoente);
}

function somaInclusiva(num1: number, num2: number): number {
  if (num1 > num2) {
      [num1, num2] = [num2, num1]; // Desestruturação para troca
  }
  return Array.from({ length: num2 - num1 + 1 }, (_, index) => num1 + index).reduce((a, b) => a + b, 0);
}

function produtoExclusivo(num1: number, num2: number): number {
  if (num1 > num2) {
      [num1, num2] = [num2, num1]; // Desestruturação para troca
  }
  let produto = 1;
  for (let i = num1 + 1; i < num2; i++) {
      produto *= i;
  }
  return produto;
}

function carregarVetor(idade: number, primeiro: number, salto: number): number[] {
  const vetor: number[] = [];
  for (let i = 0; i < idade; i++) {
      vetor.push(primeiro + i * salto);
  }
  return vetor;
}

function mainEx4(): void {
  const num1 = Number(prompt("Digite o primeiro número inteiro:") ?? "0");
  const num2 = Number(prompt("Digite o segundo número inteiro:") ?? "0");
  
  while (true) {
      console.log("\nMenu:");
      console.log("a) O valor do primeiro número elevado à potência do segundo número");
      console.log("b) A soma dos números entre os dois digitados, incluindo-os");
      console.log("c) O produto entre os dois números, não incluindo-os");
      console.log("d) Carregar um vetor conforme a sua idade");
      console.log("e) Sair");
      
      const opcao = prompt("Escolha uma opção (a, b, c, d, e):")?.toLowerCase();
      
      if (opcao === 'a') {
          const resultado = potencia(num1, num2);
          console.log(`Resultado: ${resultado}`);
      } else if (opcao === 'b') {
          const resultado = somaInclusiva(num1, num2);
          console.log(`Soma inclusiva: ${resultado}`);
      } else if (opcao === 'c') {
          const resultado = produtoExclusivo(num1, num2);
          console.log(`Produto exclusivo: ${resultado}`);
      } else if (opcao === 'd') {
          const idade = 19
          const vetor = carregarVetor(idade, num1, num2);
          console.log("Vetor carregado com sucesso.");
          console.log(vetor);
      } else if (opcao === 'e') {
          console.log("Saindo...");
          break;
      } else {
          console.log("Opção inválida! Tente novamente.");
      }
  }
}

mainEx4();
