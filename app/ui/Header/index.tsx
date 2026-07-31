import Link from "next/link";
import Inline from "../Flexbox/Inline";
import Stack from "../Flexbox/Stack";
import styles from "./Header.module.css";
import Image from "next/image";
import sescLogo from "@/public/sesc_logo_80_branco.png";
import Text from "../Text";
import LogoutWrapper from "../LogoutWrapper";
import { getMe } from "@/app/data/auth";
import { Button } from "../Button";

export default async function Header() {
  let me: Awaited<ReturnType<typeof getMe>> | null = null;

  try {
    me = await getMe();
  } catch {
    me = null;
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
          <Link href="/" title="Ir para a página inicial">
            <Text as="h1" className={styles.title} size="lg" weight="md">
              Cardápio Digital
            </Text>
          </Link>

          <Inline className={styles.navigationLinks}>
            {me ? (
              <Link href="/painel">Painel de Controle</Link>
            ) : null}
          </Inline>

          {me ? (
            <div className={styles.sessionActions}>
              <span className={styles.userBadge}>{me.name}</span>
              <LogoutWrapper>
                <Button 
                  icon="logout"
                  size="sm" 
                  type="button" 
                  variant="text"
                >
                  Sair
                </Button>
              </LogoutWrapper>
            </div>
          ) : (
            <Link className={styles.logout} href="/login">
              <Button size="sm" type="button">Entrar</Button>
            </Link>
          )}
        </nav>
      </Stack>
    </header>
  );
}
