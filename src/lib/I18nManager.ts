import { DicoDataJSON } from "../types";

export class I18nManager<
	T extends DicoDataJSON["locale"],
	E extends string[] = T["locales"]
> {
	public master: T["master"];
	public locales: { [key in E[number]]: E[number] };
	public currentLocal: T["locales"][number];

	constructor(locale: T) {
		this.master = locale.master;

		// Turn ["a", "b", "c"] into { a: "a", b: "b", c: "c" }
		this.locales = locale.locales.reduce<{ [key in E[number]]: E[number] }>(
			(acc, current) => {
				acc[current as E[number]] = current;

				return acc;
			},
			{} as { [key in E[number]]: E[number] }
		);

		this.currentLocal = locale.master;
	}

	public setLocale(locale: E[number]): void {
		this.currentLocal = locale;
	}
}
