"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    res.send(200, 'Service is up');
    return next();
};
//# sourceMappingURL=health.js.map