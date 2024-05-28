"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var WebClient = /** @class */ (function () {
    function WebClient(client) {
        this.client = client;
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
        this.app.use(express_1.default.static(path_1.default.resolve(__dirname, 'build')));
        this.app.set('view engine', 'ejs');
        this.app.set('views', path_1.default.join(__dirname, '/build'));
    }
    WebClient.prototype.start = function () {
        this.app.listen(3000, function () { return console.log('Listening on port 3000'); });
        this.registerEndpoints();
    };
    WebClient.prototype.registerEndpoints = function () {
        var _this = this;
        this.app.get('/api/ships', function (req, res) {
            var ships = [];
            _this.client.ships.cache.forEach(function (ship) {
                var _ = ship.client, shipData = __rest(ship, ["client"]);
                ships.push(shipData);
            });
            res.json(ships);
        });
    };
    return WebClient;
}());
exports.default = WebClient;
//# sourceMappingURL=WebClient.js.map