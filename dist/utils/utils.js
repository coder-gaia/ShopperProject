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
exports.generateUUID = exports.processImage = void 0;
const uuid_1 = require("uuid");
const axios_1 = __importDefault(require("axios"));
if (!process.env.API_URL) {
    throw new Error('API_URL environment variable is not defined');
}
const processImage = (imageBase64) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiUrl = `${process.env.API_URL}?key=${process.env.GEMINI_API_KEY}`;
        const response = yield axios_1.default.post(apiUrl, {
            contents: [
                {
                    parts: [
                        {
                            text: imageBase64
                        }
                    ]
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response data:', response.data);
        const candidates = response.data.candidates;
        if (!candidates || candidates.length === 0) {
            throw new Error('No candidates found in the response');
        }
        const content = candidates[0].content;
        if (!content) {
            throw new Error('No content found in the response');
        }
        const parts = content.parts || [];
        //const text = parts.map((part: { text: any }) => part.text).join('');
        console.log('Content:', content);
        const image_url = "text";
        const measure_value = 0;
        const measure_uuid = (0, uuid_1.v4)();
        return {
            image_url,
            measure_value,
            measure_uuid
        };
    }
    catch (error) {
        console.error('Error while processing image:', error.message);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        }
        throw new Error('Error while processing image');
    }
});
exports.processImage = processImage;
const generateUUID = () => (0, uuid_1.v4)();
exports.generateUUID = generateUUID;
