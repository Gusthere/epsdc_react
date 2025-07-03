import { clearTokens} from "./tokenStorage";

export async function logout(navigation) {
  await clearTokens();       // borra access + refresh

  navigation.reset({
    index: 0,
    routes: [{ name: "login" }],
  });
}
