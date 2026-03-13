# Sistema de Ponto com Reconhecimento Facial

Sistema de gerenciamento de ponto eletrônico com autenticação por reconhecimento facial.
O objetivo é permitir que funcionários registrem entrada, pausa para almoço, retorno e saída utilizando identificação automática via câmera.

---

# 1. Arquitetura do Sistema

O sistema é dividido em três partes principais:

Frontend
Interface utilizada pelo funcionário ou administrador para registrar o ponto e visualizar informações.

Backend / API
Responsável por processar requisições, autenticar usuários, realizar o reconhecimento facial e registrar os pontos no banco de dados.

Banco de Dados
Armazena informações de funcionários, registros de ponto e configurações de jornada de trabalho.

---

# 2. Estrutura do Banco de Dados

## Tabela: employees

Tabela responsável por armazenar os dados dos funcionários cadastrados no sistema.

Campos:

id
Identificador único do funcionário.

fullname
Nome completo do funcionário.

email
Email do funcionário.

cpf
CPF do funcionário.

department
Departamento ou setor onde o funcionário trabalha.

position
Cargo do funcionário.

facial_data
Dados do reconhecimento facial do funcionário.
Pode armazenar encoding facial, embedding ou referência para imagens utilizadas na identificação.

created_at
Data de criação do registro.

updated_at
Data da última atualização do registro.

---

## Tabela: time_sheet

Tabela responsável por registrar os pontos diários do funcionário.

Cada funcionário terá **um registro por dia**, onde os horários são preenchidos conforme o ponto é batido.

Campos:

id
Identificador único do registro.

employee_id
Referência ao funcionário na tabela employees.

date
Data do registro de ponto.

entry
Horário de entrada no trabalho.

pause
Horário de saída para pausa ou almoço.

return_pause
Horário de retorno da pausa.

exit
Horário de saída final do expediente.

created_at
Data de criação do registro.

updated_at
Data da última atualização do registro.

---

# 3. Fluxo de Registro de Ponto

O sistema registra os horários de trabalho em quatro etapas.

Entrada
Funcionário inicia o expediente.

Saída para Pausa
Funcionário registra saída para almoço ou intervalo.

Retorno da Pausa
Funcionário retorna do intervalo.

Saída Final
Funcionário encerra o expediente.

Exemplo de registro:

Data: 2026-03-13

Entry: 08:02
Pause: 12:01
Return Pause: 13:03
Exit: 17:05

Caso o funcionário não registre o ponto, os campos permanecem vazios (NULL), permitindo identificar faltas ou inconsistências.

---

# 4. Cálculo de Horas Trabalhadas

As horas trabalhadas podem ser calculadas pela seguinte lógica:

Horas trabalhadas = (Exit - Entry) - (Return Pause - Pause)

Isso permite calcular automaticamente:

Horas trabalhadas no dia
Atrasos
Horas extras
Banco de horas

---

# 5. Reconhecimento Facial

O sistema utiliza a biblioteca:

Face API

GitHub:
https://github.com/justadudewhohacks/face-api.js

Essa biblioteca permite realizar:

Detecção de rosto
Extração de características faciais
Comparação com rostos cadastrados
Identificação do funcionário

Fluxo:

1 Funcionário acessa a página de ponto
2 A câmera é ativada
3 O sistema detecta o rosto
4 O rosto é comparado com os registros armazenados
5 O funcionário é identificado
6 O ponto é registrado automaticamente

---

# 6. Fluxo da API

Fluxo básico da API:

Identificação facial
A API recebe os dados do reconhecimento facial e identifica o funcionário.

Verificação do registro do dia
O sistema verifica se já existe um registro para aquele funcionário na data atual.

Registro automático do ponto

Se não existir entrada → registra entrada

Se já existir entrada e não existir pausa → registra pausa

Se já existir pausa e não existir retorno → registra retorno

Se já existir retorno → registra saída

---

# 7. Estrutura de Pastas do Projeto

backend

controllers
services
routes
database
facial-recognition

frontend

dashboard
ponto
admin

---

# 8. Funcionalidades Futuras

Cadastro de funcionários
Controle de jornada de trabalho
Gestão de banco de horas
Relatórios de presença
Controle de faltas
Controle de atrasos
Gestão de feriados
Dashboard administrativo

---

# 9. Tecnologias Possíveis

Frontend
React ou Next.js

Backend
Node.js com Express ou NestJS

Banco de Dados
MySQL ou PostgreSQL

Reconhecimento Facial
Face API
