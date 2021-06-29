import exit from "exit";
import { DicoError } from "./DicoError";

import { fetchDicoInternalHandler } from "./fetchDicoInternalHandler";
import { logger } from "./lib";

const run = async (): Promise<void> => {
	const args = process.argv.slice(2);

	let base = "./";
	let output = "./";

	if (args.length) {
		base = args[0];

		if (args[1]) {
			output = args[1];
		}
	}

	try {
		await fetchDicoInternalHandler(base, output);
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
