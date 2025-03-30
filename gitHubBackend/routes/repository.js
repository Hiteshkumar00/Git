import express from "express";
import repositoryController from "../controllers/repository.js";

const repositoryRouter = express.Router();

repositoryRouter.post("/create", repositoryController.createRepository);
repositoryRouter.get("/all", repositoryController.getAllRepositories);
repositoryRouter.get("/id/:id", repositoryController.getRepositoryById);
repositoryRouter.get("/name/:name", repositoryController.getRepositoriesByUser);
repositoryRouter.get("/user/:user", repositoryController.getRepositoriesByUser);
repositoryRouter.put("/update/:id", repositoryController.updateRepositoryById);
repositoryRouter.patch("/toggle/:id", repositoryController.toggleVisibilityById);
repositoryRouter.delete("/delete/:id", repositoryController.deleteRepositoryById);



export default repositoryRouter;