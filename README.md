# Hipocampo

Esse projeto é feito por alunos da faculdade Uniceplac e tem por objetivo praticar os conceitos aprendidos nas aulas. Se trata de um site que salva momentos que o usuário pretende se lembrar, enviando uma notificação para que o mesmo não se esqueça.

Para rodar o projeto é necessário os seguintes pré-requisitos:

- Node.js na versão 18 ou superior
- MySQL

Para inicializar o projeto, navegue pela linha de comando até a pasta do projeto e execute os seguintes comandos:

``npm install``

``npm run start:dev``

Comandos para mudar a senha do root no mysql:

``sudo mysql``

``USE mysql;``

``UPDATE user set authentication_string=NULL where User='root';``

``FLUSH privileges;``

``ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'root';``

``FLUSH privileges;``

``QUIT``