"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var ShipStatus_1 = require("./ShipStatus");
var ShipFlightMode_1 = require("./ShipFlightMode");
var Ship = /** @class */ (function () {
    function Ship(client, data) {
        this.client = client;
        // TODO; Clean this mess up
        this.symbol = data.symbol;
        this.nav = data.nav;
        this.nav.status = ShipStatus_1.ShipStatus[data.nav.status];
        this.nav.flightMode = ShipFlightMode_1.ShipFlightMode[data.nav.flightMode];
        this.crew = data.crew;
        this.fuel = data.fuel;
        this.frame = data.frame;
        this.reactor = data.reactor;
        this.engine = data.engine;
        this.modules = data.modules;
        this.mounts = data.mounts;
        this.registration = data.registration;
        this.cargo = data.cargo;
    }
    /**
     * Sends the ship into orbit, fails if the ship is not docked
     */
    Ship.prototype.Orbit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.nav.status !== ShipStatus_1.ShipStatus.DOCKED)
                            return [2 /*return*/];
                        return [4 /*yield*/, axios_1.default.post("https://api.spacetraders.io/v2/my/ships/".concat(this.symbol, "/orbit"), {}, { headers: { Authorization: "Bearer ".concat(this.client.token) } })];
                    case 1:
                        _a.sent();
                        this.nav.status = ShipStatus_1.ShipStatus.IN_ORBIT;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Docks the ship, fails if the ship is already docked
     */
    Ship.prototype.Dock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.nav.status === ShipStatus_1.ShipStatus.DOCKED)
                            return [2 /*return*/];
                        return [4 /*yield*/, axios_1.default.post("https://api.spacetraders.io/v2/my/ships/".concat(this.symbol, "/dock"), {}, { headers: { Authorization: "Bearer ".concat(this.client.token) } })];
                    case 1:
                        _a.sent();
                        this.nav.status = ShipStatus_1.ShipStatus.DOCKED;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the flight mode of the ship
     * @param mode The flight mode to set the ship to
     */
    Ship.prototype.SetFlightMode = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.patch("https://api.spacetraders.io/v2/my/ships/".concat(this.symbol, "/nav"), {
                            flightMode: mode
                        }, { headers: { 'Content-Type': 'application/json', Authorization: "Bearer ".concat(this.client.token) } })];
                    case 1:
                        _a.sent();
                        this.nav.flightMode = mode;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Navigate to a waypoint within the system
     * @param waypoint The waypoint to navigate to
     */
    Ship.prototype.Navigate = function (waypoint) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.nav.status !== ShipStatus_1.ShipStatus.IN_ORBIT)
                            return [2 /*return*/];
                        return [4 /*yield*/, axios_1.default.post("https://api.spacetraders.io/v2/my/ships/".concat(this.symbol, "/navigate"), {
                                waypointSymbol: waypoint
                            }, { headers: { 'Content-Type': 'application/json', Authorization: "Bearer ".concat(this.client.token) } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Warp to a system if a warp drive is installed
     * @param system The system to warp to
     */
    Ship.prototype.Warp = function (system) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.nav.status !== ShipStatus_1.ShipStatus.IN_ORBIT)
                            return [2 /*return*/];
                        return [4 /*yield*/, axios_1.default.post("https://api.spacetraders.io/v2/my/ships/".concat(this.symbol, "/warp"), {
                                systemSymbol: system
                            }, { headers: { 'Content-Type': 'application/json', Authorization: "Bearer ".concat(this.client.token) } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Refuel ship from planet if fuel is available
     * @todo
     */
    Ship.prototype.Refuel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Extract resources from the planet/asteroid
     * @todo
     */
    Ship.prototype.Extract = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Order the ship to sell to the market
     * @todo
     */
    Ship.prototype.Sell = function (symbol, units) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return Ship;
}());
exports.default = Ship;
//# sourceMappingURL=Ship.js.map