"use strict";
/*
    @ createProduct - This is afunction that gets the details of a product and stores them in the DB
    @ getAllProducts - Queries the database and returns all the available products
    @ getOneProduct - Gets the details of one product from the db using it's id
    @ deleteProduct - Deletes the product from the db using it's id
    @ getCategoryProducts - Gets all products in a certain category by the category id
 */
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
exports.updateProduct = exports.getCategoryProducts = exports.deleteProduct = exports.getOneProduct = exports.getAllProducts = exports.createProduct = void 0;
const mssql_1 = __importDefault(require("mssql"));
const sql_config_1 = require("../Config/sql.config");
const uuid_1 = require("uuid");
const product_validator_1 = require("../Validators/product.validator");
exports.createProduct = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the request body
        const product = req.body;
        // Generate a unique id for each product
        const productId = (0, uuid_1.v4)();
        // Validate the data using joi
        const { error } = product_validator_1.newProductSchema.validate(req.body);
        if (error) {
            return res.json({
                error: error.details[0].message
            });
        }
        else {
            // Create a pool connection
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            // Check if the pool connection was made
            if (pool.connected) {
                // Send the data to the database
                const result = (yield pool.request()
                    .input('productId', mssql_1.default.VarChar, productId)
                    .input('productName', mssql_1.default.VarChar, product.productName)
                    .input('descr', mssql_1.default.VarChar, product.descr)
                    .input('productQuantity', mssql_1.default.Int, product.productQuantity)
                    .input('productImage', mssql_1.default.VarChar, product.productImage)
                    .input('productCategory', mssql_1.default.VarChar, product.productCategory)
                    .input('productPrice', mssql_1.default.Money, product.productPrice)
                    .execute('createProduct')).rowsAffected;
                // Get and act according to the result
                if (result[0] > 0) {
                    res.status(201).json({
                        success: "Product created successfully"
                    });
                }
                else {
                    res.status(201).json({
                        error: "Problem while creating the product"
                    });
                }
            }
            else {
                // Return an error if there was an issue when creating the connection
                return res.status(500).json({
                    error: "Could not create pool connection"
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
exports.getAllProducts = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a pool connection
    const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
    // Check if the pool onnection has been made
    if (pool.connected) {
        // Query the db for all the products
        const products = (yield pool.request()
            .execute('getAllProducts')).recordset;
        if (products.length >= 1) {
            res.status(200).json({
                products
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
exports.getOneProduct = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        if (pool.connected) {
            // Get the product Id from the req params
            const productId = req.params.productId;
            const products = (yield pool.request()
                .input('productId', mssql_1.default.VarChar, productId)
                .execute('getOneProduct')).recordset;
            // Verify if it found the product with the provided id
            if (products.length >= 1) {
                res.status(200).json({
                    products
                });
            }
            else {
                res.status(201).json({
                    error: "Could not find the product"
                });
            }
        }
        else {
            // Return an error if there was an issue when creating the connection
            return res.status(500).json({
                error: "Could not create pool connection"
            });
        }
    }
    catch (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}));
exports.deleteProduct = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        if (pool.connected) {
            // Get the product id from the params
            const productId = req.params.productId;
            const result = (yield pool.request()
                .input('productId', mssql_1.default.VarChar, productId)
                .execute('deleteProduct')).rowsAffected;
            if (result[0] > 0) {
                return res.status(200).json({
                    success: "Product deleted"
                });
            }
        }
        else {
            // Return an error if there was an issue when creating the connection
            return res.status(500).json({
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
exports.getCategoryProducts = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the id from the params
        const categoryId = req.params.categoryId;
        // Create a pool connection
        const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
        // Query the db to get all the products that match the category id
        const products = (yield pool.request()
            .input('categoryId', mssql_1.default.VarChar(), categoryId)
            .execute('getCategoryProducts')).recordset;
        if (products.length >= 1) {
            res.status(200).json({
                products
            });
        }
        else {
            res.status(201).json({
                error: "No products in this category"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error
        });
    }
}));
exports.updateProduct = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the request body
        const product = req.body;
        const { error } = product_validator_1.updateProductSchema.validate(req.body);
        if (error) {
            res.status(201).json({
                error: error.details[0].message
            });
        }
        else {
            // Get the product Id from the request params
            const productId = req.params.productId;
            const pool = yield mssql_1.default.connect(sql_config_1.sqlConfig);
            const result = (yield pool.request()
                .input('productId', mssql_1.default.VarChar, productId)
                .input('productName', mssql_1.default.VarChar, product.productName)
                .input('descr', mssql_1.default.VarChar, product.descr)
                .input('productQuantity', mssql_1.default.Int, product.productQuantity)
                .input('productImage', mssql_1.default.VarChar, product.productImage)
                .input('productCategory', mssql_1.default.VarChar, product.productCategory)
                .input('productPrice', mssql_1.default.Money, product.productPrice)
                .execute('updateProduct')).rowsAffected;
            if (result[0] >= 1) {
                return res.status(200).json({
                    success: "Product updated successfully"
                });
            }
            else {
                return res.status(201).json({
                    error: "Error updating product"
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            error
        });
    }
}));
