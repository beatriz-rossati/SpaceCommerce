"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knexfile_1 = require("./database/knexfile");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => { console.log("Servidor rodando na porta 3003"); });
app.get('/ping', (req, res) => {
    res.status(200).send("pong");
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knexfile_1.db)("users");
        res.status(200).send(result);
    }
    catch (_a) {
        res.status(500).send("Erro no servidor");
    }
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const createdAt = new Date().toISOString();
        if (!name || !email || !password) {
            res.status(400);
            throw new Error("Informações essênciais estão faltando.");
        }
        if (name !== undefined && typeof name !== "string") {
            res.status(400);
            throw new Error("'name' deve ser uma string");
        }
        if (email !== undefined && typeof email !== "string") {
            res.status(400);
            throw new Error("'email' deve ser uma string");
        }
        if (password !== undefined && typeof password !== "string") {
            res.status(400);
            throw new Error("'password' deve ser uma string.");
        }
        const emailExists = yield (0, knexfile_1.db)("users").where({ email: email });
        if (emailExists) {
            res.status(409);
            throw new Error("Email já cadastrado em outro usuário.");
        }
        isEmailValid(email);
        isPasswordValid(password);
        const user = {
            name,
            email,
            password,
            created_at: createdAt
        };
        yield (0, knexfile_1.db)("users").insert(user);
        res.status(201).send("Usuário cadastrado com sucesso");
    }
    catch (error) {
        treatError(req, res, error);
    }
}));
app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
        if (!name || !price || !imageUrl) {
            res.status(400);
            throw new Error("Informações essênciais estão faltando.");
        }
        verifyProductInfo(name, res, price, description, imageUrl);
        const product = {
            name,
            price,
            description,
            image_url: imageUrl
        };
        yield (0, knexfile_1.db)("products").insert(product);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nameToFind = req.query.name;
    try {
        if (nameToFind) {
            if (nameToFind.length < 1) {
                throw new Error("'name' deve possuir no mínimo 1 caractere");
            }
            else {
                const result = yield (0, knexfile_1.db)("products").whereRaw('LOWER(name) LIKE ?', `%${nameToFind.toLowerCase()}%`)
                    .select('*');
                result.length !== 0 ?
                    res.status(200).send(result) :
                    res.status(404).send("Produto não encontrado");
            }
        }
        else {
            res.status(200).send(yield knexfile_1.db.select("*").from("products"));
        }
    }
    catch (error) {
        treatError(req, res, error);
    }
}));
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productToEdit = req.params.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImageUrl = req.body.imageUrl;
        const [product] = yield (0, knexfile_1.db)("products").where({ id: productToEdit });
        if (!product) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        verifyProductInfo(newName, res, newPrice, newDescription, newImageUrl);
        product.name = newName || product.name;
        product.price = isNaN(newPrice) ? product.price : newPrice;
        product.description = newDescription || product.description;
        product.image_url = newImageUrl || product.image_url;
        yield (0, knexfile_1.db)("products").update(product).where({ id: productToEdit });
        res.status(200).send("Produto alterado com sucesso");
    }
    catch (error) {
        treatError(req, res, error);
    }
}));
app.post('/purchases', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buyerId = req.body.buyerId;
        const products = req.body.products;
        const [buyerExists] = yield knexfile_1.db.select("id").from("users").where({ id: buyerId });
        if (!buyerExists) {
            res.status(404);
            throw new Error(`Buyer com 'id' ${buyerId} não existe`);
        }
        let totalPrice = 0;
        for (const product of products) {
            const [productInfo] = yield knexfile_1.db.select("price").from("products").where({ id: product.id });
            if (!productInfo) {
                res.status(404);
                throw new Error(`Produto com 'id' ${product.id} não encontrado`);
            }
            totalPrice += (productInfo.price * product.quantity);
        }
        const [purchaseId] = yield (0, knexfile_1.db)('purchases').insert({
            buyer_id: buyerId,
            total_price: totalPrice,
            created_at: new Date().toISOString()
        });
        console.log(purchaseId);
        const purchaseProducts = products.map((products) => ({
            purchase_id: purchaseId,
            product_id: products.id,
            quantity: products.quantity
        }));
        yield (0, knexfile_1.db)('purchases_products').insert(purchaseProducts);
        res.status(201).send("Compra feita com sucesso");
    }
    catch (error) {
        treatError(req, res, error);
    }
}));
app.delete("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseToDelete = req.params.id;
        const [purcheseExists] = yield (0, knexfile_1.db)("purchases").where({ id: purchaseToDelete });
        if (purcheseExists) {
            yield (0, knexfile_1.db)("purchases").del().where({ id: purchaseToDelete });
            res.status(200).send("Pedido deletado.");
        }
        else {
            res.status(404).send("Não há pedidos com esse id.");
        }
    }
    catch (error) {
        treatError(req, res, error);
    }
}));
app.get('/purchases/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToFind = req.params.id;
        const selectedPurchase = yield (0, knexfile_1.db)('purchases')
            .select('purchases.id AS purchaseId', 'purchases.buyer_id', 'purchases.total_price', 'purchases.created_at', 'products.id AS productId', 'products.name', 'products.price', 'products.description', 'products.image_url', 'purchases_products.quantity', 'users.id AS userId', 'users.name AS buyerName', 'users.email AS buyerEmail')
            .where({ purchaseId: idToFind })
            .innerJoin('purchases_products', 'purchaseId', 'purchases_products.purchase_id')
            .innerJoin('products', 'purchases_products.product_id', 'productId')
            .innerJoin('users', 'purchases.buyer_id', 'userId');
        if (!selectedPurchase[0]) {
            res.status(404);
            throw new Error("Pedido inexistente.");
        }
        const formattedPurchase = {
            purchaseId: selectedPurchase[0].purchaseId,
            buyerId: selectedPurchase[0].buyer_id,
            buyerName: selectedPurchase[0].buyerName,
            buyerEmail: selectedPurchase[0].buyerEmail,
            totalPrice: selectedPurchase[0].total_price,
            createdAt: selectedPurchase[0].created_at,
            products: selectedPurchase.map((product) => {
                return {
                    id: product.productId,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    imageUrl: product.image_url,
                    quantity: product.quantity
                };
            })
        };
        res.status(200).send(formattedPurchase);
    }
    catch (error) {
        treatError(req, res, error);
    }
}));
const isPasswordValid = (password) => {
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
        throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
    }
};
const isEmailValid = (email) => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("'email' está no formato inválido");
    }
};
function verifyProductInfo(newName, res, newPrice, newDescription, newImageUrl) {
    if (newName !== undefined && typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser uma string");
    }
    if (newPrice !== undefined && typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'price' deve ser um number");
    }
    if (newDescription !== undefined && typeof newDescription !== "string") {
        res.status(400);
        throw new Error("'description' deve ser uma string");
    }
    if (newImageUrl !== undefined && typeof newImageUrl !== "string") {
        res.status(400);
        throw new Error("'imageUrl' deve ser uma string.");
    }
    if (newPrice < 0) {
        res.status(400);
        throw new Error("O preço não pode ser negativo.");
    }
}
function treatError(req, res, error) {
    if (req.statusCode === null) {
        res.status(500);
    }
    if (error instanceof Error) {
        res.send(error.message);
    }
    else {
        res.send("Erro inesperado");
    }
}
//# sourceMappingURL=index.js.map