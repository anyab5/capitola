const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const extractApiError = async (res) => {
  const error = new Error("An api error occurred while fetching the data.");
  error.info = await res.json();
  error.status = res.status;
  console.log(error.status);
  throw error;
};

export const get = async (url) => {
  try {
    const response = await fetch(`${API_HOST}/${url}`);
    if (!response.ok) {
      return extractApiError(response);
    }
    return response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const crudType = async (method, path, payload) => {
  try {
    const response = await fetch(`${API_HOST}/${path}`, {
      method: method,
      body: JSON.stringify(payload || {}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return extractApiError(response);
    }
    return response.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const patch = async (path, payload) => {
  return crudType("PATCH", path, payload);
};

export const post = async (path, payload) => {
  return crudType("POST", path, payload);
};
