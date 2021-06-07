import exit from "exit";
import { DicoError } from "./DicoError";

import { fetchDicoInternalHandler } from "./fetchDicoInternalHandler";
import { logger } from "./lib";

const run = async (): Promise<void> => {
	const args = process.argv.slice(2);

	let base = "./";

	if (args.length) {
		base = args[0];
	}

	try {
		await fetchDicoInternalHandler(base);
	} catch (error) {
		if (error instanceof DicoError) {
			logger.error(error);
			exit(1);
		} else {
			throw error;
		}
	}
};

process.on("unhandledRejection", error => {
	logger.fatal(error);
	exit(2);
});

run();
