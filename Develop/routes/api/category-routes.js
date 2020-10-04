const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['catagory_name'],
    // be sure to include its associated Products
    // include: [
    //   {
    //     model: Product,
    //     attributes: ['id', 'product_name', 'price', 'stock']
    //   }
    // ]
  })
  .then(dbCatagoryData => res.json(dbCatagoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
// be sure to include its associated Products
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbCatagoryData => {
    if (!dbCatagoryData) {
      res.status(404).json({ message: 'No catagory with that id.'});
      return;
    }
    res.json(dbCatagoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    name: req.body.name
  })
  .then(dbCatagoryData => res.json(dbCatagoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    where: {
      id: req.params.id
    }
  })
  .then(dbCatagoryData => {
    if (!dbCatagoryData) {
      res.status(404).json({ message: 'No catagory with this id'});
      return;
    }
    res.json(dbCatagoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCatagoryData => {
    if (!dbCatagoryData) {
      res.status(404).json({ message: 'No catagory with that id'});
      return;
    }
    res.json(dbCatagoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
