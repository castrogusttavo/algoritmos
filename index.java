import java.util.*;

public class Exercicio1 {
    // Fibonacci
    public static List<Integer> fibonacciSequence(int length) {
        List<Integer> sequence = new ArrayList<>();
        sequence.add(0);
        sequence.add(1);
        for (int i = 2; i < length; i++) {
            sequence.add(sequence.get(i - 1) + sequence.get(i - 2));
        }
        return sequence.subList(0, length);
    }

    // Fettuccine
    public static List<Integer> fettuccineSequence(int month, int day, int length) {
        List<Integer> sequence = new ArrayList<>();
        sequence.add(month);
        sequence.add(day);
        for (int i = 2; i < length; i++) {
            if (i % 2 == 0) {
                sequence.add(sequence.get(i - 2) - sequence.get(i - 1));
            } else {
                sequence.add(sequence.get(i - 2) + sequence.get(i - 1));
            }
        }
        return sequence;
    }

    // Prime numbers from age
    public static List<Integer> primeNumbersFromAge(int age, int length) {
        List<Integer> primes = new ArrayList<>();
        int num = Math.max(age, 2);

        while (primes.size() < length) {
            if (isPrime(num)) {
                primes.add(num);
            }
            num++;
        }
        return primes;
    }

    // Even numbers from day
    public static List<Integer> evenNumbersFromDay(int day, int length) {
        int start = (day % 2 == 0) ? day : day - 1;
        List<Integer> evens = new ArrayList<>();
        while (evens.size() < length) {
            evens.add(start);
            start += 2;
        }
        return evens;
    }

    // Odd numbers from month
    public static List<Integer> oddNumbersFromMonth(int month, int length) {
        int start = (month % 2 != 0) ? month : month + 1;
        List<Integer> odds = new ArrayList<>();
        while (odds.size() < length) {
            odds.add(start);
            start += 2;
        }
        return odds;
    }

    // Check if number is prime
    public static boolean isPrime(int n) {
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void ex1() {
        int age = 19;
        System.out.println("Fibonacci: " + fibonacciSequence(age));
        System.out.println("Fettuccine: " + fettuccineSequence(9, 28, age));
        System.out.println("Primos: " + primeNumbersFromAge(age, age));
        System.out.println("Pares: " + evenNumbersFromDay(28, age));
        System.out.println("Ímpares: " + oddNumbersFromMonth(9, age));
    }
}

public class Exercicio2 {
    // Juros Simples
    public static List<Map<String, Double>> jurosSimples(double valorInicial, double taxa, int meses) {
        List<Map<String, Double>> valores = new ArrayList<>();
        double taxaDecimal = taxa / 100.0;

        for (int i = 0; i <= meses; i++) {
            double juros = valorInicial * taxaDecimal * i;
            double totalAcumulado = valorInicial + juros;
            Map<String, Double> resultado = new HashMap<>();
            resultado.put("mes", (double) i);
            resultado.put("juros", Math.round(juros * 100.0) / 100.0);
            resultado.put("totalAcumulado", Math.round(totalAcumulado * 100.0) / 100.0);
            valores.add(resultado);
        }

        return valores;
    }

    // Juros Compostos
    public static List<Map<String, Double>> jurosCompostos(double valorInicial, double valorMensal, double taxa, int meses) {
        List<Map<String, Double>> valores = new ArrayList<>();
        double totalAcumulado = valorInicial;
        double taxaDecimal = taxa / 100.0;

        for (int i = 1; i <= meses; i++) {
            double juros = totalAcumulado * taxaDecimal;
            totalAcumulado += juros + valorMensal;
            Map<String, Double> resultado = new HashMap<>();
            resultado.put("mes", (double) i);
            resultado.put("juros", Math.round(juros * 100.0) / 100.0);
            resultado.put("totalAcumulado", Math.round(totalAcumulado * 100.0) / 100.0);
            valores.add(resultado);
        }

        return valores;
    }

    public static void ex2() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Digite 'S' para Juros Simples ou 'C' para Juros Compostos:");
        String tipo = sc.nextLine().toUpperCase();
        System.out.print("Digite o valor inicial: ");
        double valorInicial = sc.nextDouble();
        double valorMensal = 0;
        if (tipo.equals("C")) {
            System.out.print("Digite o valor mensal: ");
            valorMensal = sc.nextDouble();
        }
        System.out.print("Digite a taxa de juros (em %): ");
        double taxa = sc.nextDouble();
        System.out.print("Digite o período (em meses, entre 6 e 12): ");
        int meses = sc.nextInt();

        if (meses < 6 || meses > 12) {
            System.out.println("NÚMERO DE PARCELAS INVÁLIDO.");
            return;
        }
        if (valorInicial < 100) {
            System.out.println("VALOR MÍNIMO PARA PARCELAMENTO DEVE SER R$1000,00.");
            return;
        }
        if (taxa <= 0 || taxa > 10) {
            System.out.println("VALOR DO JUROS NÃO PODE SUPERAR 10%.");
            return;
        }

        if (tipo.equals("S")) {
            System.out.println(jurosSimples(valorInicial, taxa, meses));
        } else if (tipo.equals("C")) {
            System.out.println(jurosCompostos(valorInicial, valorMensal, taxa, meses));
        } else {
            System.out.println("Opção de juros inválida!");
        }
    }
}

