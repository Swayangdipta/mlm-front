import axios from 'axios'

const backend = import.meta.env.VITE_BACKEND_URL

export const login = async (data) => {
    try {
        return axios.post(`${backend}/auth/login`,data,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => response)
    } catch (error) {
        return error
    }
}

export const loginAdmin = async (data) => {
    try {
        return axios.post(`${backend}/api/admin/login`,data,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => response)
    } catch (error) {
        return error
    }
}

export const register = async (data) => {
    try {
        return axios.post(`${backend}/auth/register`,data,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => response)
    } catch (error) {
        return error
    }
}

export const requestWithdrawl = async (data) => {
    try {
        return axios.post(`${backend}/api/withdrawal/request`,data,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => response)
    } catch (error) {
        return error
    }
}

export const getUserDownline = async (data) => {
    try {
        return axios.get(`${backend}/users/downline/${data}`).then(response => response)
    } catch (error) {
        return error
    }
}
export const getUserData = async (data) => {
    try {
        return axios.get(`${backend}/users/${data}`).then(response => response)
    } catch (error) {
        return error
    }
}

export const getTotalBusiness = async () => {
    try {
        return axios.get(`${backend}/api/admin/dashboard/total-business`).then(response => response)
    } catch (error) {
        return error
    }
}

export const getAllUsers = async () => {
    try {
      const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
        
      if (!token) {
        console.error("No admin token found");
        return { status: 401, data: { message: "Unauthorized" } };
      }
  
      const response = await axios.get(`${backend}/api/admin/dashboard/users`, {
        headers: {
          Authorization: `Bearer ${token.token}`, // Attach token in headers
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { status: error.response?.status || 500, data: [] };
    }
  };
 
export const deleteUser = async (userId) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
          
        if (!token) {
          console.error("No admin token found");
          return { status: 401, data: { message: "Unauthorized" } };
        }
    
        const response = await axios.delete(`${backend}/api/admin/dashboard/delete-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token.token}`, // Attach token in headers
          },
        });
    
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
        return { status: error.response?.status || 500, data: [] };
      }
}

export const topupWallet = async (userId,data) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
          
        if (!token) {
          console.error("No admin token found");
          return { status: 401, data: { message: "Unauthorized" } };
        }
    
        const response = await axios.put(`${backend}/api/admin/dashboard/update-wallet/${userId}`,data, {
          headers: {
            Authorization: `Bearer ${token.token}`, // Attach token in headers
          },
        });
    
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
        return { status: error.response?.status || 500, data: [] };
      }
}

export const createDeposit = async (data) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
          console.log(token, data);
          
        if (!token.token) {
          return { status: 401, data: { message: "Unauthorized" } };
        }
    
        const response = await axios.post(`${backend}/api/deposit/create`,data, {
          headers: {
            Authorization: `Bearer ${token.token}`, // Attach token in headers
          },
        });
    
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
        return { status: error.response?.status || 500, data: [] };
      }
}

export const createInvestment = async (data) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
          console.log(token, data);
          
        if (!token.token) {
          return { status: 401, data: { message: "Unauthorized" } };
        }
    
        const response = await axios.post(`${backend}/api/investment/create`,data, {
          headers: {
            Authorization: `Bearer ${token.token}`, // Attach token in headers
          },
        });
    
        return response;
      } catch (error) {
        return error;
      }
}

export const getTotalInvestment = async (data) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
          console.log(token, data);
          
        if (!token.token) {
          return { status: 401, data: { message: "Unauthorized" } };
        }
    
        const response = await axios.post(`${backend}/api/investment/my-investments`,data, {
          headers: {
            Authorization: `Bearer ${token.token}`, // Attach token in headers
          },
        });
    
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
        return { status: error.response?.status || 500, data: [] };
      }
}

export const getAllTransactions = async (data) => {
    try {
        const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
          console.log(token, data);
          
        if (!token.token) {
          return { status: 401, data: { message: "Unauthorized" } };
        }
    
        const response = await axios.post(`${backend}/api/investment/my-transactions`,data, {
          headers: {
            Authorization: `Bearer ${token.token}`, // Attach token in headers
          },
        });
    
        return response;
      } catch (error) {
        console.error("Error fetching users:", error);
        return { status: error.response?.status || 500, data: [] };
      }
}

