import { createDico } from "../../src";
import data from "../dico.data.json";

export const { $dico, $dicoI18n } = createDico(data);
