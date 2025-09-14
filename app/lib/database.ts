import 'server-only';
import { databases, ID } from '@/appwrite';
import { CakeOrder } from '@/interfaces';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!;

// Create a new document
export const createDocument = async (data: CakeOrder) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(), // Auto-generate unique ID
      data
    );
    return response;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

// Get all documents
export const getDocuments = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

// Get single document
export const getDocument = async (documentId: string) => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      documentId
    );
    return response;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};
