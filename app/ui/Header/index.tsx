import Link from "next/link";
import Inline from "../Flexbox/Inline";
import Stack from "../Flexbox/Stack";
import styles from "./Header.module.css";
import Image from "next/image";
import sescLogo from "@/public/sesc_logo_80_branco.png";
import Text from "../Text";
import LogoutButton from "./LogoutButton";
import { getMe, userHasModule } from "@/app/data/auth";

type HeaderProps = {
  variant?: "public" | "auth";
};

const AUTH_LINKS = [
  { href: "/painel", name: "Controle", slug: "controle" },
  { href: "/tv", name: "TV", slug: "tv" },
] as const;

export default async function Header({ variant = "public" }: HeaderProps) {
  let moduleLinks: { href: string; name: string }[] = [];

  if (variant === "auth") {
    try {
      const me = await getMe();
      moduleLinks = AUTH_LINKS.filter((link) =>
        userHasModule(me, link.slug),
      ).map(({ href, name }) => ({ href, name }));
    } catch {
      moduleLinks = [];
    }
  }

  return (
    <header className={styles.header}>
      <Stack align="center" className={styles.content} fillWidth>
        <Inline
          className={styles.SescContent}
          fillWidth
          justify="center"
        >
          <Link
            href="https://www.sescacre.com.br"
            target="_blank"
            title="Ir para o site do Sesc Acre"
          >
            <Image
              alt="Logo Sesc 80 Anos"
              className={styles.SescLogo}
              src={sescLogo}
              width={100}
              height={100}
            />
          </Link>
        </Inline>

        <nav className={styles.navigation}>
          <Text as="h1" className={styles.title} size="lg" weight="md">
            Cardápio Digital
          </Text>

          <Inline className={styles.navigationLinks}>
            <Link href="/">Cardápio</Link>
            {variant === "auth" ? (
              moduleLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.name}
                </Link>
              ))
            ) : (
              <Link href="/login">Entrar</Link>
            )}
          </Inline>

          {variant === "auth" ? (
            <LogoutButton />
          ) : (
            <span className={styles.logout} aria-hidden />
          )}
        </nav>
      </Stack>
    </header>
  );
}
