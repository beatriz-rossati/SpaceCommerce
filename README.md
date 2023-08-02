## SpaceCommerce <br/>
### API criada com o intuito de gerenciar o back-end de um e-commerce.

Essa API está integrada a um banco de dados (SQLite) que guarda e retorna informações simulando um e-commerce.
Sua principal função é registrar pedidos, e para isso ela precisa manipular também as informações de usuários e produtos.
De forma que é possível um usuário registrar vários pedidos, e esses com multiplos produtos e quantidades.
Além de guardar e retornar dados, ela também gera outras informações, como o total de um pedido.


Mais especificamente, possui as seguintes funcionalidades:

#### Relativo à _users_ (os usuários compradores):<br/>
- Buscar por todos os usuários cadastrados,<br/>
- Criar novos usuários;<br/>

	   
#### Relativo à _products_: <br/>
- Buscar a lista completa de produtos cadastrados, <br/>
- Buscar os produtos cadastrados por nome, <br/>
- Cadastrar novo produto, <br/>
- Editar um produto já existente; <br/>


#### Relativo à _purchases_ (pedidos):<br/>
- Criar um novo pedido,<br/>
- Buscar um pedido através de seu identificador, (Id)<br/>
- Deletar um pedido existente.<br/> 

### Link da documentação: [SpaceCommerce](https://documenter.getpostman.com/view/27681355/2s9Xxtxaz4#e177542b-a0ee-4c80-8435-5c3288fa3d21)

### Para utilizá-la:
1- Clone esse repositório <br/>
2- Na raíz do projeto, abra o terminal e digite `npm install` para instalar as dependências do projeto. <br/>
3- Em seguida, para rodar o servidor, o comando no terminal é `npm start`.<br/>
4- Para orientações de como utilizar a API, referencie a documentação dela.<br/>
5- Em seguida, é necessário criar as tabelas manualmente (na primeira vez que rodar o projeto), bastanto clicar nos "Execute" no arquivo spacecommerce.sql. <br/>
6- No mesmo arquivo têm também queries que permitem inserir dados nas tabelas, basta alterar os Values e clicar em "Execute". Sendo também possível populá-la com Postman ou Insomnia por exemplo. <br/>
  **Atenção:** todos os IDs são criados automático (AUTOINCREMENT).
<br/>

Criado em **TypeScript/NodeJs**, utilizando o framework __Express__, <br/>
**SQLite**, um banco de dados relacional integrado na aplicação, <br/>
e **Knex**, um query builder que manipula dados em bancos relacionais no NodeJs.
