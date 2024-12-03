const Joi = require('joi');
const {valid} = require("joi");
const data = require("./data.json");

const schema = Joi.object({
    info: Joi.object({
        erstellt: Joi.date().iso().required().messages({
            'date.base': '"erstellt" muss ein gültiges Datum sein',
            'any.required': '"erstellt" ist ein Pflichtfeld'
        }),
        verein: Joi.string().required().messages({
            'string.base': '"verein" muss ein String sein',
            'any.required': '"verein" ist ein Pflichtfeld'
        }),
        ipaddresse: Joi.string().ip({ version: ['ipv4'] }).required().messages({
            'string.base': '"ipaddresse" muss ein String sein',
            'string.ip': '"ipaddresse" muss eine gültige IPv4-Adresse sein',
            'any.required': '"ipaddresse" ist ein Pflichtfeld'
        })
    }).required(),
    anmeldung: Joi.object({
        Anrede: Joi.string().valid('Herr', 'Frau', 'Divers').required().messages({
            'any.only': '"Anrede" muss Herr, Frau oder Divers sein',
            'any.required': '"Anrede" ist ein Pflichtfeld'
        }),
        Familienname: Joi.string().required(),
        Vorname: Joi.string().required(),
        Strasse: Joi.string().required(),
        Plz: Joi.string().pattern(/^\d{4,5}$/).required().messages({
            'string.pattern.base': '"Plz" muss 4-5 Ziffern enthalten'
        }),
        Ort: Joi.string().required(),
        Land: Joi.string().required(),
        Telefon: Joi.string().allow('').optional(),
        Telefax: Joi.string().allow('').optional(),
        "Mail-Adresse": Joi.string().email().allow('').optional()
    }).required(),
    teilnehmer: Joi.array().items(
        Joi.object({
            Nachname: Joi.string().required(),
            Vorname: Joi.string().required(),
            Altersklasse: Joi.string().required(),
            Klasse: Joi.string().required(),
            Startzeit: Joi.string().valid('Vormittag', 'Nachmittag').required().messages({
                'any.only': '"Startzeit" muss Vormittag oder Nachmittag sein'
            })
        })
    ).required()
});

function validateData(data) {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        console.error('Fehler beim Validieren:', error.details.map(err => err.message));
    } else {
        console.log('Daten Valide!');
    }
}

validateData(data);
