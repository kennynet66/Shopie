"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sql_config_1 = require("./Config/sql.config");
const mssql_1 = __importDefault(require("mssql"));
const product_Routes_1 = __importDefault(require("./Routes/product.Routes"));
const category_Routes_1 = __importDefault(require("./Routes/category.Routes"));
const user_router_1 = __importDefault(require("./Routes/user.router"));
const auth_router_1 = __importDefault(require("./Routes/auth.router"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, express_1.json)());
// Import product routes
app.use('/products', product_Routes_1.default);
// Import category routes
app.use('/categories', category_Routes_1.default);
const PORT = process.env.PORT;
app.use('/user', user_router_1.default);
app.use('/auth', auth_router_1.default);
app.use((error, req, res, next) => {
    res.status(500).json({
        error
    });
});
mssql_1.default.connect(sql_config_1.sqlConfig, (err, connect, req, res) => {
    if (err) {
        res === null || res === void 0 ? void 0 : res.status(500).json({
            err
        });
    }
    else if (connect) {
        console.log("connected to mssql db");
        const PORT = process.env.PORT;
        app.listen(PORT, () => {
            console.log('App is listening on port', PORT);
        });
    }
});
