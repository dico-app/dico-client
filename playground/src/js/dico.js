const { createDico } = require("../../../dist");
const data = require("../../dico.data.json");

const { $dico, $dicoI18n } = createDico(data);

exports.$dico = $dico;
exports.$dicoI18n = $dicoI18n;
