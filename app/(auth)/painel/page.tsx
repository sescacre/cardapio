import Text from "@/app/ui/Text";
import CategoryFormDialog from "@/app/components/CategoryFormDialog";
import CategoryFormFields from "@/app/components/CategoryFormFields";
import ItemFormDialog from "@/app/components/ItemFormDialog";
import ItemFormFields from "@/app/components/ItemFormFields";
import MenuCategoriesList from "@/app/components/MenuCategoriesList";
import MenuItemTable from "@/app/components/MenuItemTable";
import TvSettingsPanel from "@/app/components/TvSettingsPanel";
import Inline from "@/app/ui/Flexbox/Inline";
import styles from "./page.module.css";
import Box from "@/app/ui/Box";
import OpenTvLink from "@/app/components/OpenTvLink";
import { getMe, userHasModule } from "@/app/data/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getMe();

  if (!userHasModule(user, "controle")) {
    redirect("/login?error=forbidden");
  }

  return (
    <Inline align="start" className={styles.page} fillWidth gap="md">
      <Box className={styles.categories} fillBackground padding="lg">
        <Inline justify="between">
          <Text as="h2" size="lg">
            Categorias
          </Text>

          <CategoryFormDialog>
            <CategoryFormFields />
          </CategoryFormDialog>
        </Inline>

        <MenuCategoriesList />
        <TvSettingsPanel />
      </Box>

      <Box fillBackground padding="lg">
        <Inline justify="between">
          <Text as="h2" size="lg">
            Cardápio Lanchonete
          </Text>

          <Inline>
            <OpenTvLink />
            <ItemFormDialog>
              <ItemFormFields />
            </ItemFormDialog>
          </Inline>
        </Inline>

        <MenuItemTable />
      </Box>
    </Inline>
  );
}
