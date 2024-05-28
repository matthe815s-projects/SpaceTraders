'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = __importDefault(require("./client/Client"));
var fs_1 = require("fs");
if (!(0, fs_1.existsSync)('config.json')) {
    console.log('No config.json found, creating one');
    (0, fs_1.writeFileSync)('config.json', JSON.stringify({ token: '' }));
}
var config = JSON.parse((0, fs_1.readFileSync)('config.json', 'utf-8'));
var client = new Client_1.default();
client.Login(config.token);
client.on('ready', function () {
    console.log('Client ready');
    console.log("Current ship count: ".concat(client.ships.cache.size));
    console.log("Current system count: ".concat(client.systems.cache.size));
});
client.on('contractsLoad', function (contracts) {
    console.log("Current contract count: ".concat(contracts.length));
});
//# sourceMappingURL=index.js.map