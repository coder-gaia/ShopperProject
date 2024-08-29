import Measure from '../model/MeasuresExpenses';
import { Request, Response } from 'express';
import { generateUUID, processImage } from '../utils/utils';

const uploadImage = async (req: Request, res: Response) => {
  const { image, customer_code, measure_datetime, measure_type } = req.body;

  if (!image || !customer_code || !measure_datetime || !measure_type) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: 'Missing required fields',
    });
  }
  
  
  // Validate measure_datetime format
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(measure_datetime)) {
    return
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

    const { image_url, measure_value, measure_uuid } = await processImage(image);

    const existingMeasure = await Measure.findOne({
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

    const newMeasure = new Measure({
      measure_uuid: measure_uuid || generateUUID(),
      customer_code,
      measure_datetime,
      measure_type,
      measure_value,
      image_url,
    });

    await newMeasure.save();

    return res.status(200).json({
      image_url,
      measure_value,
      measure_uuid: newMeasure.measure_uuid,
    });
  } catch (error: any) {
    console.error('Error while processing image:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      if (error.response.status === 400) {
        return res.status(400).json({
          error_code: 'INVALID_IMAGE',
          error_description: 'Invalid image format or data.',
        });
      } else if (error.response.status === 500) {
        return res.status(500).json({
          error_code: 'GEMINI_API_ERROR',
          error_description: 'Error connecting to Gemini API.',
        });
      }
    }
    throw new Error('Error while processing image');
  }
};

export default uploadImage;
