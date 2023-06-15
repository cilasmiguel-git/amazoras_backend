import express from 'express';
import Product from '../models/productModel';
import { getToken,isAuth,isAdmin } from '../util';

const router = express.Router();

// Rota para obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os produtos' });
  }
});

// Rota para obter um produto pelo ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o produto' });
  }
});

// Rota para criar um novo produto
router.post('/', isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o produto' });
  }
});

// Rota para atualizar um produto
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.image = req.body.image || product.image;
      product.brand = req.body.brand || product.brand;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.description = req.body.description || product.description;
      product.rating = req.body.rating || product.rating;
      product.numReviews = req.body.numReviews || product.numReviews;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
      console.log(product.name)
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o produto' });
  }
});

// Rota para excluir um produto
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.json({ message: 'Produto excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o produto' });
  }
});

export default router;