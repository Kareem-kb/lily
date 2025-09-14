import { storage, ID } from '@/appwrite';

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

// Simple function: array in, array of URLs out
export const uploadFiles = async (files: File[]): Promise<string[]> => {
  if (!BUCKET_ID) {
    throw new Error('Bucket ID not configured');
  }

  if (!files || files.length === 0) {
    return [];
  }

  try {
    console.log(`Uploading ${files.length} files to bucket: ${BUCKET_ID}`);

    const uploadPromises = files.map(async (file, index) => {
      try {
        console.log(`Uploading file ${index + 1}: ${file.name}`);

        const response = await storage.createFile(BUCKET_ID, ID.unique(), file);

        // Return the file URL using the new API
        const fileUrl = storage.getFileView(BUCKET_ID, response.$id);

        console.log(`File ${index + 1} uploaded successfully: ${response.$id}`);
        return fileUrl.toString();
      } catch (fileError) {
        console.error(`Failed to upload file ${file.name}:`, fileError);
        throw fileError;
      }
    });

    // Wait for all uploads to complete
    const urls = await Promise.all(uploadPromises);
    console.log('All files uploaded successfully');
    return urls;
  } catch (error) {
    console.error('Upload failed:', error);
    throw new Error(
      `File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};
