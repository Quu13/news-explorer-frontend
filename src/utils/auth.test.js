import { signUp, signIn, checkToken } from './auth';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Clear mocks before each test
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('Authentication Tests', () => {
  // SignUp Tests
  describe('SignUp', () => {
    test('should reject when email and password are empty', async () => {
      await expect(signUp('', '')).rejects.toThrow('Email and password are required');
    });

    test('should reject with invalid email format', async () => {
      await expect(signUp('notanemail', 'password123')).rejects.toThrow('Please enter a valid email address');
    });

    test('should reject if password is too short', async () => {
      await expect(signUp('test@email.com', '12345')).rejects.toThrow('Password must be at least 6 characters long');
    });

    test('should successfully create a new user', async () => {
      const result = await signUp('test@email.com', 'password123');
      expect(result.message).toBe('User successfully registered!');
      expect(result.user.email).toBe('test@email.com');
      expect(result.user.token).toBeDefined();
    });
  });

  // SignIn Tests
  describe('SignIn', () => {
    test('should reject when email and password are empty', async () => {
      await expect(signIn('', '')).rejects.toThrow('Email and password are required');
    });

    test('should reject with invalid email format', async () => {
      await expect(signIn('notanemail', 'password123')).rejects.toThrow('Please enter a valid email address');
    });

    test('should reject when user is not found', async () => {
      localStorage.getItem.mockReturnValue(null);
      await expect(signIn('test@email.com', 'password123')).rejects.toThrow('User not found');
    });
  });

  // CheckToken Tests
  describe('CheckToken', () => {
    test('should reject with invalid token', async () => {
      localStorage.getItem.mockReturnValue(null);
      await expect(checkToken('invalid-token')).rejects.toThrow('Invalid token');
    });

    test('should return user data with valid token', async () => {
      const mockUser = {
        
        email: 'test@email.com',
        token: 'valid-token'
      };
      localStorage.getItem.mockReturnValue(JSON.stringify(mockUser));
      
      const result = await checkToken('valid-token');
      expect(result.data.email).toBe('test@email.com');
      expect(result.data.name).toBe('User');
    });
  });
});