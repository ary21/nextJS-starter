import { signIn } from '@/auth'
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState,
  formData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}