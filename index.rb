# Exercício 1

def fibonacci_sequence(length)
  sequence = [0, 1]
  (2...length).each do |i|
    sequence.push(sequence[i - 1] + sequence[i - 2])
  end
  sequence[0, length]
end

def fettuccine_sequence(month, day, length)
  sequence = [month, day]
  (2...length).each do |i|
    if i.even?
      sequence.push(sequence[i - 2] - sequence[i - 1])
    else
      sequence.push(sequence[i - 2] + sequence[i - 1])
    end
  end
  sequence
end

def prime_numbers_from_age(age, length)
  primes = []
  num = [age, 2].max

  def is_prime(n)
    (2..Math.sqrt(n).to_i).each do |i|
      return false if n % i == 0
    end
    true
  end

  while primes.length < length
    primes.push(num) if is_prime(num)
    num += 1
  end
  primes
end

def even_numbers_from_day(day, length)
  start = day.even? ? day : day - 1
  evens = []
  while evens.length < length
    evens.push(start)
    start += 2
  end
  evens
end

def odd_numbers_from_month(month, length)
  start = month.odd? ? month : month + 1
  odds = []
  while odds.length < length
    odds.push(start)
    start += 2
  end
  odds
end

def main_ex1
  age = 19
  puts "Fibonacci: #{fibonacci_sequence(age)}"
  puts "Fettuccine: #{fettuccine_sequence(9, 28, age)}"
  puts "Primos: #{prime_numbers_from_age(age, age)}"
  puts "Pares: #{even_numbers_from_day(28, age)}"
  puts "Ímpares: #{odd_numbers_from_month(9, age)}"
end

main_ex1

# Exercício 2

puts "Exercício 2"

def juros_simples(valor_inicial, taxa, meses)
  valores = []
  taxa_decimal = taxa / 100.0

  (0..meses).each do |i|
    juros = valor_inicial * taxa_decimal * i
    total_acumulado = valor_inicial + juros
    valores.push({
      mes: i,
      juros: juros.round(2),
      total_acumulado: total_acumulado.round(2)
    })
  end

  valores
end

def juros_compostos(valor_inicial, valor_mensal, taxa, meses)
  valores = []
  total_acumulado = valor_inicial
  taxa_decimal = taxa / 100.0

  (1..meses).each do |i|
    juros = total_acumulado * taxa_decimal
    total_acumulado += juros + valor_mensal
    valores.push({
      mes: i,
      juros: juros.round(2),
      total_acumulado: total_acumulado.round(2)
    })
  end

  valores
end

def main_ex2
  puts "Digite 'S' para Juros Simples ou 'C' para Juros Compostos:"
  tipo = gets.chomp.upcase
  print "Digite o valor inicial: "
  valor_inicial = gets.chomp.to_f
  valor_mensal = tipo == 'C' ? gets.chomp.to_f : 0
  print "Digite a taxa de juros (em %): "
  taxa = gets.chomp.to_f
  print "Digite o período (em meses, entre 6 e 12): "
  meses = gets.chomp.to_i

  if meses < 6 || meses > 12
    puts "NÚMERO DE PARCELAS INVÁLIDO."
    return
  end
  if valor_inicial < 100
    puts "VALOR MÍNIMO PARA PARCELAMENTO DEVE SER R$1000,00."
    return
  end
  if taxa <= 0 || taxa > 10
    puts "VALOR DO JUROS NÃO PODE SUPERAR 10%."
    return
  end

  if tipo == 'S'
    puts juros_simples(valor_inicial, taxa, meses)
  elsif tipo == 'C'
    puts juros_compostos(valor_inicial, valor_mensal, taxa, meses)
  else
    puts "Opção de juros inválida!"
  end
end

main_ex2

# Exercício 3

puts "Exercício 3"

def shift_matrix(matrix, positions)
  flattened = matrix.flatten
  length = flattened.length
  shifted = Array.new(length)

  (0...length).each do |i|
    shifted[(i + positions) % length] = flattened[i]
  end

  [
    shifted[0, 3],
    shifted[3, 6],
    shifted[6, 9]
  ]
end

def double_matrix(matrix)
  matrix.map { |row| row.map { |value| value * 2 } }
end

def filter_matrix(matrix, age)
  matrix.map { |row| row.map { |value| value >= age ? value : 0 } }
end

def main_ex3
  matrix = []
  (0..2).each do |i|
    row = []
    (0..2).each do |j|
      print "Digite o valor para matriz[#{i}][#{j}]: "
      row.push(gets.chomp.to_i)
    end
    matrix.push(row)
  end

  puts "Escolha uma opção:"
  puts "a. Mudar a posição dos elementos em duas posições à frente"
  puts "b. Mudar a posição dos elementos em n posições à frente"
  puts "c. Popular nova matriz com valores dobrados"
  puts "d. Popular nova matriz com valores >= idade ou zerar"

  print "Digite a opção desejada (a, b, c, d): "
  option = gets.chomp.downcase
  age = 19 # Substitua pela sua idade

  case option
  when 'a'
    puts shift_matrix(matrix, 2)
  when 'b'
    print "Digite o número de posições (1 a 8): "
    n = gets.chomp.to_i
    if n < 1 || n > 8
      puts "Valor inválido!"
    else
      puts shift_matrix(matrix, n)
    end
  when 'c'
    puts double_matrix(matrix)
  when 'd'
    puts filter_matrix(matrix, age)
  else
    puts "Opção inválida!"
  end
end

main_ex3

# Exercício 4

puts "Exercício 4"

def potencia(base, expoente)
  base ** expoente
end

def soma_inclusiva(num1, num2)
  num1, num2 = num2, num1 if num1 > num2
  (num1..num2).to_a.sum
end

def produto_exclusivo(num1, num2)
  num1, num2 = num2, num1 if num1 > num2
  (num1 + 1...num2).to_a.reduce(1, :*)
end

def carregar_vetor(idade, primeiro, salto)
  (0...idade).map { |i| primeiro + i * salto }
end

def main_ex4
  print "Digite o primeiro número inteiro: "
  num1 = gets.chomp.to_i
  print "Digite o segundo número inteiro: "
  num2 = gets.chomp.to_i

  loop do
    puts "\nMenu:"
    puts "a) O valor do primeiro número elevado à potência do segundo número"
    puts "b) A soma dos números entre os dois digitados, incluindo-os"
    puts "c) O produto entre os dois números, não incluindo-os"
    puts "d) Carregar um vetor conforme a sua idade"
    puts "e) Sair"

    print "Escolha uma opção (a, b, c, d, e): "
    opcao = gets.chomp.downcase

    case opcao
    when 'a'
      resultado = potencia(num1, num2)
      puts "Resultado: #{resultado}"
    when 'b'
      resultado = soma_inclusiva(num1, num2)
      puts "Soma inclusiva: #{resultado}"
    when 'c'
      resultado = produto_exclusivo(num1, num2)
      puts "Produto exclusivo: #{resultado}"
    when 'd'
      idade = 19
      vetor = carregar_vetor(idade, num1, num2)
      puts "Vetor carregado com sucesso."
      puts vetor
    when 'e'
      puts "Saindo..."
      break
    else
      puts "Opção inválida! Tente novamente."
    end
  end
end

main_ex4
