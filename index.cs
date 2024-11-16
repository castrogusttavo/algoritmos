using System;
using System.Linq;

class Program
{
    // Exercício 1

    static int[] FibonacciSequence(int length)
    {
        int[] sequence = new int[length];
        sequence[0] = 0;
        if (length > 1)
            sequence[1] = 1;
        for (int i = 2; i < length; i++)
        {
            sequence[i] = sequence[i - 1] + sequence[i - 2];
        }
        return sequence;
    }

    static int[] FettuccineSequence(int month, int day, int length)
    {
        int[] sequence = new int[length];
        sequence[0] = month;
        sequence[1] = day;
        for (int i = 2; i < length; i++)
        {
            if (i % 2 == 0)
                sequence[i] = sequence[i - 2] - sequence[i - 1];
            else
                sequence[i] = sequence[i - 2] + sequence[i - 1];
        }
        return sequence;
    }

    static int[] PrimeNumbersFromAge(int age, int length)
    {
        var primes = new System.Collections.Generic.List<int>();
        int num = age > 1 ? age : 2;

        bool IsPrime(int n)
        {
            for (int i = 2; i <= Math.Sqrt(n); i++)
            {
                if (n % i == 0)
                    return false;
            }
            return true;
        }

        while (primes.Count < length)
        {
            if (IsPrime(num))
                primes.Add(num);
            num++;
        }

        return primes.ToArray();
    }

    static int[] EvenNumbersFromDay(int day, int length)
    {
        int start = day % 2 == 0 ? day : day - 1;
        int[] evens = new int[length];
        for (int i = 0; i < length; i++)
        {
            evens[i] = start + (i * 2);
        }
        return evens;
    }

    static int[] OddNumbersFromMonth(int month, int length)
    {
        int start = month % 2 == 1 ? month : month + 1;
        int[] odds = new int[length];
        for (int i = 0; i < length; i++)
        {
            odds[i] = start + (i * 2);
        }
        return odds;
    }

    // Exercício 2

    static void JurosSimples(double valorInicial, double taxa, int meses)
    {
        for (int i = 0; i <= meses; i++)
        {
            double juros = valorInicial * taxa * i / 100;
            double totalAcumulado = valorInicial + juros;
            Console.WriteLine($"Mês {i}: Juros = {juros:F2}, Total Acumulado = {totalAcumulado:F2}");
        }
    }

    static void JurosCompostos(double valorInicial, double valorMensal, double taxa, int meses)
    {
        double totalAcumulado = valorInicial;
        for (int i = 1; i <= meses; i++)
        {
            double juros = totalAcumulado * taxa / 100;
            totalAcumulado += juros + valorMensal;
            Console.WriteLine($"Mês {i}: Juros = {juros:F2}, Total Acumulado = {totalAcumulado:F2}");
        }
    }

    // Exercício 3

