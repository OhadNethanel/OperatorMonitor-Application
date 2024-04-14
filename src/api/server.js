import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3001/",
});

export const checkHeartbeat = () => {
  return new Promise((resolve, reject) => {
    server
      .get("/")
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(false);
      });
  });
};

export const login = (user, password) => {
  return new Promise((resolve, reject) => {
    server
      .post("user/login", { user, password })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getProfiles = () => {
  return new Promise((resolve, reject) => {
    server
      .get("user/profiles")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getFiles = () => {
  return new Promise((resolve, reject) => {
    server
      .get("getFiles")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getFilesRefresh = () => {
  return new Promise((resolve, reject) => {
    server
      .get("getFilesRefresh")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getHistory = () => {
  return new Promise((resolve, reject) => {
    server
      .get("getHistory")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const removeFile = (file) => {
  return new Promise((resolve, reject) => {
    server
      .post("removeFile", { file })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const restoreFile = (file) => {
  return new Promise((resolve, reject) => {
    server
      .post("restoreFile", { file })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getTutorial = (file) => {
  return new Promise((resolve, reject) => {
    server
      .post("getTutorial", { file })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const getAvailableLogs = () => {
  return new Promise((resolve, reject) => {
    server
      .get("getAvailableLogs")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const logAnalyze = (files) => {
  return new Promise((resolve, reject) => {
    server
      .post("logAnalyze", { files })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
