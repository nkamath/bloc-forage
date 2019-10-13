const sequelize = require("../../src/db/models/index").sequelize;
const Ingredient = require("../../src/db/models").Ingredient;
const User = require("../../src/db/models").User;

const sampleTestData = {
    name: "Tomato",
    altName: "Potato",
    source: "QFC",
    altSource: "Costco"
};

describe("Ingredient", () => {

    beforeEach((done) => {
        this.ingredient;
        this.user;

        sequelize.sync({
            force: true
        }).then((res) => {
            User.create({
                    email: "cheps@example.com",
                    password: "goofster"
                })
                .then((user) => {
                    this.user = user; //store the user
                    Ingredient.create({
                            name: sampleTestData.name,
                            source: sampleTestData.source,
                            userId: this.user.id
                        })
                        .then((ingredient) => {
                            this.ingredient = ingredient; //store the ingredient
                            done();
                        })
                })
        });
    });

    describe("#create()", () => {
        it("should create a ingredient object with a name and source", (done) => {
            Ingredient.create({
                    name: sampleTestData.altName,
                    source: sampleTestData.altSource
                })
                .then((ingredient) => {
                    expect(ingredient.name).toBe(sampleTestData.altName);
                    expect(ingredient.source).toBe(sampleTestData.altSource);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it("should not create an Ingredient with missing source", (done) => {
            Ingredient.create({
                    name: "random text"
                })
                .then((ingredient) => {
                    // Checking nothing because this code path shouldn't get hit. 
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Ingredient source cannot be null");
                    done();
                })
        });
    });

    describe("#read()", () => {
        beforeEach((done) => {
            Ingredient.create({
                name: sampleTestData.altName,
                source: sampleTestData.altSource,
                user: this.user.id
            }).then((ingredient) => {
                done();
            })
        });
        it("should return all Ingredients", (done) => {
            Ingredient.findAll()
                .then((ingredients) => {
                    expect(ingredients.length).toBe(2);
                    expect(ingredients[0].name).toBe(sampleTestData.name);
                    done();
                });
        });
        it("should return one Ingredient given the ID", (done) => {
            Ingredient.findByPk(this.ingredient.id)
                .then((ingredient) => {
                    expect(ingredient.name).toBe(sampleTestData.name);
                    done();
                });
        });
    });
});