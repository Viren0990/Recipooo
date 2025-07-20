"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index")); // Adjust the path if necessary
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'routes', 'uploads')));
console.log(__dirname);
const PORT = 3000;
app.use((0, cors_1.default)({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || origin === 'http://localhost:5173' || origin === 'https://localhost:5173') {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Use the main router with the correct prefix
app.use('/api/v1', index_1.default);
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
