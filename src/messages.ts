import { CONFIG_FILE, DATA_FILE } from "./const";

export const CannotSetDicoData =
	"Assigning a value to `$dico` is not permitted";

export const UnknownLocale = (
	locale: string,
	locales: { [key: string]: string }
): string =>
	`Unknown locale \`${locale}\`, locale should be one of: ${Object.keys(locales)
		.map(i => `\`${i}\``)
		.join(", ")}`;

export const ConfigFileNotFound = (path: string): string =>
	`\`${CONFIG_FILE}\` not found at \`${path}\``;

export const ConfigFileInvalid = (path: string, reason = ""): string =>
	`\`${CONFIG_FILE}\` at \`${path}\` is not valid${reason}`;

export const Fetch404Error = (slug: string): string =>
	`\`404 Not Found\` happened while fetching dico \`${slug}\`\nThis most likely occured because this dico has never been published\nUsing default data in the meantime...`;

export const DataFileUpdated = `\`${DATA_FILE}\` updated`;
