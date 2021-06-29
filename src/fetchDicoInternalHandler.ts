import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import * as rc from "rc9";

import { API_ENDPOINT, CONFIG_FILE, DATA_FILE, RC_FILE } from "./const";
import { DicoError } from "./DicoError";
import * as messages from "./messages";
import detectIndent from "detect-indent";
import { lineBreak, logger } from "./lib";

/**
 *
 * Fetch dico internal handler
 *
 * @param base - Base directory where `dico.config.json` and `dico.data.json` can be found
 * @param output - Output directory relative to base where `dico.data.json` can be found
 *
 * @internal
 */
export const fetchDicoInternalHandler = async (
	base = "./",
	output = "./"
): Promise<void> => {
	const configPath = path.join(process.cwd(), base, CONFIG_FILE);
	if (!fs.existsSync(configPath)) {
		throw new DicoError(messages.ConfigFileNotFound(configPath));
	}

	const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
	if (!config.dico) {
		throw new DicoError(
			messages.ConfigFileInvalid(configPath, "(field `dico` is empty)")
		);
	}

	const rcConfig = rc.readUser(RC_FILE);
	const response = await fetch(
		`${rcConfig.endpoint || API_ENDPOINT}/public/${config.dico}`
	);

	if (!response.ok && response.status !== 404) {
		throw response;
	}

	const json = await response.json();

	const defaultData = {
		locale: { master: "en-us", locales: { "en-us": "en-us" } },
		data: {}
	};

	let data = json.data;
	if (json.status === 404) {
		logger.warn(messages.Fetch404Error(config.dico));
		data = defaultData;
	} else {
		lineBreak();
	}

	const dataPath = path.join(process.cwd(), base, output, DATA_FILE);
	let indent = "  ";
	if (fs.existsSync(dataPath)) {
		indent = detectIndent(fs.readFileSync(dataPath, "utf8")).indent || "  ";
	}

	fs.writeFileSync(dataPath, `${JSON.stringify(data, null, indent)}\n`, "utf8");
	logger.success(messages.DataFileUpdated);
	lineBreak();
};
