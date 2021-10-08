"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./app/routes"));
const config_1 = __importDefault(require("./config"));
const monitoring_1 = require("./monitoring");
const port = config_1.default.PORT;
routes_1.default.listen(port, () => monitoring_1.logger.info(`Server is running on ${port}`));
//# sourceMappingURL=index.js.map