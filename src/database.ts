import {TUsers, TProducts} from "./types"


export const users: TUsers[] = [{
    id: "u001",
    name: "tobias",
    email: "tobias@email.com",
    password: "tobias123",
    cretedAt: new Date().toISOString(),
},
{
    id: "u002",
    name: "joana",
    email: "joana@email.com",
    password: "joana123", 
    cretedAt: new Date().toISOString(),
}];

export const products: TProducts[] = [{
    id: "prod002",
    name: "mochileiro das galáxias",
    price: 900,
    description: "livro muito legal",
    imageUrl: "https://picsum.photos/seed/Monitor/400"
},
{
    id: "prod002",
    name: "mulheres são de vênus",
    price: 900,
    description: "livro tri legal",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
}];

console.log(users);

