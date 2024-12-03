const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const schema = require("./schema.json");
const data = require("./data.json");

const ajv = new Ajv();
addFormats(ajv);

function validateData(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (valid) {
        console.log("Die Daten sind valide.");
    } else {
        console.error("Validierungsfehler:", validate.errors);
    }
}

validateData(schema, data);