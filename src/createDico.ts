import { DICO_KEY_RESERVED_KEY } from "./const";
import { DicoError } from "./DicoError";
import { I18nManager } from "./lib/I18nManager";
import { CannotSetDicoData } from "./messages";
import { CreateInfiniteDicoData, DicoDataJSON, UnknownDicoData } from "./types";

/**
 * Handle unknown key in current dico
 *
 * @param key - The previous key
 *
 * @returns A deep proxy handling unknown key
 */
const infinite = (key: string): UnknownDicoData =>
	new Proxy<{ [key: string]: unknown }>(
		{ key },
		{
			get(target, key, _) {
				if (key === Symbol.toPrimitive) {
					return () => `$dico.${target.key}`;
				}

				return infinite(key.toString());
			},
			set(_, __, ___, ____) {
				throw new DicoError(CannotSetDicoData);
			}
		}
	);

/**
 * Take current dico data and turn it into an infinite dico
 *
 * @param dicoData - Dico data to work with
 *
 * @returns A deep proxy serving current dico data and unexisting ones
 */
const createInfiniteDico = <T extends DicoDataJSON>(
	i18nManager: I18nManager<T["locale"]>,
	dicoData: T["data"]
): CreateInfiniteDicoData<T["data"]> => {
	return new Proxy<CreateInfiniteDicoData<T["data"]>>(
		dicoData as CreateInfiniteDicoData<T["data"]>,
		{
			get(target, key, receiver) {
				const result = Reflect.get(target, key, receiver);

				if (result === null || typeof result === "undefined") {
					return infinite(key.toString());
				}

				if (typeof result === "object") {
					if (DICO_KEY_RESERVED_KEY in result) {
						const dicoKey = result[DICO_KEY_RESERVED_KEY];
						if (
							i18nManager.currentLocal in dicoKey &&
							dicoKey[i18nManager.currentLocal]
						) {
							return dicoKey[i18nManager.currentLocal];
						} else if (
							i18nManager.master in dicoKey &&
							dicoKey[i18nManager.master]
						) {
							return dicoKey[i18nManager.master];
						} else {
							return `$dico.${key.toString()}`;
						}
					} else {
						return createInfiniteDico(i18nManager, result);
					}
				}

				return result;
			},
			set(_, __, ___, ____) {
				throw new DicoError(CannotSetDicoData);
			}
		}
	);
};

/**
 * Create your very own `$dico` object
 *
 * @param dicoData - Dico data from a dico.data.json
 *
 * @returns The `$dico` object
 */
export const createDico = <
	DicoData extends DicoDataJSON = DicoDataJSON,
	ExplicitLocaleEnum extends string[] = DicoData["locale"]["locales"]
>(
	dicoData: DicoData
): {
	$dicoI18n: I18nManager<DicoData["locale"], ExplicitLocaleEnum>;
	$dico: CreateInfiniteDicoData<DicoData["data"]>;
} => {
	const $dicoI18n = new I18nManager<DicoData["locale"], ExplicitLocaleEnum>(
		dicoData.locale as Readonly<DicoData["locale"]>
	);

	const $dico = createInfiniteDico<DicoData>($dicoI18n, dicoData.data);

	return { $dicoI18n, $dico };
};
