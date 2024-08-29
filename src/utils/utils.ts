import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

if (!process.env.API_URL) {
  throw new Error('API_URL environment variable is not defined');
}

export const processImage = async (imageBase64: string) => {
  try {
    const apiUrl = `${process.env.API_URL}?key=${process.env.GEMINI_API_KEY}`;
    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [
              {
                text: imageBase64 
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Response data:', response.data);

    const candidates = response.data.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error('No candidates found in the response');
    }

    const content = candidates[0].content;
    if (!content) {
      throw new Error('No content found in the response');
    }

    console.log('Content:', content);


    const parts = content.parts || [];
    const text = parts.map((part: { text: any; }) => part.text).join('');
    
    const image_url = '';
    const measure_value = 0; 
    const measure_uuid = uuidv4();

    return {
      image_url,
      measure_value,
      measure_uuid
    };
  } catch (error: any) {
    console.error('Error while processing image:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    }
    throw new Error('Error while processing image');
  }
};

export const generateUUID = () => uuidv4();
