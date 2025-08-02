'use server';

export interface CakeFormResponse {
  success: boolean;
  message: string;
}

export async function cakeForm(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log('cakeForm data ➜', data);
  return {
    success: true,
    message: 'Form submitted successfully',
  };
}
