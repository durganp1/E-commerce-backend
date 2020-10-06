const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
// be sure to include its associated Category and Tag data
Product.findAll({
  attributes: ['id', 'product_name', 'price', 'stock'],
  include: [
    {
      model: Category,
      attributes: ['id']
    },
    {
      model: Tag,
      attributes: ['tag_name'],
      //through: ProductTag,
      as: 'product_tags'
    }
  ]
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ['id']
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        as: 'product_tags'
      }
    ]
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No product found with that id.'});
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
    }
  */
  Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});
    
     

// update product
router.put('/:id',(req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No product with this id.'});
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  
    
    

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No product with this id'});
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
