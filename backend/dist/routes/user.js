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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const saltRounds = 10;
const signupSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().min(3)
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success, error } = signupSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs: " + error.errors.map(e => e.message).join(", ")
        });
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, saltRounds);
        yield prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hashedPassword
            }
        });
        return res.json({
            "msg": "Account Created"
        });
    }
    catch (e) {
        return res.json({
            Error: "error in signing up"
        });
    }
}));
const signinSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const { success, error } = signinSchema.safeParse(body);
    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs: " + error.errors.map(e => e.message).join(", ")
        });
    }
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (!user) {
            return res.status(411).json({
                "msg": "No user found"
            });
        }
        const pass = (user === null || user === void 0 ? void 0 : user.password) || "";
        const match = yield bcrypt_1.default.compare(body.password, pass);
        if (match) {
            const token = jsonwebtoken_1.default.sign({
                id: user.id
            }, process.env.JWT_SECRET); // Set token expiration time
            return res.json({
                token: token
            });
        }
        else {
            return res.status(411).json({
                "msg": "Wrong Password"
            });
        }
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Error in logging in' });
    }
}));
exports.default = router;
