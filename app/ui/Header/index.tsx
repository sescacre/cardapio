import Link from "next/link";
import Inline from "../Flexbox/Inline";
import styles from "./Header.module.css";
import Text from "../Text";
import LogoutWrapper from "../LogoutWrapper";
import { getMe } from "@/app/data/auth";
import { Button } from "../Button";
import UserAvatar from "../UserAvatar";

export default async function Header() {
  let me: Awaited<ReturnType<typeof getMe>> | null = null;

  try {
    me = await getMe();
  } catch {
    me = null;
  }

  return (
    <header className={styles.header}>
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
            <span className={styles.userBadge}>
              <UserAvatar name={me.name} src={me.photo ?? undefined} />
              {me.name}
            </span>
            
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
    </header>
  );
}
