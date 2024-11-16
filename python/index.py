def fibonacci_sequence(length: int) -> list[int]:
    sequence = [0, 1]
    for i in range(2, length):
        sequence.append(sequence[i - 1] + sequence[i - 2])
    return sequence[:length]


def fettuccine_sequence(month: int, day: int, length: int) -> list[int]:
    sequence = [month, day]
    for i in range(2, length):
        if i % 2 == 0:
            sequence.append(sequence[i - 2] - sequence[i - 1])
        else:
            sequence.append(sequence[i - 2] + sequence[i - 1])
    return sequence


def prime_numbers_from_age(age: int, length: int) -> list[int]:
    primes = []
    num = age if age > 1 else 2

    def is_prime(n: int) -> bool:
        for i in range(2, int(n ** 0.5) + 1):
            if n % i == 0:
                return False
        return True

    while len(primes) < length:
        if is_prime(num):
            primes.append(num)
        num += 1
    return primes


def even_numbers_from_day(day: int, length: int) -> list[int]:
    start = day if day % 2 == 0 else day - 1
    evens = []
    while len(evens) < length:
        evens.append(start)
        start += 2
    return evens


def odd_numbers_from_month(month: int, length: int) -> list[int]:
    start = month if month % 2 == 1 else month + 1
    odds = []
    while len(odds) < length:
        odds.append(start)
        start += 2
    return odds


def main_ex1():
    idade = 19
    print("Fibonacci:", fibonacci_sequence(idade))
    print("Fettuccine:", fettuccine_sequence(9, 28, idade))
    print("Primos:", prime_numbers_from_age(idade, idade))
    print("Pares:", even_numbers_from_day(28, idade))
    print("Ímpares:", odd_numbers_from_month(9, idade))


# Exercício 2

def juros_simples(valor_inicial: float, taxa: float, meses: int) -> list[dict]:
    valores = []
    taxa_decimal = taxa / 100

    for i in range(meses + 1):
        juros = valor_inicial * taxa_decimal * i
        total_acumulado = valor_inicial + juros
        valores.append({
            'mes': i,
            'juros': round(juros, 2),
            'total_acumulado': round(total_acumulado, 2)
        })
    return valores


def juros_compostos(valor_inicial: float, valor_mensal: float, taxa: float, meses: int) -> list[dict]:
    valores = []
    total_acumulado = valor_inicial
    taxa_decimal = taxa / 100

    for i in range(1, meses + 1):
        juros = total_acumulado * taxa_decimal
        total_acumulado += juros + valor_mensal
        valores.append({
            'mes': i,
            'juros': round(juros, 2),
            'total_acumulado': round(total_acumulado, 2)
        })
    return valores


def main_ex2():
    tipo = input("Digite 'S' para Juros Simples ou 'C' para Juros Compostos: ").upper()
    valor_inicial = float(input("Digite o valor inicial: "))
    valor_mensal = float(input("Digite o valor mensal: ")) if tipo == 'C' else 0
    taxa = float(input("Digite a taxa de juros (em %): "))
    meses = int(input("Digite o período (em meses, entre 6 e 12): "))

    if meses < 6 or meses > 12:
        print("NÚMERO DE PARCELAS INVÁLIDO.")
        return
    if valor_inicial < 1000:
        print("VALOR MÍNIMO PARA PARCELAMENTO DEVE SER R$1000,00.")
        return
    if taxa <= 0 or taxa > 10:
        print("VALOR DO JUROS NÃO PODE SUPERAR 10%.")
        return

    if tipo == 'S':
        print(juros_simples(valor_inicial, taxa, meses))
    elif tipo == 'C':
        print(juros_compostos(valor_inicial, valor_mensal, taxa, meses))
    else:
        print("Opção de juros inválida!")


# Exercício 3

def shift_matrix(matrix: list[list[int]], positions: int) -> list[list[int]]:
    flattened = [item for sublist in matrix for item in sublist]
    length = len(flattened)
    shifted = [None] * length

    for i in range(length):
        shifted[(i + positions) % length] = flattened[i]

    return [
        shifted[:3],
        shifted[3:6],
        shifted[6:]
    ]


def double_matrix(matrix: list[list[int]]) -> list[list[int]]:
    return [[value * 2 for value in row] for row in matrix]


def filter_matrix(matrix: list[list[int]], age: int) -> list[list[int]]:
    return [[value if value >= age else 0 for value in row] for row in matrix]


def main_ex3():
    matrix = []
    for i in range(3):
        row = [
            int(input(f"Digite o valor para matriz[{i}][0]: ")),
            int(input(f"Digite o valor para matriz[{i}][1]: ")),
            int(input(f"Digite o valor para matriz[{i}][2]: "))
        ]
        matrix.append(row)

    print("Escolha uma opção:")
    print("a. Mudar a posição dos elementos em duas posições à frente")
    print("b. Mudar a posição dos elementos em n posições à frente")
    print("c. Popular nova matriz com valores dobrados")
    print("d. Popular nova matriz com valores >= idade ou zerar")

    option = input("Digite a opção desejada (a, b, c, d): ").lower()
    age = 19  # Substitua pela sua idade

    if option == 'a':
        print(shift_matrix(matrix, 2))
    elif option == 'b':
        n = int(input("Digite o número de posições (1 a 8): "))
        if n < 1 or n > 8:
            print("Valor inválido!")
        else:
            print(shift_matrix(matrix, n))
    elif option == 'c':
        print(double_matrix(matrix))
    elif option == 'd':
        print(filter_matrix(matrix, age))
    else:
        print("Opção inválida!")


# Exercício 4

def potencia(base: int, expoente: int) -> int:
    return base ** expoente


def soma_inclusiva(num1: int, num2: int) -> int:
    if num1 > num2:
        num1, num2 = num2, num1
    return sum(range(num1, num2 + 1))


def produto_exclusivo(num1: int, num2: int) -> int:
    if num1 > num2:
        num1, num2 = num2, num1
    produto = 1
    for i in range(num1 + 1, num2):
        produto *= i
    return produto


def carregar_vetor(idade: int, primeiro: int, salto: int) -> list[int]:
    return [primeiro + i * salto for i in range(idade)]


def main_ex4():
    num1 = int(input("Digite o primeiro número inteiro: "))
    num2 = int(input("Digite o segundo número inteiro: "))

    while True:
        print("\nMenu:")
        print("a) O valor do primeiro número elevado à potência do segundo número")
        print("b) A soma dos números entre os dois digitados, incluindo-os")
        print("c) O produto entre os dois números, não incluindo-os")
        print("d) Carregar um vetor conforme a sua idade")
        print("e) Sair")

        opcao = input("Escolha uma opção (a, b, c, d, e): ").lower()

        if opcao == 'a':
            print(f"Resultado: {potencia(num1, num2)}")
        elif opcao == 'b':
            print(f"Soma inclusiva: {soma_inclusiva(num1, num2)}")
        elif opcao == 'c':
            print(f"Produto exclusivo: {produto_exclusivo(num1, num2)}")
        elif opcao == 'd':
            idade = 19
            vetor = carregar_vetor(idade, num1, num2)
            print("Vetor carregado com sucesso.")
            print(vetor)
        elif opcao == 'e':
            print("Saindo...")
            break
        else:
            print("Opção inválida! Tente novamente.")


main_ex1()
main_ex2()
main_ex3()
main_ex4()
