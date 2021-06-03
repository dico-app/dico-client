import exit from "exit";

import { logger } from "./lib";

const run = async (): Promise<void> => {
	console.log("Hello World");
};

process.on("unhandledRejection", error => {
	logger.fatal(error);
	exit(2);
});

run();
