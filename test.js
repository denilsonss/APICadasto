// import * as Yup from 'yup';
const Yup = require("Yup");

const productSchema = Yup.object({
    name: Yup.string().required(),
})

const product1 = { name: 'The Imitation Game'};
const product2 = { title: 'The theory of Everything'};

await pessoasSchema
.isValid(product1)
.then((isValid) => console.log(`product1 valid? ${isValid}`));

productSchema
.isValid(product2)
.then((isValid) => console.log(`product1 valid? ${isValid}`));