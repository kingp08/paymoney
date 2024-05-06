export const postLoginInfo = async (obj, URL, method) => {
  return fetch(URL, {
    method: method,
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {});
};

export const getInfo = async (access_token, URL) => {
  return fetch(URL, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {});
};

export const postInfo = async (obj, URL, access_token, method) => {
  return fetch(URL, {
    method: method,
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(obj),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {});
};

export const postInfoUsingFormData = async (
  formData,
  URL,
  access_token,
  method,
) => {
  return fetch(URL, {
    method: method,
    headers: {
      'content-type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {
      return {
        response: {
          status: {
            code: 500,
            message: 'Something is wrong. Please try again later.',
          },
        },
      };
    });
};

export const refresh = async (
  access_token,
  URL,
  dispatch,
  fetchStart,
  fetchGetData,
  getDataSuccess,
) => {
  dispatch(fetchStart());
  const data = await fetchGetData(access_token, URL);
  dispatch(getDataSuccess(data));
};

export const deleteInfo = async (URL, access_token) => {
  return fetch(URL, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {});
};

export const updateInfo = async (obj, URL, access_token) => {
  return fetch(URL, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(obj),
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => {});
};
