import { createDico } from "../../src";
import data from "../dico.data.json";

export const $dico = createDico<typeof data>(data);
