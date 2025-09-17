import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged,
  type User as FirebaseUser,
  type AuthError as FirebaseAuthError
} from 'firebase/auth';
import { auth } from '../config/firebase';
import type { LoginCredentials, RegisterCredentials, User, AuthError } from '../types/auth';

export class AuthService {
  
  // Convert Firebase User to our User interface
  private convertFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      emailVerified: firebaseUser.emailVerified,
      createdAt: firebaseUser.metadata.creationTime ? new Date(firebaseUser.metadata.creationTime) : new Date()
    };
  }

  // Convert Firebase Auth Error to our AuthError interface
  private convertAuthError(error: FirebaseAuthError): AuthError {
    let message = 'Ein unbekannter Fehler ist aufgetreten';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'Benutzer nicht gefunden';
        break;
      case 'auth/wrong-password':
        message = 'Falsches Passwort';
        break;
      case 'auth/email-already-in-use':
        message = 'E-Mail-Adresse wird bereits verwendet';
        break;
      case 'auth/weak-password':
        message = 'Passwort ist zu schwach';
        break;
      case 'auth/invalid-email':
        message = 'Ungültige E-Mail-Adresse';
        break;
      case 'auth/user-disabled':
        message = 'Benutzerkonto wurde deaktiviert';
        break;
      case 'auth/too-many-requests':
        message = 'Zu viele Anmeldeversuche. Bitte versuchen Sie es später erneut';
        break;
      case 'auth/network-request-failed':
        message = 'Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung';
        break;
      default:
        message = error.message;
    }

    return {
      code: error.code,
      message
    };
  }

  // Login with email and password
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { email, password } = credentials;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return this.convertFirebaseUser(userCredential.user);
    } catch (error) {
      const authError = this.convertAuthError(error as FirebaseAuthError);
      throw new Error(authError.message);
    }
  }

  // Register new user
  async register(credentials: RegisterCredentials): Promise<User> {
    try {
      const { email, password, displayName } = credentials;
      
      // Validate password confirmation
      if (password !== credentials.confirmPassword) {
        throw new Error('Passwörter stimmen nicht überein');
      }

      // Validate password strength
      if (password.length < 6) {
        throw new Error('Passwort muss mindestens 6 Zeichen lang sein');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name if provided
      if (displayName) {
        await updateFirebaseProfile(userCredential.user, { displayName });
      }

      return this.convertFirebaseUser(userCredential.user);
    } catch (error) {
      if (error instanceof Error && error.message === 'Passwörter stimmen nicht überein') {
        throw error;
      }
      if (error instanceof Error && error.message === 'Passwort muss mindestens 6 Zeichen lang sein') {
        throw error;
      }
      const authError = this.convertAuthError(error as FirebaseAuthError);
      throw new Error(authError.message);
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      const authError = this.convertAuthError(error as FirebaseAuthError);
      throw new Error(authError.message);
    }
  }

  // Send password reset email
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const authError = this.convertAuthError(error as FirebaseAuthError);
      throw new Error(authError.message);
    }
  }

  // Update user profile
  async updateProfile(data: { displayName?: string }): Promise<void> {
    try {
      if (!auth.currentUser) {
        throw new Error('Kein angemeldeter Benutzer');
      }
      await updateFirebaseProfile(auth.currentUser, data);
    } catch (error) {
      const authError = this.convertAuthError(error as FirebaseAuthError);
      throw new Error(authError.message);
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? this.convertFirebaseUser(firebaseUser) : null;
  }

  // Auth state observer
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      callback(firebaseUser ? this.convertFirebaseUser(firebaseUser) : null);
    });
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  validatePassword(password: string): { isValid: boolean; message?: string } {
    if (password.length < 6) {
      return { isValid: false, message: 'Passwort muss mindestens 6 Zeichen lang sein' };
    }
    if (password.length > 128) {
      return { isValid: false, message: 'Passwort ist zu lang' };
    }
    return { isValid: true };
  }
}

// Export singleton instance
export const authService = new AuthService();