    static int[,] ShiftMatrix(int[,] matrix, int positions)
    {
        int[] flattened = matrix.Cast<int>().ToArray();
        int length = flattened.Length;
        int[] shifted = new int[length];

        for (int i = 0; i < length; i++)
        {
            shifted[(i + positions) % length] = flattened[i];
        }

        int[,] result = new int[3, 3];
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                result[i, j] = shifted[i * 3 + j];
            }
        }

        return result;
    }

    static int[,] DoubleMatrix(int[,] matrix)
    {
        int[,] result = new int[3, 3];
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                result[i, j] = matrix[i, j] * 2;
            }
        }
        return result;
    }

    static int[,] FilterMatrix(int[,] matrix, int age)
    {
        int[,] result = new int[3, 3];
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                result[i, j] = matrix[i, j] >= age ? matrix[i, j] : 0;
            }
        }
        return result;
    }

    // Exercício 4

    static double Potencia(double baseNum, double expoente)
    {
        return Math.Pow(baseNum, expoente);
    }

    static int SomaInclusiva(int num1, int num2)
    {
        if (num1 > num2)
            (num1, num2) = (num2, num1);
        return Enumerable.Range(num1, num2 - num1 + 1).Sum();
    }

    static int ProdutoExclusivo(int num1, int num2)
    {
        if (num1 > num2)
            (num1, num2) = (num2, num1);
        return Enumerable.Range(num1 + 1, num2 - num1 - 1).Aggregate(1, (prod, num) => prod * num);
    }

    static int[] CarregarVetor(int idade, int primeiro, int salto)
    {
        return Enumerable.Range(0, idade).Select(i => primeiro + i * salto).ToArray();
    }

    static void Main(string[] args)
    {
        // Exercício 1
        int idade = 19;
        Console.WriteLine("Exercício 1:");
        Console.WriteLine("Fibonacci: " + string.Join(", ", FibonacciSequence(idade)));
        Console.WriteLine("Fettuccine: " + string.Join(", ", FettuccineSequence(9, 28, idade)));
        Console.WriteLine("Primos: " + string.Join(", ", PrimeNumbersFromAge(idade, idade)));
        Console.WriteLine("Pares: " + string.Join(", ", EvenNumbersFromDay(28, idade)));
        Console.WriteLine("Ímpares: " + string.Join(", ", OddNumbersFromMonth(9, idade)));

        // Exercício 2
        Console.WriteLine("\nExercício 2:");
        string tipo = Console.ReadLine().ToUpper();
        Console.Write("Digite o valor inicial: ");
        double valorInicial = Convert.ToDouble(Console.ReadLine());
        Console.Write("Digite o valor mensal: ");
        double valorMensal = Convert.ToDouble(Console.ReadLine());
        Console.Write("Digite a taxa de juros: ");
        double taxa = Convert.ToDouble(Console.ReadLine());
        Console.Write("Digite o período (em meses, entre 6 e 12): ");
        int meses = Convert.ToInt32(Console.ReadLine());

        if (tipo == "S")
            JurosSimples(valorInicial, taxa, meses);
        else if (tipo == "C")
            JurosCompostos(valorInicial, valorMensal, taxa, meses);

        // Exercício 3
        Console.WriteLine("\nExercício 3:");
        int[,] matrix = new int[3, 3];
        for (int i = 0; i < 3; i++)
        {
            for (int j = 0; j < 3; j++)
            {
                Console.Write($"Digite o valor para matriz[{i}][{j}]: ");
                matrix[i, j] = Convert.ToInt32(Console.ReadLine());
            }
        }

        Console.WriteLine("Escolha uma opção: (a, b, c, d)");
        string option = Console.ReadLine().ToLower();
        if (option == "a")
            Console.WriteLine(string.Join(", ", ShiftMatrix(matrix, 2).Cast<int>()));
        else if (option == "b")
        {
            Console.Write("Digite o número de posições: ");
            int n = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine(string.Join(", ", ShiftMatrix(matrix, n).Cast<int>()));
        }
        else if (option == "c")
            Console.WriteLine(string.Join(", ", DoubleMatrix(matrix).Cast<int>()));
        else if (option == "d")
            Console.WriteLine(string.Join(", ", FilterMatrix(matrix, 19).Cast<int>()));

        // Exercício 4
        Console.WriteLine("\nExercício 4:");
        Console.Write("Digite o primeiro número inteiro: ");
        int num1 = Convert.ToInt32(Console.ReadLine());
        Console.Write("Digite o segundo número inteiro: ");
        int num2 = Convert.ToInt32(Console.ReadLine());

        while (true)
        {
            Console.WriteLine("\nMenu:");
            Console.WriteLine("a) O valor do primeiro número elevado à potência do segundo número");
            Console.WriteLine("b) A soma dos números entre os dois digitados, incluindo-os");
            Console.WriteLine("c) O produto entre os dois números, não incluindo-os");
            Console.WriteLine("d) Carregar um vetor conforme a sua idade");
            Console.WriteLine("e) Sair");

            Console.Write("Escolha uma opção (a, b, c, d, e): ");
            string opcao = Console.ReadLine().ToLower();

            switch (opcao)
            {
                case "a":
                    double resultadoPotencia = Potencia(num1, num2);
                    Console.WriteLine($"Resultado: {resultadoPotencia}");
                    break;
                case "b":
                    int resultadoSoma = SomaInclusiva(num1, num2);
                    Console.WriteLine($"Soma inclusiva: {resultadoSoma}");
                    break;
                case "c":
                    int resultadoProduto = ProdutoExclusivo(num1, num2);
                    Console.WriteLine($"Produto exclusivo: {resultadoProduto}");
                    break;
                case "d":
                    int idade = 19; // Idade fixa como no exercício em Ruby
                    int[] vetor = CarregarVetor(idade, num1, num2);
                    Console.WriteLine("Vetor carregado com sucesso.");
                    Console.WriteLine(string.Join(", ", vetor));
                    break;
                case "e":
                    Console.WriteLine("Saindo...");
                    return;
                default:
                    Console.WriteLine("Opção inválida! Tente novamente.");
                    break;
            }
        }
    }
}
