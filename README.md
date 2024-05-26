# FATEC Profº Jessen Vidal - São José dos Campos - 1º Semestre DSM

Conforme a demanda da 1° API, ou "Aprendizagem por Projetos Integrados", foi criada uma aplicação web para a coleta e exibição de dados referentes a uma estufa automatizada para agricultura indoor.

## Índice

<p style="text-align: center">
    <a href="#about">Sobre o Projeto</a> |
    <a href="#tech">Tecnologias</a> |
    <a href="#mvp">MVP</a> |
    <a href="#sprint">Sprints</a> |
    <a href="#backlog">BackLog</a> | 
    <a href="#team">Equipe</a>
</p>

<span id="about">
    
## Sobre o Projeto

Este projeto se trata de um website para a leitura e armazenamento de dados da estufa inteligente do [Project Smart Farming](https://github.com/team-i9/Projeto-Smart-Farming/tree/master), que analisa os dados sobre umidade ambiente, umidade do solo, temperatura ambiente e volume da água, usando-os como base para a geração de gráficos e médias diárias, possibilitando uma melhor administração e monitoria da estufa.

<span id="tech">
    
## Tecnologias

GitHub / Flask / Html / Css / JavaScript / MySQL / Figma / Jira

<span id="mvp">
    
## MVP

<video controls>
  <source src="./docs/Sprint-3/mvp-sprint-3.mp4" type="video/mp4">
</video>

<img src="./docs/Sprint-3/mvp-sprint-3.mp4">

<span id="sprint">
    
## Sprints

[Sprint 1 →](./docs/Sprint-1/sprint-1.md)
[Sprint 2 →](./docs/Sprint-2/sprint-2.md)
Sprint 3:

| Descrição | Data de início | Responsável | Data de término
|-----------|--|--|--|
| Desenvolver o visual do filtro de dias | 13/5/2024 | Carlos Intrieri | 25/5/2024
| Desenvolver a funcionalidade de deletar um dia | 13/5/2024 | Avya Alex | 24/5/2024
| Desenvolver a sincronização entre os dados do banco de dados e o timelapse | 13/5/2024 | João Suzuki | 22/5/2024
| Desenvolver a exibição dos gráficos com os dados do banco de dados e o filtro de dias| 13/5/2024 | Victor Bessa | 25/5/2024
| Criar o manual de execução do projeto | 13/5/2024 | João Góes | 25/5/2024
| Desenvolver funcionalidade para alterar o código de segurança e salvá-lo no banco de dados | 13/5/2024 | Pedro Prevides | 23/5/2024
| Desenvolver a visual da exibição dos dados de um determinado dia | 13/5/2024 | Davi  | 25/5/2024
| Desenvolver a exibição dos dados de um determinado dia | 13/5/2024 | Davi | 25/5/2024
| Arrumar a watermark | 13/5/2024 | João Góes | 22/5/2024
| Desenvolver funcionalidade para criar as médias dos dados de um determinado dia| 13/5/2024 | João Felipe | 25/5/2024
| Integrar (merge) visual do filtro com a funcionalidade do filtro | 13/5/2024 | Avya Alex | 25/5/2024
| Integrar visual da exibição de dados de um dia com a funcionalidade de exibir os dados | 13/5/2024 | João Felipe | 25/5/2024
| Sincronizar funcionalidade de médias do dia com o timelapse | 13/5/2024 | Carlos Intrieri | 25/5/2024
| Atualizar o README | 13/5/2024 | Carlos Intrieri | 26/5/2024

<span id="backlog">
    
## Backlog

| ID | Requisito | História | Sprint | Prioridade
|----|-----------|----------|-----------|--
| 1 | Gráfico | Eu, como usuário, quero visualizar os dados em formato de gráficos, para que eu possa melhor enxergar como os dados se comportam | 1-2 | 🟥Muito Alta
| 2 | Backlog | Eu, como cliente, quero um product backlog, para melhor analisar o andamento do projeto | 1 | 🟥Muito Alta
| 3 | Protótipo estático | Eu, como cliente, quero uma versão estática do site, para que eu possa ter uma ideia melhor de seu funcionamento | 1 | 🟥Muito Alta
| 4 | Wireframe mobile | Eu, como cliente, quero um wireframe mobile, para melhor visualizar o funcionamento e a interface em dispositivos móveis | 1 | 🟥Muito Alta
| 5 | Exibição dos dados | Eu, como usuário, quero visualizar os dados em formato de tabela, para que eu possa analisar as variações ocorridas ao longo do dia | 2 | 🟨Alta
| 6 | Pesquisa por período de tempo | Eu, como usuário, quero poder pesquisar os dados em um determinado range de dias, para eu que possa analisar como a estufa se comportou naquele período. | 2 | 🟨Alta
| 7 | Timelapse | Eu, como usuário, quero um timelapse das datas, para que eu possa visualizar rapidamente quais datas possuem dados registrados. | 1-3 | 🟨Alta
| 8 | Resumo dos dados | Eu, como usuário, quero visualizar um resumo das médias diárias dos dados registrados, para que eu possa visualizar rapidamente as variações dos dados. | 1-3 | 🟨Alta
| 9 | Wireframe desktop | Eu, como cliente, quero um wireframe desktop, para melhor visualizar o funcionamento e a interface em dispositivos desktop | 2-3 | 🟨Alta
| 10 | Protótipo dinâmico | Eu, como cliente, quero uma versão dinâmica do site, para que eu possa usufruir dele em meu projeto | 3 | 🟨Alta
| 11 | Leitura de dados externos | Eu, como usuário, quero importar um arquivo de planilha, para que eu possa rapidamente registrar os dados capturados pelo sensor. | 2 | 🟨Alta
| 12 | Código de segurança | Eu, como usuário, quero que seja pedido um código de segurança ao deletar os dados de um dia, para que eu possa evitar que acidentes ocorram. | 2 | 🟨Alta
| 13 | Filtragem de dados | Eu, como usuário, quero filtrar qual campo visualizar, para que possa analisar somente um determinado valor. | 3 | 🟩Média
| 14 | Alterar dados | Eu, como usuário, quero alterar os dados cadastrados dos sensores, para que eu possa corrigir algum dado digitado errado. | 3 | 🟩Média
| 15 | Deletar dados | Eu, como usuário, quero deletar os dados cadastrados dos sensores, para que eu possa registrar os dados de novo ao invés de editar um por um. | 3 | 🟩Média
| 16 | Exportação dos gráficos | Eu, como usuário, quero baixar os dados para meu computador, para que possa analisá-lo usando um software externo. | 4 | 🟦Baixa
| 17 | Cadastrar dados | Eu, como usuário, quero cadastrar dados dos sensores da estufa, para poder monitorar o comportamento das plantas. | 4 | 🟦Baixa

<span id="team">
    
## Equipe

|Nome|Função|GitHub|LinkedIn|
|----|------|------|--------|
| João Suzuki | Product Owner | [GitHub](https://github.com/joaosuzuki98) | [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-suzuki-6a2b02192/) |
| Carlos Intrieri | Scrum Master | [GitHub](https://github.com/carlosintrieri) | [LinkedIn](https://www.linkedin.com/in/carlosintrieri) |
| Avya Alex | Dev Team | [GitHub](https://github.com/AvyaAquino) | [LinkedIn](https://www.linkedin.com/in/avya-candido-598b5228a/) |
| Davi Marinho | Dev Team | [GitHub](https://github.com/DMBMz) | [LinkedIn](https://www.linkedin.com/in/davi-miguel-a90821214/)|
| Gabriel Guimaraes | Dev Team | [GitHub](https://github.com/gabrielbguimaraes) | [LinkedIn](https://www.linkedin.com/in/gabriel-g-854017138?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) |
| João Felipe | Dev Team | [GitHub](https://github.com/jfiliprc) | [LinkedIn](https://www.linkedin.com/in/joão-felipe-rocha/) |
| João Góes | Dev Team | [GitHub](https://github.com/MagNumGomes) | [LinkedIn](www.linkedin.com/in/joão-vítor-góes-b82b63302) |
| Pedro Prevides | Dev Team | [GitHub](https://github.com/GalaxyBurst) | [LinkedIn](https://www.linkedin.com/in/pedro-prevides-87a0b71a8/) |
| Victor Bessa | Dev Team | [GitHub](https://github.com/victordanielrb) | [LinkedIn](https://www.linkedin.com/in/victor-daniel-ramos-bessa-1436a3215/) |
