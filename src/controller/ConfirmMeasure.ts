import Measure from '../model/MeasuresExpenses';
import { Request, Response } from 'express';

export const confirmMeasure = async (req: Request, res: Response) => {
    const { measure_uuid, confirmed_value } = req.body;
  
    if (!measure_uuid || typeof confirmed_value !== 'number') {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Invalid parameter data.'
      });
    }
  
    try {
      // finds the meausure by the uuid.
      const measure = await Measure.findOne({ measure_uuid });
      
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
      await measure.save();
  
      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Error while confirming measure:', error.message);
      return res.status(500).json({
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Internal server error. Try again later.'
      });
    }
  };