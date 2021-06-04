import { DicoError } from "../DicoError";
import { UnknownLocale } from "../messages";
import { DicoDataJSON } from "../types";

export class I18nManager<T extends DicoDataJSON["locale"]> {
	public master: T["master"];
	public locales: T["locales"];
	public currentLocal: keyof T["locales"];

	constructor({ master, locales }: T) {
		this.master = master;

		this.locales = locales;

		this.currentLocal = master;
	}

	public setLocale(locale: string): void {
		if (locale in this.locales) {
			this.currentLocal = locale;
		} else {
			throw new DicoError(UnknownLocale(locale, this.locales));
		}
	}
}
