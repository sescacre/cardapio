import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE } from "@/app/data/apiClient";
import { LoginForm } from "./components/LoginForm";
import Text from "@/app/ui/Text";
import Stack from "@/app/ui/Flexbox/Stack";

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  if (cookieStore.get(SESSION_COOKIE)?.value) {
    redirect("/");
  }

  const params = await searchParams;
  const initialError =
    params.error === "forbidden"
      ? "Sem permissão para o módulo de controle do Cardápio."
      : undefined;

  return (
    <Stack align="center" gap="lg">
      <Text as="h2" size="lg" weight="md">
        Entrar no painel
      </Text>
      <LoginForm initialError={initialError} />
    </Stack>
  );
}
