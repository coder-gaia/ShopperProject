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
exports.confirmMeasure = void 0;
const MeasuresExpenses_1 = __importDefault(require("../model/MeasuresExpenses"));
const confirmMeasure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { measure_uuid, confirmed_value } = req.body;
    if (!measure_uuid || typeof confirmed_value !== 'number') {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: 'Invalid parameter data.'
        });
    }
    try {
        // finds the meausure by the uuid.
        const measure = yield MeasuresExpenses_1.default.findOne({ measure_uuid });
        if (!measure) {
            return res.status(404).json({
                error_code: 'MEASURE_NOT_FOUND',
                error_description: 'Measure not found.'
            });
        }
        //verifies if the measure was already confirmed.
        if (measure.has_confirmed) {
            return res.status(409).json({
                error_code: 'CONFIRMATION_DUPLICATE',
                error_description: 'Measure already confirmed.'
            });
        }
        //here it updtaes the confirmed value and saves it.
        measure.measure_value = confirmed_value;
        measure.has_confirmed = true;
        yield measure.save();
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Error while confirming measure:', error.message);
        return res.status(500).json({
            error_code: 'INTERNAL_SERVER_ERROR',
            error_description: 'Internal server error. Try again later.'
        });
    }
});
exports.confirmMeasure = confirmMeasure;
