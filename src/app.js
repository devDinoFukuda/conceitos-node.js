const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  
  return response.json(repositories)
  
}); //ok

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repository);

  return response.json(repository)
}); //ok

app.put("/repositories/:id", (request, response) => {
  
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoriesId = repositories.findIndex(repository => repository.id === id);
  if (repositoriesId <0 ) {
    return response.status(400).json({error: 'Invalid Id.'})
  }

  const repository = { id, title, url, techs,
    //puxa o número de likes sem alterar
    likes : repositories[repositoriesId].likes  
  };
  repositories[repositoriesId] = repository;

  return response.json(repository);


}); //ok

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoriesId = repositories.findIndex(
    repository => repository.id === id);

    if(repositoriesId < 0) {
      return response.status(400).json({error: 'Invalid Id'});
    }

    repositories.splice(repositoriesId, 1);

    return response.status(204).send()
   
}); //ok

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositoriesId = repositories.findIndex(
    repository => repository.id === id
    );

    if (repositoriesId === -1 ) {
      return response.status(400).json({error: 'Invalid Id.'})
    }

      repositories[repositoriesId].likes++;
      return response.json(repositories[repositoriesId]);

}); //ok

module.exports = app;
