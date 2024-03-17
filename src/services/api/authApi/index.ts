import AsyncStorage from "@react-native-async-storage/async-storage";

const authApi = {
  async signUp(name: string, email: string, password: string, selfie: string) {
    const object = { name, email, password, selfie };
    await AsyncStorage.setItem(email + password, JSON.stringify(object));
    console.log(object);
    return object;
  },

  async signIn(email: string, password: string) {
    const user = await AsyncStorage.getItem(email + password);
    return user ? JSON.parse(user) : null;
  },
};

export default authApi;
