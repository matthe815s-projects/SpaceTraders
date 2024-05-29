"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var fs_1 = require("fs");
var events_1 = __importDefault(require("events"));
var ShipManager_1 = __importDefault(require("./ships/ShipManager"));
var SystemManager_1 = __importDefault(require("./systems/SystemManager"));
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.token = '';
        _this.ships = new ShipManager_1.default(_this);
        _this.systems = new SystemManager_1.default(_this);
        _this.agent = {};
        _this.contracts = [];
        return _this;
    }
    Client.prototype.Register = function (symbol, faction) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Registering ".concat(symbol, " to ").concat(faction));
                        return [4 /*yield*/, axios_1.default.post('https://api.spacetraders.io/v2/register', { symbol: symbol, faction: faction }, { headers: { 'Content-Type': 'application/json' } })];
                    case 1:
                        response = _a.sent();
                        console.log(response.data);
                        console.log("Agent registered with token: ".concat(response.data.token));
                        (0, fs_1.writeFileSync)('config.json', JSON.stringify({ token: response.data.token }));
                        // TODO; Register space-agent
                        this.token = response.data.token;
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.Login = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // Fetch agent details from token
                        _a = this;
                        return [4 /*yield*/, axios_1.default.get('https://api.spacetraders.io/v2/my/agent', { headers: { Authorization: "Bearer ".concat(token) } })];
                    case 1:
                        // Fetch agent details from token
                        _a.agent = (_b.sent()).data.data;
                        this.token = token;
                        return [4 /*yield*/, this.ships.fetch()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.systems.fetchAll()];
                    case 3:
                        _b.sent();
                        this.emit('ready');
                        return [4 /*yield*/, this.GetContracts()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.GetFactions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get('https://api.spacetraders.io/v2/factions', { headers: { Authorization: "Bearer ".concat(this.token) } })];
                    case 1:
                        response = (_a.sent()).data;
                        console.log(response.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    // TODO; Move to independent manager class
    Client.prototype.GetContracts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get('https://api.spacetraders.io/v2/my/contracts', { headers: { Authorization: "Bearer ".concat(this.token) } })];
                    case 1:
                        response = (_a.sent()).data;
                        this.contracts = response.data;
                        this.emit('contractsLoad', this.contracts);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Client;
}(events_1.default));
exports.default = Client;
//# sourceMappingURL=Client.js.map
