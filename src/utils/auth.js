export const signIn = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new Error('Please enter a valid email address');
  }

  const userStr = localStorage.getItem("user");
  if (!userStr) {
    throw new Error("User not found");
  }

  const storedUser = JSON.parse(userStr);

  if (storedUser.email !== email || storedUser.password !== password) {
    throw new Error("Invalid credentials");
  }

  // Save token for later token checks
  localStorage.setItem("jwt", storedUser.token);

  return Promise.resolve({
    message: "Login successful!",
    user: {
      name: storedUser.name,
      email: storedUser.email,
      token: storedUser.token,
    },
  });
};

export const signUp = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const token = `token-${Date.now()}`;
  const userData = { name, email, password, token };

  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("jwt", token); // Save token for session

  return Promise.resolve({
    message: "Registration successful!",
    user: { name, email, token },
  });
};

export const checkToken = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  const userStr = localStorage.getItem("user");
  if (!userStr) throw new Error("No user found");

  const user = JSON.parse(userStr);

  if (!user || user.token !== token) {
    throw new Error("Invalid token");
  }

  return Promise.resolve(user);
};