public class Exercicio3 {
    // Shift Matrix
    public static List<List<Integer>> shiftMatrix(List<List<Integer>> matrix, int positions) {
        List<Integer> flattened = new ArrayList<>();
        for (List<Integer> row : matrix) {
            flattened.addAll(row);
        }

        List<Integer> shifted = new ArrayList<>(Collections.nCopies(flattened.size(), 0));

        for (int i = 0; i < flattened.size(); i++) {
            shifted.set((i + positions) % flattened.size(), flattened.get(i));
        }

        List<List<Integer>> result = new ArrayList<>();
        result.add(shifted.subList(0, 3));
        result.add(shifted.subList(3, 6));
        result.add(shifted.subList(6, 9));
        return result;
    }

    // Double Matrix
    public static List<List<Integer>> doubleMatrix(List<List<Integer>> matrix) {
        List<List<Integer>> doubled = new ArrayList<>();
        for (List<Integer> row : matrix) {
            List<Integer> doubledRow = new ArrayList<>();
            for (Integer value : row) {
                doubledRow.add(value * 2);
            }
            doubled.add(doubledRow);
        }
        return doubled;
    }

    // Filter Matrix
    public static List<List<Integer>> filterMatrix(List<List<Integer>> matrix, int age) {
        List<List<Integer>> filtered = new ArrayList<>();
        for (List<Integer> row : matrix) {
            List<Integer> filteredRow = new ArrayList<>();
            for (Integer value : row) {
                filteredRow.add(value >= age ? value : 0);
            }
            filtered.add(filteredRow);
        }
        return filtered;
    }

    public static void ex3() {
        Scanner sc = new Scanner(System.in);
        List<List<Integer>> matrix = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j < 3; j++) {
                System.out.print("Digite o valor para matriz[" + i + "][" + j + "]: ");
                row.add(sc.nextInt());
            }
            matrix.add(row);
        }

        System.out.println("Escolha uma opção:");
        System.out.println("a. Mudar a posição dos elementos em duas posições à frente");
        System.out.println("b. Mudar a posição dos elementos em n posições à frente");
        System.out.println("c. Popular nova matriz com valores dobrados");
        System.out.println("d. Popular nova matriz com valores >= idade ou zerar");

        System.out.print("Digite a opção desejada (a, b, c, d): ");
        String option = sc.next().toLowerCase();
        int age = 19;

        switch (option) {
            case "a":
                System.out.println(shiftMatrix(matrix, 2));
                break;
            case "b":
                System.out.print("Digite o número de posições para deslocar: ");
                int positions = sc.nextInt();
                System.out.println(shiftMatrix(matrix, positions));
                break;
            case "c":
                System.out.println(doubleMatrix(matrix));
                break;
            case "d":
                System.out.println(filterMatrix(matrix, age));
                break;
            default:
                System.out.println("Opção inválida.");
        }
    }
}

public class Exercicio4 {

    // Função para calcular a potência
    public static int potencia(int base, int expoente) {
        return (int) Math.pow(base, expoente);
    }

    // Função para calcular a soma inclusiva entre dois números
    public static int somaInclusiva(int num1, int num2) {
        if (num1 > num2) {
            int temp = num1;
            num1 = num2;
            num2 = temp;
        }

        int soma = 0;
        for (int i = num1; i <= num2; i++) {
            soma += i;
        }
        return soma;
    }

    // Função para calcular o produto exclusivo entre dois números
    public static int produtoExclusivo(int num1, int num2) {
        if (num1 > num2) {
            int temp = num1;
            num1 = num2;
            num2 = temp;
        }

        int produto = 1;
        for (int i = num1 + 1; i < num2; i++) {
            produto *= i;
        }
        return produto;
    }

    // Função para carregar um vetor conforme a idade
    public static int[] carregarVetor(int idade, int primeiro, int salto) {
        int[] vetor = new int[idade];
        for (int i = 0; i < idade; i++) {
            vetor[i] = primeiro + i * salto;
        }
        return vetor;
    }

    // Função principal
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Entrada de dados
        System.out.print("Digite o primeiro número inteiro: ");
        int num1 = scanner.nextInt();
        System.out.print("Digite o segundo número inteiro: ");
        int num2 = scanner.nextInt();

        while (true) {
            System.out.println("\nMenu:");
            System.out.println("a) O valor do primeiro número elevado à potência do segundo número");
            System.out.println("b) A soma dos números entre os dois digitados, incluindo-os");
            System.out.println("c) O produto entre os dois números, não incluindo-os");
            System.out.println("d) Carregar um vetor conforme a sua idade");
            System.out.println("e) Sair");

            System.out.print("Escolha uma opção (a, b, c, d, e): ");
            String opcao = scanner.next().toLowerCase();

            switch (opcao) {
                case "a":
                    int resultadoPotencia = potencia(num1, num2);
                    System.out.println("Resultado: " + resultadoPotencia);
                    break;

                case "b":
                    int resultadoSoma = somaInclusiva(num1, num2);
                    System.out.println("Soma inclusiva: " + resultadoSoma);
                    break;

                case "c":
                    int resultadoProduto = produtoExclusivo(num1, num2);
                    System.out.println("Produto exclusivo: " + resultadoProduto);
                    break;

                case "d":
                    int idade = 19;
                    int[] vetor = carregarVetor(idade, num1, num2);
                    System.out.println("Vetor carregado com sucesso.");
                    for (int v : vetor) {
                        System.out.print(v + " ");
                    }
                    System.out.println();
                    break;

                case "e":
                    System.out.println("Saindo...");
                    scanner.close();
                    return;

                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        }
    }
}