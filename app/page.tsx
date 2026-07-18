import Text from "./ui/Text"
import CategoryFormDialog from "./components/CategoryFormDialog";
import CategoryFormFields from "./components/CategoryFormFields";
import ItemFormDialog from "./components/ItemFormDialog";
import ItemFormFields from "./components/ItemFormFields";
import MenuCategoriesList from "./components/MenuCategoriesList";
import MenuItemTable from "./components/MenuItemTable";
import TvSettingsPanel from "./components/TvSettingsPanel";
import Inline from "./ui/Flexbox/Inline";
import styles from "./page.module.css";
import Box from "./ui/Box";

export default function Page() {
  return (
    <Inline align="start" className={ styles.page } fillWidth gap="md">
      <Box className={ styles.categories } fillBackground padding="lg">
        <Inline justify="between">
          <Text as="h2" size="lg">Categorias</Text>
          
          <CategoryFormDialog>
            <CategoryFormFields />
          </CategoryFormDialog>
        </Inline>

        <MenuCategoriesList />
        <TvSettingsPanel />
      </Box>

      <Box fillBackground padding="lg">
        <Inline justify="between">
          <Text as="h2" size="lg">Cardápio Lanchonete</Text>

          <ItemFormDialog>
            <ItemFormFields />
          </ItemFormDialog>
        </Inline>

        <MenuItemTable />
      </Box>
    </Inline>
  );
}
