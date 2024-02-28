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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.createCategory = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../Config/sql.config");
const uuid_1 = require("uuid");
exports.createCategory = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create a pool connection
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        // Check if pool connection was created
        if (pool.connected) {
            // Generate a unique id for 
            const categoryId = (0, uuid_1.v4)();
            // Get the category data from the req.body
            const categoryDetails = req.body;
            const result = (yield pool.request()
                .input('categoryId', mssql_1.default.VarChar, categoryId)
                .input('categoryName', mssql_1.default.VarChar, categoryDetails.categoryName)
                .execute('createCategory')).rowsAffected;
            if (result[0] > 0) {
                res.status(200).json({
                    success: "Category created successfuly"
                });
            }
            else {
                res.status(201).json({
                    error: "Could not create category"
                });
            }
        }
        else {
            res.status(500).json({
                error: "Could not create pool connection"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
}));
exports.getAllCategories = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a pool connection
    const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
    // check if the pool connection has been made
    if (pool.connected) {
        // Query the db for all categories
        const categories = (yield pool.request()
            .query('SELECT * FROM Categories')).recordset;
        if (categories.length >= 1) {
            res.status(200).json({
                categories
            });
        }
        else {
            res.status(201).json({
                error: "No products available"
            });
        }
    }
    else {
        res.status(500).json({
            error: "Could not create pool connection"
        });
    }
}));
