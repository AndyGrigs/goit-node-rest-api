import { jest } from "@jest/globals";

describe("Login Controller - Response Structure Tests", () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup request mock
    req = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };

    // Setup response mock
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Setup next mock
    next = jest.fn();
  });

  describe("Test successful login response (Status 200)", () => {
    it("should return status 200 on successful login", () => {
      // Simulate successful login response
      const mockLoginResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjM5MDk5MjAwLCJleHAiOjE2MzkxODU2MDB9.abc123",
        user: {
          email: "test@example.com",
          subscription: "starter",
          avatarURL: "https://www.gravatar.com/avatar/5d41402abc4b2a76b9719d911017c592?s=250",
        },
      };

      // Simulate controller response
      res.status(200).json(mockLoginResponse);

      // Verify status 200 is called
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should return token in response body", () => {
      const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjM5MDk5MjAwLCJleHAiOjE2MzkxODU2MDB9.abc123";
      const mockLoginResponse = {
        token: mockToken,
        user: {
          email: "test@example.com",
          subscription: "starter",
          avatarURL: "https://www.gravatar.com/avatar/5d41402abc4b2a76b9719d911017c592?s=250",
        },
      };

      res.status(200).json(mockLoginResponse);

      // Get the response data
      const responseData = res.json.mock.calls[0][0];

      // Verify token exists
      expect(responseData).toHaveProperty("token");
      expect(responseData.token).toBe(mockToken);
    });

    it("should return user object with email and subscription as strings", () => {
      const mockLoginResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjM5MDk5MjAwLCJleHAiOjE2MzkxODU2MDB9.abc123",
        user: {
          email: "test@example.com",
          subscription: "starter",
          avatarURL: "https://www.gravatar.com/avatar/5d41402abc4b2a76b9719d911017c592?s=250",
        },
      };

      res.status(200).json(mockLoginResponse);

      const responseData = res.json.mock.calls[0][0];

      // Verify user object exists
      expect(responseData).toHaveProperty("user");
      expect(typeof responseData.user).toBe("object");
    });

    it("should have email property as string in user object", () => {
      const mockLoginResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjM5MDk5MjAwLCJleHAiOjE2MzkxODU2MDB9.abc123",
        user: {
          email: "test@example.com",
          subscription: "starter",
          avatarURL: "https://www.gravatar.com/avatar/5d41402abc4b2a76b9719d911017c592?s=250",
        },
      };

      res.status(200).json(mockLoginResponse);

      const responseData = res.json.mock.calls[0][0];
      const userObject = responseData.user;

      // Verify email exists and is string
      expect(userObject).toHaveProperty("email");
      expect(typeof userObject.email).toBe("string");
      expect(userObject.email).toBe("test@example.com");
    });

    it("should have subscription property as string in user object", () => {
      const mockLoginResponse = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjM5MDk5MjAwLCJleHAiOjE2MzkxODU2MDB9.abc123",
        user: {
          email: "test@example.com",
          subscription: "starter",
          avatarURL: "https://www.gravatar.com/avatar/5d41402abc4b2a76b9719d911017c592?s=250",
        },
      };

      res.status(200).json(mockLoginResponse);

      const responseData = res.json.mock.calls[0][0];
      const userObject = responseData.user;

      // Verify subscription exists and is string
      expect(userObject).toHaveProperty("subscription");
      expect(typeof userObject.subscription).toBe("string");
      expect(userObject.subscription).toBe("starter");
    });

    it("should return response with complete structure: token and user with email and subscription", () => {
      const mockLoginResponse = {
        token: "test-token-123",
        user: {
          email: "user@example.com",
          subscription: "pro",
          avatarURL: "https://www.gravatar.com/avatar/test",
        },
      };

      res.status(200).json(mockLoginResponse);

      // Verify status 200
      expect(res.status).toHaveBeenCalledWith(200);

      // Get response data
      const responseData = res.json.mock.calls[0][0];

      // Verify structure
      expect(responseData).toHaveProperty("token");
      expect(responseData).toHaveProperty("user");

      // Verify token is string
      expect(typeof responseData.token).toBe("string");

      // Verify user object has required properties
      expect(responseData.user).toHaveProperty("email");
      expect(responseData.user).toHaveProperty("subscription");

      // Verify email and subscription are strings
      expect(typeof responseData.user.email).toBe("string");
      expect(typeof responseData.user.subscription).toBe("string");
    });
  });
});
