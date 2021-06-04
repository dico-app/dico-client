export interface DicoKey {
	___key: { [key: string]: string };
}

export interface UnknownDicoData {
	[key: string]: unknown;
}

export interface InfiniteDicoData {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: InfiniteDicoData | any;
}

export type CreateInfiniteDicoData<T extends { [key: string]: unknown }> = {
	[key in keyof T]: T[key] extends UnknownDicoData
		? T[key] extends DicoKey
			? string
			: CreateInfiniteDicoData<T[key]>
		: T[key];
} &
	InfiniteDicoData;

export interface DicoDataJSON<
	MasterLocale extends string = string,
	AllLocales extends { [key: string]: string } = { [key: string]: string },
	DicoData extends UnknownDicoData = UnknownDicoData
> {
	locale: {
		master: MasterLocale;
		locales: AllLocales;
	};
	data: DicoData;
}
