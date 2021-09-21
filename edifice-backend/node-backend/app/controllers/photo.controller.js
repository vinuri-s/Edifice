const db = require("./../models/index.js");
const Photo = db.photo;
const Op = db.Sequelize.Op;

// Create and save a new Photo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Photo
  const project = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    path: req.body.path,
    projectId: req.body.projectId,
  };

  // Save Photo in the database
  Photo.create(project)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Photo."
      });
    });
};

// Get photos for a given project
exports.getAll = (req, res) => {
  const id = req.params.id;

  Photo.findAll({ where: {
    projectId: id
  }})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Drawing Drawings with id=" + id
      });
    });  
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Photo.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving projects."
        });
      });
};

// Find a single Photo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Photo.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Photo with id=" + id
        });
      });  
};

//get the last project 
exports.findLastOne = (req,res) =>{
   Photo.findAll({
     limit: 1,
     order: [['id', 'DESC']]
   })
   .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving projects."
    });
  });
}

// Get drawings for a given category
exports.findAllCat = (req, res) => {
    const id = req.params.id;
  
    Photo.findAll({ where: {
      category: id
    }})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Project Album with id=" + id
        });
      });  
  };

// Update a Photo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Photo.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Photo was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Photo with id=${id}. Maybe Photo was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Photo with id=" + id
        });
      });
};

// Delete a Photo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Photo.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Photo was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Photo with id=${id}. Maybe Photo was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Photo with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Photo.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
};