export const getAllInvestments = async (data) => {
  try {
      const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
        console.log(token, data);
        
      if (!token.token) {
        return { status: 401, data: { message: "Unauthorized" } };
      }
  
      const response = await axios.get(`${backend}/api/admin/dashboard/investments`,{}, {
        headers: {
          Authorization: `Bearer ${token.token}`, // Attach token in headers
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { status: error.response?.status || 500, data: [] };
    }
}

export const getAllWithdrawals = async (data) => {
  try {
      const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
        console.log(token, data);
        
      if (!token.token) {
        return { status: 401, data: { message: "Unauthorized" } };
      }
  
      const response = await axios.get(`${backend}/api/withdrawal/all`,{}, {
        headers: {
          Authorization: `Bearer ${token.token}`, // Attach token in headers
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { status: error.response?.status || 500, data: [] };
    }
}

export const approveWithdrawal = async (data) => {
  try {
      const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
        console.log(token, data);
        
      if (!token.token) {
        return { status: 401, data: { message: "Unauthorized" } };
      }
  
      const response = await axios.post(`${backend}/api/withdrawal/approve/${data}`,{}, {
        headers: {
          Authorization: `Bearer ${token.token}`, // Attach token in headers
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { status: error.response?.status || 500, data: [] };
    }
}

export const getUserFullname = async (data) => {
    try {
        return axios.get(`${backend}/users/user/${data}`).then(response => response)
    } catch (error) {
        return error
    }
}

export const updateUser = async (userId, data) => {
  try {
      return axios.put(`${backend}/users/user/${userId}`, data).then(response => response)
  } catch (error) {
      return error
  }
}

export const transferAmount = async (userId,memberId, data) => {
  try {
      return axios.put(`${backend}/users/transfer/${userId}/${memberId}`, data).then(response => response)
  } catch (error) {
      return error
  }
}

export const generatePasswordResetLink = async (data) => {
  try {
      return axios.post(`${backend}/auth/forgot-password`, data).then(response => response)
  } catch (error) {
      return error
  }
}

export const resetPassword = async (data, token) => {
  try {
      return axios.put(`${backend}/auth/reset-password/${token}`, data).then(response => response)
  } catch (error) {
      return error
  }
}

export const getAllDeposits = async (data) => {
  try {
      const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
        console.log(token, data);
        
      if (!token.token) {
        return { status: 401, data: { message: "Unauthorized" } };
      }
  
      const response = await axios.get(`${backend}/api/deposit/all`,{}, {
        headers: {
          Authorization: `Bearer ${token.token}`, // Attach token in headers
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching deposits:", error);
      return { status: error.response?.status || 500, data: [] };
    }
}

export const approveDeposit = async (data) => {
  try {
      const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
        console.log(token, data);
        
      if (!token.token) {
        return { status: 401, data: { message: "Unauthorized" } };
      }
  
      const response = await axios.post(`${backend}/api/deposit/approve/${data}`,{}, {
        headers: {
          Authorization: `Bearer ${token.token}`, // Attach token in headers
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { status: error.response?.status || 500, data: [] };
    }
}

export const rejectDeposit = async (data) => {
  try {
      const token = JSON.parse(sessionStorage.getItem("auth")); // Get token from local storage or state
        console.log(token, data);
        
      if (!token.token) {
        return { status: 401, data: { message: "Unauthorized" } };
      }
  
      const response = await axios.post(`${backend}/api/deposit/reject/${data}`,{}, {
        headers: {
          Authorization: `Bearer ${token.token}`, // Attach token in headers
        },
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { status: error.response?.status || 500, data: [] };
    }
}

export const getCreditsForUser = async (data) => {
  try {
      return axios.get(`${backend}/users/deposits/${data}`).then(response => response)
  } catch (error) {
      return error
  }
}

export const getWithdrawalsForUser = async (data) => {
  try {
      return axios.get(`${backend}/users/withdrawals/${data}`).then(response => response)
  } catch (error) {
      return error
  }
}