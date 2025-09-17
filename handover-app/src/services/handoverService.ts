import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { HandoverData, PartialHandoverData, PropertyTemplate, ManagerTemplate, AgreementTemplate } from '../types/handover';

export class HandoverService {
  private readonly COLLECTION_NAME = 'handovers';
  private readonly PROPERTIES_COLLECTION = 'properties';
  private readonly MANAGERS_COLLECTION = 'managers';
  private readonly AGREEMENTS_COLLECTION = 'agreement-templates';
  
  // Set current user ID for filtering data
  private currentUserId: string | null = null;
  
  setCurrentUser(userId: string | null) {
    this.currentUserId = userId;
  }
  
  getCurrentUserId(): string | null {
    return this.currentUserId;
  }

  /**
   * Creates an ordered handover data structure that matches the app flow
   * This ensures Firebase fields are stored in logical order: general -> property -> condition -> meters -> keys -> photos -> agreements -> signatures
   */
  private createOrderedHandoverData(data: Omit<HandoverData, 'meta'> | HandoverData): any {
    const hasMetaField = 'meta' in data;
    return {
      meta: hasMetaField ? data.meta : {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'draft',
        version: 1,
        userId: this.currentUserId
      },
      general: data.general,
      property: data.property,
      condition: data.condition,
      meters: data.meters,
      keys: data.keys,
      photos: data.photos,
      agreements: data.agreements,
      signatures: data.signatures
    };
  }

  // Handover CRUD operations
  async createHandover(data: Omit<HandoverData, 'meta'>): Promise<string> {
    if (!this.currentUserId) {
      throw new Error('Benutzer muss angemeldet sein, um eine Übergabe zu erstellen');
    }
    
    // Use ordered data structure to ensure fields appear in logical app flow order
    const orderedData = this.createOrderedHandoverData(data);
    
    const docRef = await addDoc(collection(db, this.COLLECTION_NAME), orderedData);
    return docRef.id;
  }

  async getHandover(id: string): Promise<HandoverData | null> {
    const docRef = doc(db, this.COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      
      // Check if the current user owns this handover
      if (this.currentUserId && data.meta?.userId && data.meta.userId !== this.currentUserId) {
        throw new Error('Zugriff verweigert: Sie haben keine Berechtigung für diese Übergabe');
      }
      
      // Convert Firestore timestamps to Date objects
      return {
        ...data,
        meta: {
          ...data.meta,
          createdAt: data.meta.createdAt?.toDate() || new Date(),
          updatedAt: data.meta.updatedAt?.toDate() || new Date(),
        }
      } as HandoverData;
    }
    
    return null;
  }

  async updateHandover(id: string, updates: PartialHandoverData): Promise<void> {
    const docRef = doc(db, this.COLLECTION_NAME, id);
    
    // First get the current data to merge with updates
    const currentDoc = await getDoc(docRef);
    if (!currentDoc.exists()) {
      throw new Error(`Handover with id ${id} not found`);
    }
    
    const currentData = currentDoc.data() as HandoverData;
    
    // Merge current data with updates
    const mergedData = {
      ...currentData,
      ...updates,
      meta: {
        ...currentData.meta,
        ...updates.meta,
        updatedAt: serverTimestamp(),
        version: (updates.meta?.version || currentData.meta?.version || 1) + 1
      }
    };

    // Use ordered structure to maintain field order
    const orderedUpdateData = this.createOrderedHandoverData(mergedData);

    await updateDoc(docRef, orderedUpdateData);
  }

  async deleteHandover(id: string): Promise<void> {
    const docRef = doc(db, this.COLLECTION_NAME, id);
    await deleteDoc(docRef);
  }

  async getAllHandovers(): Promise<(HandoverData & { id: string })[]> {
    if (!this.currentUserId) {
      throw new Error('Benutzer muss angemeldet sein, um Übergaben anzuzeigen');
    }
    
    const q = query(
      collection(db, this.COLLECTION_NAME),
      where('meta.userId', '==', this.currentUserId),
      orderBy('meta.createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      meta: {
        ...doc.data().meta,
        createdAt: doc.data().meta.createdAt?.toDate() || new Date(),
        updatedAt: doc.data().meta.updatedAt?.toDate() || new Date(),
      }
    })) as (HandoverData & { id: string })[];
  }

  // File upload operations
  async uploadImage(handoverId: string, file: File, path: string): Promise<string> {
    const fileRef = ref(storage, `handovers/${handoverId}/${path}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    return await getDownloadURL(snapshot.ref);
  }

  async uploadSignature(handoverId: string, signature: Blob, signatureType: string): Promise<string> {
    const timestamp = Date.now();
    const fileRef = ref(storage, `handovers/${handoverId}/signatures/${signatureType}_${timestamp}.png`);
    const snapshot = await uploadBytes(fileRef, signature);
    return await getDownloadURL(snapshot.ref);
  }

  async deleteImage(url: string): Promise<void> {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  }

  // Template operations
  async getPropertyTemplates(): Promise<PropertyTemplate[]> {
    const querySnapshot = await getDocs(collection(db, this.PROPERTIES_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PropertyTemplate[];
  }

  async getManagerTemplates(): Promise<ManagerTemplate[]> {
    const querySnapshot = await getDocs(collection(db, this.MANAGERS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ManagerTemplate[];
  }

  async getAgreementTemplates(): Promise<AgreementTemplate[]> {
    const querySnapshot = await getDocs(collection(db, this.AGREEMENTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as AgreementTemplate[];
  }

  // Utility methods
  async markAsCompleted(id: string): Promise<void> {
    const docRef = doc(db, this.COLLECTION_NAME, id);
    await updateDoc(docRef, {
      'meta.status': 'completed',
      'meta.updatedAt': new Date()
    });
  }

  async archiveHandover(id: string): Promise<void> {
    const docRef = doc(db, this.COLLECTION_NAME, id);
    await updateDoc(docRef, {
      'meta.status': 'archived',
      'meta.updatedAt': new Date()
    });
  }

  // Search and filter methods
  async searchHandoversByProperty(propertyAddress: string): Promise<(HandoverData & { id: string })[]> {
    if (!this.currentUserId) {
      throw new Error('Benutzer muss angemeldet sein, um Übergaben zu suchen');
    }
    
    const q = query(
      collection(db, this.COLLECTION_NAME),
      where('meta.userId', '==', this.currentUserId),
      where('property.selectedAddress', '==', propertyAddress),
      orderBy('meta.createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      meta: {
        ...doc.data().meta,
        createdAt: doc.data().meta.createdAt?.toDate() || new Date(),
        updatedAt: doc.data().meta.updatedAt?.toDate() || new Date(),
      }
    })) as (HandoverData & { id: string })[];
  }

  async getRecentHandovers(limitCount: number = 10): Promise<(HandoverData & { id: string })[]> {
    if (!this.currentUserId) {
      throw new Error('Benutzer muss angemeldet sein, um Übergaben anzuzeigen');
    }
    
    const q = query(
      collection(db, this.COLLECTION_NAME),
      where('meta.userId', '==', this.currentUserId),
      orderBy('meta.createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      meta: {
        ...doc.data().meta,
        createdAt: doc.data().meta.createdAt?.toDate() || new Date(),
        updatedAt: doc.data().meta.updatedAt?.toDate() || new Date(),
      }
    })) as (HandoverData & { id: string })[];
  }
}

// Export singleton instance
export const handoverService = new HandoverService();