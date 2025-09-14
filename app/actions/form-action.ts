'use server';

import { CakeOrder } from '@/interfaces';
import { createDocument } from '../lib/database';

export async function cakeForm(formData: CakeOrder) {
  try {

    // Check if it's already a valid date string
    const dateObj = new Date(formData.delivery_date);
    if (isNaN(dateObj.getTime())) {
      throw new Error(`Invalid date format: ${formData.delivery_date}`);
    }

    const deliveryDate = dateObj.toISOString();

    const dataForDatabase = {
      ...formData,
      delivery_date: deliveryDate,
    };
    
    await createDocument(dataForDatabase);
    return {
      success: true,
      message: 'Form submitted successfully',
    };
  } catch (error) {
    console.error('Form submission failed:', error);
    return {
      success: false,
      message: 'Failed to submit form',
    };
  }
}
