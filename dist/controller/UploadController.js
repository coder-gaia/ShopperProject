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
const MeasuresExpenses_1 = __importDefault(require("../model/MeasuresExpenses"));
const utils_1 = require("../utils/utils");
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, customer_code, measure_datetime, measure_type } = req.body;
    if (!image || !customer_code || !measure_datetime || !measure_type) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Missing required fields',
        });
    }
    // Validate measure_datetime format
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(measure_datetime)) {
        return;
    }
    try {
        //validating base64 format
        const base64Regex = /^data:image\/(png|jpeg|jpg);base64,/;
        if (!base64Regex.test(image)) {
            return res.status(400).json({
                error_code: 'INVALID_DATA',
                error_description: 'Invalid base64 image format',
            });
        }
        const { image_url, measure_value, measure_uuid } = yield (0, utils_1.processImage)(image);
        const existingMeasure = yield MeasuresExpenses_1.default.findOne({
            customer_code,
            measure_type,
            measure_datetime: {
                $gte: new Date(new Date(measure_datetime).getFullYear(), new Date(measure_datetime).getMonth(), 1),
                $lt: new Date(new Date(measure_datetime).getFullYear(), new Date(measure_datetime).getMonth() + 1, 1),
            },
        });
        if (existingMeasure) {
            return res.status(409).json({
                error_code: 'DOUBLE_REPORT',
                error_description: 'Monthly measure already taken.',
            });
        }
        const newMeasure = new MeasuresExpenses_1.default({
            measure_uuid: measure_uuid || (0, utils_1.generateUUID)(),
            customer_code,
            measure_datetime,
            measure_type,
            measure_value,
            image_url,
        });
        yield newMeasure.save();
        return res.status(200).json({
            image_url,
            measure_value,
            measure_uuid: newMeasure.measure_uuid,
        });
    }
    catch (error) {
        console.error('Error while processing image:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            if (error.response.status === 400) {
                return res.status(400).json({
                    error_code: 'INVALID_IMAGE',
                    error_description: 'Invalid image format or data.',
                });
            }
            else if (error.response.status === 500) {
                return res.status(500).json({
                    error_code: 'GEMINI_API_ERROR',
                    error_description: 'Error connecting to Gemini API.',
                });
            }
        }
        throw new Error('Error while processing image');
    }
});
exports.default = uploadImage;
