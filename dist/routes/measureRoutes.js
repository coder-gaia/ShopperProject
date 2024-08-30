"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UploadController_1 = __importDefault(require("../controller/UploadController"));
const ConfirmMeasure_1 = require("../controller/ConfirmMeasure");
const ListMeasures_1 = __importDefault(require("../controller/ListMeasures"));
router.post('/upload', UploadController_1.default);
router.patch('/confirm', ConfirmMeasure_1.confirmMeasure);
router.get('/:customer_code/list', ListMeasures_1.default);
exports.default = router;
