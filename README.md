### SpaceCommerce é uma API criada com o intuito de gerenciar o back-end de um e-commerce.

Essa API está integrada a um banco de dados (SQLite) que guarda e retorna as informações passadas.
Sua principal função é registrar pedidos, e para isso ela precisa manipular também as informações de usuários e produtos.
Para facilitar, além das informações diretamente enviadas, ela retorna também o valor total de um pedido.

//como falar da parte relacional?

Mais especificamente, possui as seguintes funcionalidades:
	Relativo à _users_ (os usuários compradores):
 		-Buscar por todos os usuários cadastrados,
	 	-Criar novos usuários;
	 Relativo à _products_:
		-Buscar a lista completa de produtos cadastrados, 
		-Buscar os produtos cadastrados por nome,
		-Cadastrar novo produto;
	Relativo à _purchases_ (pedidos):
 		-Criar um novo pedido,
	 	-Buscar um pedido através de seu identificador (Id)
	 	-Deletar um pedido existente.
	 

#### Link da documentação: [SpaceCommerce](https://documenter.getpostman.com/view/27681355/2s9Xxtxaz4#e177542b-a0ee-4c80-8435-5c3288fa3d21)

#### Para utiliza-la:
Clone esse repositório, 
//No seu PC, dentro do repositório do projeto, abra o terminal e digite `npm install` para instalar as dependências do projeto.
Em seguida, para rodar o servidor, o comando no terminal é `npm start`.
Para orientações de como utilizar a API, referencie a documentação dela.

É necessário criar as tabelas manualmente, bastanto clicar nos "Execute" no arquivo spacecommerce.sql. 
No mesmo arquivo têm também queries que permitem inserir dados nas tabelas, basta alterar os Values e clicar em "Execute".
Também é possível populá-la usando programas como Postman ou Insomnia.
**Atenção:** todos os IDs são criados automático (AUTOINCREMENT).

Foi criada em **TypeScript/NodeJs**, utilizando o framework __Express__, o **SQLite** como banco de dados embedded na aplicação e o **Knex** como query builder.
