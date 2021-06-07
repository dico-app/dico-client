import { UnknownLocale } from "./messages";
import { DicoDataJSON } from "./types";

/**
 * Manage current dico locale
 */
export class I18nManager<T extends DicoDataJSON["locale"]> {
	public master: T["master"];
	public locales: T["locales"];
	public currentLocal: keyof T["locales"];

	constructor({ master, locales }: T) {
		this.master = master;

		this.locales = locales;

		this.currentLocal = master;
	}

	/**
	 * Set dico current locale
	 *
	 * @param locale - New current locale, use `$dicoI18n.locales` to know available ones
	 *
	 * @example
	 * ```
	 * $dicoI18n.setLocale($dicoI18n.locales["fr-fr"])
	 * ```
	 */
	public setLocale(locale: string): void {
		if (!(locale in this.locales)) {
			console.warn(UnknownLocale(locale, this.locales));
		}

		this.currentLocal = locale;
	}
}
