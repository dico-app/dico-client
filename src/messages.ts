export const CannotSetDicoData =
	"Assigning a value to `$dico` is not permitted";

export const UnknownLocale = (
	locale: string,
	locales: { [key: string]: string }
): string =>
	`Unknown locale \`${locale}\`, locale should be one of: ${Object.keys(locales)
		.map(i => `\`${i}\``)
		.join(", ")}`;
