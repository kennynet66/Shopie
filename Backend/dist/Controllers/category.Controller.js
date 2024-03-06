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
exports.getCategoryDetails = exports.getAllCategories = exports.createCategory = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../Config/sql.config");
const uuid_1 = require("uuid");
const category_validator_1 = require("../Validators/category.validator");
exports.createCategory = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generate a unique id for 
        const categoryId = (0, uuid_1.v4)();
        // Get the category data from the req.body
        const categoryDetails = req.body;
        // Verify the data using joi
        let { error } = category_validator_1.newCategorySchema.validate(categoryDetails);
        if (error) {
            return res.status(202).json({
                error: error.details[0].message
            });
        }
        else {
            // Create a pool connection
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const result = (yield pool.request()
                .input('categoryId', mssql_1.default.VarChar, categoryId)
                .input('categoryName', mssql_1.default.VarChar, categoryDetails.categoryName)
                .input('categoryImage', mssql_1.default.VarChar(), categoryDetails.categoryImage)
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
    // Query the db for all categories
    const categories = (yield pool.request()
        .execute('getAllCategories')).recordset;
    // if(categories.length >=1){
    res.status(200).json({
        success: "Found some categories",
        categories
    });
    // } else {
    //     res.status(201).json({
    //         error: "No products available"
    //     })
    // }
}));
exports.getCategoryDetails = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        const result = (yield pool.request()
            .input("categoryId", mssql_1.default.VarChar, categoryId)
            .execute('getCategoryDetails')).recordset;
        if (result.length >= 1) {
            return res.status(200).json({
                result
            });
        }
        else {
            return res.status(200).json({
                error: "Category not found"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}));
