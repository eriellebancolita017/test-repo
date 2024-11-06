import { useLocalStorage } from "@/hooks/storage/useLocalStorage";
import { refreshAccessToken } from "../../helpers/auth/token";
import { useRouter } from "next/navigation";
import { useUser, UserOptions } from "@fizno/ui-core/src/hooks/user/useUser";
import { SWRConfiguration } from "swr";
export const useUserWeb = (
  options?: Partial<UserOptions>,
  config?: SWRConfiguration,
) => {
  const router = useRouter();
  return useUser(
    {
      useStorage: useLocalStorage,
      refreshAccessToken,
      onLogout: () => router.push("/seller/login"),
      ...options,
    },
    config,
  );
};
