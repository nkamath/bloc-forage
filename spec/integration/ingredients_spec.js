const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ingredients/";
const sequelize = require("../../src/db/models/index").sequelize;
const Ingredient = require("../../src/db/models").Ingredient;
const User = require("../../src/db/models").User;

const sampleTestData = {
    name: "Tomato",
    altName: "Potato",
    source: "QFC",
    altSource: "Costco"
};

describe("routes : ingredients", () => {
    beforeEach((done) => {
        this.ingredient;
        this.user;

        sequelize.sync({
            force: true
        }).then((res) => {
            User.create({
                    email: "cheps@example.com",
                    password: "mypassword"
                })
                .then((user) => {
                    this.user = user; //store the user
                    Ingredient.create({
                            name: sampleTestData.name,
                            body: sampleTestData.source, 
                            userId: this.user.id
                        })
                        .then((ingredient) => {
                            this.ingredient = ingredient;
                            done();
                        })
                })
        });
    });

  describe("GET /ingredients", () => {

    it("should return a status code 200 and return all ingredients", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain(sampleTestData.name);
        done();
      });
    });
  });

  describe("GET /ingredients/new", () => {

    it("should render a new ingredient form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Ingredient");
        done();
      });
    });

  });
  
  describe("POST /ingredients/new", () => {
    const options = {
      url: `${base}new`,
      form: {
        name: sampleTestData.name,
        source: sampleTestData.source
      }
    };

    it("should create a new ingredient and redirect", (done) => {

      request.post(options,
        (err, res, body) => {
          Ingredient.findOne({where: {name: sampleTestData.name}})
          .then((ingredient) => {
            expect(res.statusCode).toBe(303);
            expect(ingredient.name).toBe(sampleTestData.name);
            expect(ingredient.source).toBe(sampleTestData.source);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /ingredients/:id", () => {

    it("should render a view with the selected ingredient", (done) => {
      request.get(`${base}${this.ingredient.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain(sampleTestData.name);
        done();
      });
    });

  });

  describe("POST /ingredients/:id/destroy", () => {

    it("should delete the ingredient with the associated ID", (done) => {
      Ingredient.findAll()
      .then((ingredients) => {
        const ingredientCountBeforeDelete = ingredients.length;

        expect(ingredientCountBeforeDelete).toBe(1);
        request.post(`${base}${this.ingredient.id}/destroy`, (err, res, body) => {
          Ingredient.findAll()
          .then((ingredients) => {
            expect(err).toBeNull();
            expect(ingredients.length).toBe(ingredientCountBeforeDelete - 1);
            done();
          })

        });
      });

    });

  });

  describe("GET /ingredients/:id/edit", () => {

    it("should render a view with an edit ingredient form", (done) => {
      request.get(`${base}${this.ingredient.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Ingredient");
        expect(body).toContain(sampleTestData.name);
        done();
      });
    });

  });

  describe("POST /ingredients/:id/update", () => {

    it("should update the ingredient with the given values", (done) => {
       const options = {
          url: `${base}${this.ingredient.id}/update`,
          form: {
            name: sampleTestData.altName
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();
          Ingredient.findOne({
            where: { id: this.ingredient.id }
          })
          .then((ingredient) => {
            expect(ingredient.name).toBe(sampleTestData.altName);
            done();
          });
        });
    });

  });

});

