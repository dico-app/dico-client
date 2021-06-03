import { DicoError } from "./DicoError";
import { CannotSetDicoData } from "./messages";

interface InfiniteDico {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: InfiniteDico | any;
}

type CreateInfiniteDico<T extends { [key: string]: unknown }> = {
	[key in keyof T]: T[key] extends { [key: string]: unknown }
		? CreateInfiniteDico<T[key]>
		: T[key];
} &
	InfiniteDico;

const undef = (name: string): { [key: string]: unknown } =>
	new Proxy<{ [key: string]: unknown }>(
		{ name },
		{
			get(target, key, _) {
				if (key === Symbol.toPrimitive) {
					return () => `$dico.${target.name}`;
				}

				return undef(key.toString());
			},
			set(_, __, ___, ____) {
				throw new DicoError(CannotSetDicoData);
			}
		}
	);

export const createDico = <
	DicoData extends { [key: string]: unknown } = { [key: string]: unknown }
>(
	dicoData: DicoData
): CreateInfiniteDico<DicoData> => {
	return new Proxy(dicoData, {
		get(target, key, receiver) {
			const result = Reflect.get(target, key, receiver);

			if (result === null || typeof result === "undefined") {
				return undef(key.toString());
			}

			if (typeof result === "object") {
				return createDico<DicoData>(result);
			}

			return result;
		},
		set(_, __, ___, ____) {
			throw new DicoError(CannotSetDicoData);
		}
	}) as CreateInfiniteDico<DicoData>;
};
