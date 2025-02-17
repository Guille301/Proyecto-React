export const getUserDataFromLocalStorage = () => {
    const userId = localStorage.getItem("userId");
    const apiKey = localStorage.getItem("apiKey");
    console.log("userId:", userId); // Verifica esto
    console.log("apiKey:", apiKey); // Verifica esto
    if (userId && apiKey) {
      return { id: userId, apiKey: apiKey };
    }
    return null;
  };