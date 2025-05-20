export const signUp = async (email, password) => {
  if (!email || !password) {
    return Promise.reject(new Error('Email and password are required'));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Promise.reject(new Error('Please enter a valid email address'));
  }

  if (password.length < 6) {
    return Promise.reject(new Error('Password must be at least 6 characters long'));
  }

  // Check if user already exists
  const existingUser = JSON.parse(localStorage.getItem("user"));
  if (existingUser && existingUser.email === email) {
    return Promise.reject(new Error("User already exists. Please sign in."));
  }

  // Generate a unique token
  const token = `token-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

  const userData = { email, password, token };
  localStorage.setItem("user", JSON.stringify(userData));

  return Promise.resolve({
    message: "User successfully registered!",
    user: { email, token },
  });
};

export const signIn = async (email, password) => {
  if (!email || !password) {
    return Promise.reject(new Error('Email and password are required'));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Promise.reject(new Error('Please enter a valid email address'));
  }

  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    return Promise.reject(
      new Error("Corrupted user data. Please clear your local storage and try again.")
    );
  }

  if (!storedUser || storedUser.email !== email) {
    return Promise.reject(new Error("User not found"));
  }

  // Optional password check if you decide to keep storing it
  // if (storedUser.password !== password) {
  //   return Promise.reject(new Error("Incorrect password"));
  // }

  // Generate a new token on each login
  const newToken = `token-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
  storedUser.token = newToken;
  localStorage.setItem("user", JSON.stringify(storedUser));

  return Promise.resolve({
    message: "Login successful!",
    user: { email: storedUser.email, token: newToken },
  });
};

export const checkToken = async (token) => {
  let storedUser;
  try {
    storedUser = JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    return Promise.reject(new Error("Corrupted user data."));
  }

  if (!storedUser || storedUser.token !== token) {
    return Promise.reject(new Error("Invalid token"));
  }

  return Promise.resolve({
    data: {
      name: storedUser.name || "User", // fallback name
      email: storedUser.email,
      _id: "fake-id"
    }
  });
};

