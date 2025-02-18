export const getUserDataFromLocalStorage = () => {
    const userId = localStorage.getItem("userId");
    const apiKey = localStorage.getItem("apiKey");
    
    if (userId && apiKey) {
      return { id: userId, apiKey: apiKey };
    }
    return null;
  };