#Calculadora feita no grupo de estudos AGES

Calculadora feita sem o método eval(). Para isso, foi feita uma estrutura de dados que armazena cada numero e cada operador em
uma lista. E ao clicar no botão de igual '=', a lista inteira é lida e calculada progressivamente.
Optei por deixar no histórico do display um formato em lista, para mostrar exatamente como as contas estão sendo
executadas por trás dos panos, que nada mais é do que a forma que o eval() calcula contas através de string.

##Problema da calculadora:
  1. O botão '+/-' que serve para inverter o valor do último número, não mudará o sinal no display se for seguido
de uma multiplicação ou divisão. Porém, o resultado sempre dá certo, pois há uma lógica diferente para o display
e para a conta de fato.
