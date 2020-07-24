const express = require("express");
const Celebrity = require("../models/celebrity");

const celebritiesRouter = new express.Router();

celebritiesRouter.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/index", { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.post("/", (req, res, next) => {
  console.log("post request to /celebrities made");
  const data = req.body;
  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase,
  })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.get("/create", (req, res) => {
  res.render("celebrities/create");
});

celebritiesRouter.post("/:id/delete", (req, res, next) => {
  console.log("hit delete route");
  const id = req.params.id;
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      next(error);
    });
});

celebritiesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/show", { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = celebritiesRouter;
