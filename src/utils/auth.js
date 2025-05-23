export const signIn = async (email, password) => {
  const token = `token-${Date.now()}`;
  const userData = { email, password, token };
  localStorage.setItem("user", JSON.stringify(userData));
  
  return Promise.resolve({
    message: "Login successful!",
    user: { email, token },
  });
};

export const signUp = async (name, email, password) => {
  const token = `token-${Date.now()}`;
  const userData = { name, email, password, token };
  localStorage.setItem("user", JSON.stringify(userData));
  
  return Promise.resolve({
    message: "Registration successful!",
    user: { name, email, token },
  });
};

export const checkToken = async (token) => {
  return Promise.resolve({
    data: JSON.parse(localStorage.getItem("user"))
  });
};
