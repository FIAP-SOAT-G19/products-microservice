# Tech Challenge - Grupo 19

O **Tech Challenge** é um projeto de um sistema de autoatendimento de fast food, que é composto por uma série de dispositivos e interfaces que permitem aos clientes selecionar e fazer pedidos sem precisar interagir com um atendente.


## Integrantes

- [@filipedev040990](https://www.github.com/filipedev040990) - Filipe Siqueira
- [@repRSilva](https://www.github.com/repRSilva) - Rafael Silva
- [@rodrigodos-santos](https://www.github.com/rodrigodos-santos) - Rodrigo dos Santos
- [@me-marchi](https://www.github.com/me-marchi) - Maria Eduarda Marchi
- [@vanessalimaf](https://www.github.com/vanessalimaf) - Vanessa Lima

## Repositórios Relacionados

Este projeto faz parte de um ecossistema maior de repositórios. Aqui está a lista de repositórios relacionados:

1. **[Repositório de Infraestrutura](https://github.com/FIAP-SOAT-G19/tech-challenge-iac)** - Contém o código-fonte relacionado a construção de toda a infra da aplicação com Terraform.
2. **[Repositório de Autenticação](https://github.com/FIAP-SOAT-G19/lambda)** - Código-fonte relacionado a autenticação da aplicação com lambda.
3. **[Repositório de Produtos](https://github.com/FIAP-SOAT-G19/products-microservice)** - Código-fonte relacionado ao catálogo de produtos.
4. **[Repositório de Cadastros](https://github.com/FIAP-SOAT-G19/registrations-microservice)** - Código-fonte relacionado ao cadastro de funcionários e clientes.
5. **[Repositório de Pedidos](https://github.com/FIAP-SOAT-G19/order-microsservice)** - Código-fonte relacionado ao pedido.
6. **[Repositório de Pagamentos](https://github.com/FIAP-SOAT-G19/payments-microsservice)** - Código-fonte relacionado ao processamento de pagamentos, este microserviço está relacionado ao microserviço que faz o decrypt dos dados do cartão de crédito.
7. **[Repositório Encryptor](https://github.com/FIAP-SOAT-G19/card-encryptor-microsservice)** - Código-fonte utilizado para encryptar e desencryptar dados dos cartões de crédito.
8. **[Repositório de Produção](https://github.com/FIAP-SOAT-G19/production-microservice)** - Código-fonte relacionado a produção dos pedidos.


## Sumário
1. [Instruções para Rodar a Aplicação](#instruções-para-rodar-a-aplicação)
2. [Justificativa do Padrão SAGA](#justificativa-do-padrão-saga)
3. [Relatórios OWASP ZAP](#relatórios-owasp-zap)
4. [Relatório RIPD](#relatório-ripd)
5. [Desenho da Arquitetura](#desenho-da-arquitetura)
6. [Vídeo Explicativo](#vídeo-explicativo)

## Instruções para Rodar a Aplicação Localmente
- Execute os seguintes comandos:
  ```bash
    kubectl apply -f k8s/db-deployment.yaml
    kubectl apply -f k8s/api-products-deployment.yaml
    kubectl apply -f k8s/metrics.yaml
  ```

- Utilize os comandos abaixo para encaminhar as conexões das portas locais para a portas dos pod's Kubernetes (o segundo comando é opcional)
  ```bash
    kubectl port-forward service/api-svc 3000:3000 &
    kubectl port-forward service/database-svc 5432:5432 &
  ```

## ▶️ Executando o projeto na Amazon AWS
- Execute primeiro o repositório com a infraestrutura
  - [Repositório Infra](https://github.com/FIAP-SOAT-G19/tech-challenge-iac)
- Agora com a infraestrutura montada, executa cada repositório abaixo
  - [Repositório Produtos](https://github.com/FIAP-SOAT-G19/products-microservice)
  - [Repositório Produção](https://github.com/FIAP-SOAT-G19/production-microservice)
  - [Repositório Pagamentos](https://github.com/FIAP-SOAT-G19/payments-microsservice)
  - [Repositório Pedidos](https://github.com/FIAP-SOAT-G19/order-microsservice)
  - [Repositório Cadastro](https://github.com/FIAP-SOAT-G19/registrations-microservice)
  - [Repositório Encripta Dados Cartão](https://github.com/FIAP-SOAT-G19/card-encryptor-microsservice)
---

## Justificativa do Padrão SAGA Coreografada
<details>
  <summary>Justificativa do Padrão SAGA coreografa</summary>
    Escolhemos o padrão Saga Coreografada para o desenvolvimento do Tech-Challenge, por termos como requisito ser uma aplicação distribuída com arquitetura de microserviços, a saga coreografada nos ajuda a resolver alguns paradigmas no desenvolvimento desses microserviços distribuídos. As principais vantagens que temos com a utilização da saga coreografada são:
    1.	Desacoplamento e Autonomia dos Serviços:
    o	Desacoplamento: Cada serviço decide de forma independente quando e como realizar suas operações. Isso leva a um baixo acoplamento entre os serviços.
    o	Autonomia: Os serviços não dependem de um orquestrador central para controlar o fluxo da saga, aumentando a resiliência e escalabilidade do sistema.
    2.	Escalabilidade e Resiliência:
    o	Escalabilidade: Como os serviços comunicam-se de forma assíncrona, o sistema pode lidar melhor com picos de carga, já que não há uma necessidade imediata de coordenação central.
    o	Resiliência: A ausência de um ponto central de falha (como um orquestrador) significa que uma falha em um serviço específico não necessariamente afeta todo o sistema.
    3.	Flexibilidade e Evolução Independente:
    o	Flexibilidade: Serviços podem ser modificados, adicionados ou removidos sem impacto significativo nos outros, facilitando a evolução do sistema.
    o	Evolução Independente: Permite que equipes diferentes desenvolvam e implantem serviços de forma independente, promovendo a agilidade no desenvolvimento.
    4.	Desempenho:
    o	Desempenho Assíncrono: A comunicação assíncrona evita o bloqueio dos serviços durante a execução das sagas, o que pode melhorar o desempenho geral do sistema.
    5.	Facilidade na Implementação de Compensações:
    o	Compensações Simples: Cada serviço gerencia suas próprias transações e compensações, simplificando a implementação e o gerenciamento dos fluxos compensatórios.
    A partir desses pontos relevantes em que baseamos nossa decisão pela utilização da saga coreografada, mas como tudo não são flores têm alguns pontos negativos em relação a essa escolha também, são as desvantagens a seguir:
    1.	Complexidade na Coordenação de Eventos: A comunicação baseada em eventos pode introduzir complexidade na coordenação e na garantia da consistência eventual.
    2.	Observabilidade: Monitorar e depurar um sistema coreografado pode ser mais desafiador devido à natureza distribuída e assíncrona das transações.
    3.	Desempenho em Cenários de Alto Volume de Transações: É necessário garantir que o sistema de mensageria suporte o volume de eventos gerados pelas sagas.
    Conclusão
    A escolha do padrão de saga coreografada para a arquitetura de microserviços é justificada pela necessidade de um sistema desacoplado, escalável e resiliente. Embora existam desafios a serem superados, as vantagens em termos de autonomia dos serviços, flexibilidade no desenvolvimento e escalabilidade fazem deste padrão uma escolha adequada para garantir a consistência de dados em sistemas distribuídos complexos.
</details>

## Relatórios OWASP ZAP

Os relatórios de segurança gerados pelo OWASP ZAP estão disponíveis nos links abaixo:

- Produtos
  - [Relatório antes das correções](https://fiap-soat-g19.github.io/owasp-zap/before-product-ms.html)
  - [Relatório após as correções](https://fiap-soat-g19.github.io/owasp-zap/after-product-ms.html)

- Produção
  - [Relatório antes as correções](https://fiap-soat-g19.github.io/owasp-zap/2024-06-21-ZAP-Report-localhost.html)
  - [Relatório após das correções](https://fiap-soat-g19.github.io/owasp-zap/after-production-ms.html)

- Pagamentos
  - [Link Discord](https://discord.com/channels/1065992165232214066/1257387783123767317) - Postamos essa dúvida: Temos um micro serviço que executa como um worker, ele pluga em uma fila sqs e processa a partir disso. Pelas aulas vimos que o OWASP ZAP, é executa a partir de rotas HTTP. Recebemos o retorno: pela definição o OWASP ZAP é um web scanner.Não existe outra alternativa, não precisa efetuar os testes nesse ponto específico.

## Relatório RIPD

O Relatório de Impacto de Proteção de Dados (RIPD) pode ser acessado no link a seguir:
- [Relatório RIPD](./assets/reports/RIPD-Grp19.pdf)

## Desenho da Arquitetura
![Arquitetura do Projeto](./assets/images/final-arch.jpg)

## Vídeo Explicativo

Assista ao vídeo explicativo do projeto clicando [aqui](https://youtu.be/iJ0IAZHSmN8?si=N8btjMlgCpygqIo_).
