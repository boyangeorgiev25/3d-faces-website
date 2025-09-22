const API_BASE_URL = 'http://localhost:8001';

export const login = async (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(`${API_BASE_URL}/token`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  return data;
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  const response = await fetch(`${API_BASE_URL}/users/me/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Token expired');
    }
    throw new Error('Failed to fetch user data');
  }

  return response.json();
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const signup = async (username, email, password) => {
  console.log('Attempting signup with:', { username, email });
  
  const response = await fetch(`${API_BASE_URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      full_name: username, // Use username as full_name for now
    }),
  });

  console.log('Signup response status:', response.status);

  if (!response.ok) {
    let errorMessage = 'Signup failed';
    try {
      const errorData = await response.json();
      console.log('Signup error data:', errorData);
      errorMessage = errorData.detail || errorData.message || errorMessage;
      
      if (Array.isArray(errorData.detail)) {
        errorMessage = errorData.detail.map(err => err.msg || err).join(', ');
      }
    } catch (e) {
      console.log('Could not parse error response');
    }
    throw new Error(errorMessage);
  }

  const data = await response.json();
  console.log('Signup successful:', data);
  
  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
  }
  
  return data;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const sendChatMessage = async (message, language = 'en') => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Please log in to use the chat');
  }

  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      message: message,
      language: language
    })
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please log in again.');
    }
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Chat service unavailable');
  }

  const data = await response.json();
  return data.response;
};

export const getChatHistory = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Please log in to view chat history');
  }

  const response = await fetch(`${API_BASE_URL}/chat/history`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please log in again.');
    }
    throw new Error('Failed to load chat history');
  }

  return await response.json();
};

export const generate3DModel = async (imageFile) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Please log in to generate 3D models');
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE_URL}/generate-3d-model`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please log in again.');
    }
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to generate 3D model');
  }

  return await response.json();
};