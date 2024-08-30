import Measure from '../model/MeasuresExpenses';
import { Request, Response } from 'express';

const listMeasures = async (req: Request, res: Response) => {
    const { customer_code } = req.params;
    const { measure_type } = req.query;
  
    try {
      const query: any = { customer_code };
  
      if (measure_type) {
        const validTypes = ['WATER', 'GAS'];
        if (!validTypes.includes(measure_type.toString().toUpperCase())) {
          return res.status(400).json({
            error_code: 'INVALID_TYPE',
            error_description: 'Measure type not allowed'
          });
        }
        query.measure_type = measure_type.toString().toUpperCase();
      }
  
      const measures = await Measure.find(query);
  
      if (measures.length === 0) {
        return res.status(404).json({
          error_code: 'MEASURES_NOT_FOUND',
          error_description: 'No measure was find.'
        });
      }
  
      res.status(200).json({
        customer_code,
        measures
      });
    } catch (error) {
      console.error('Error listing measures:', error);
      res.status(500).json({
        error_code: 'INTERNAL_ERROR',
        error_description: 'Internal server error. Try again later.'
      });
    }
  };
  
  export default listMeasures;