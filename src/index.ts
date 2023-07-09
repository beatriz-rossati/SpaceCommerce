import express, { Request, Response } from 'express';
import cors from 'cors';

import { products, users } from "./database"
import { TProducts } from "./types"

console.log(users);
console.log(products);

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => { console.log("Servidor rodando na porta 3003") });

app.get('/ping', (req: Request, res: Response) => {
    res.send("pong")
});

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    const nameToFind = req.query.name as string

    if (req.query.name === undefined) {
        res.status(200).send(products)
    } else {
        const result = products.filter((product) => product.name.toLowerCase().includes(nameToFind.toLowerCase()))

        result.length !== 0 ?
            res.status(200).send(result) :
            res.status(404).send("Produto não encontrado")
    }
})
//tem como aqui começar por: query.name === undefined? ou o ts não deixa?
//tive a impressão vendo os videos, que o do prof só retorna vazio se apagar a query param, que não fizeram certo (mas não consegui ver a continuação).
//dá pra eu fazer a função de filtrar de fora? pq no deles está feito de fora, mas eu não saberia usar ela aqui dentro.

app.post('/users', (req: Request, res: Response) => {

    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string
    const cretedAt = new Date().toISOString()

    const user = {
        id,
        name,
        email,
        password,
        cretedAt
    }

    users.push(user)

    res.status(201).send("Usuário cadastrado com sucesso")
})

app.post('/products', (req: Request, res: Response) => {

    const newProduct: TProducts = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso")
})

//não seria o caso de usar interface?
//deu tudo certo, porém: cadastro coisas duplicadas; cadastro qlq objeto e entra no array igual; envio vazio e sempre dá 200.

app.delete("/users/:id", (req: Request, res: Response) => {
    const userToDelete = req.params.id

    const userIndex = users.findIndex((user) => { return user.id === userToDelete})

    if (userIndex >= 0) { users.splice(userIndex, 1) }
})

app.delete("/products/:id", (req: Request, res: Response) => {
    const productToDelete = req.params.id

    const productIndex = products.findIndex((product) => { return product.id == productToDelete })


    if (productIndex >= 0) { products.splice(productIndex, 1) }

    res.status(200).send("deletado")
})

app.put("/products/:id", (req: Request, res: Response) => {
    const productToEdit = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined 
    const newImageUrl = req.body.imageUrl as string | undefined

    const product = products.find((product) => { return product.id === productToEdit })

    if (product) {
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }

    res.status(200).send("Produto alterado com sucesso")

})