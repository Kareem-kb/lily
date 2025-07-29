'use server';

export async function cakeForm(_prevState: unknown, formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log('cakeForm data ➜', data);
  return { success: true };
}
