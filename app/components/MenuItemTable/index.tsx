import { getMenuCategories } from "@/app/data/menuCategory";
import { getMenuItems } from "@/app/data/menuItem";
import Inline from "@/app/ui/Flexbox/Inline";
import Stack from "@/app/ui/Flexbox/Stack";
import { Button } from "@/app/ui/Button";
import Table from "@/app/ui/Table";
import Text from "@/app/ui/Text";
import { valueToCurrency } from "@/app/utils/dataFormat";
import Form from "next/form";
import { deleteMenuItemAction } from "../ItemForm/actions";
import ItemEditFormDialog from "../ItemEditFormDialog";
import ItemFormFields from "../ItemFormFields";
import MenuItemVisibilityToggle from "../MenuItemVisibilityToggle";

export default async function MenuItemTable() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories(),
  ]);

  const categoryNames = Object.fromEntries(
    categories.map((category) => [category.id, category.name])
  );

  if (!items.length) {
    return <Text as="p">Nenhum item encontrado</Text>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Categoria</th>
          <th>Preços</th>
          <th>Exibição</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        { items.map((item) => (
          <tr key={ item.id }>
            <td>
              <Stack>
                <Text as="p">{ item.name }</Text>
                { item.description ? (
                  <Text as="p" size="sm">{ item.description }</Text>
                ) : null }
              </Stack>
            </td>

            <td>
              <Text as="p">{ categoryNames[item.categoryId] ?? item.categoryId }</Text>
            </td>

            <td>
              <Stack>
                <Inline justify="between" gap="lg">
                  <Text as="p">Comerciário</Text>
                  <Text as="p">{ valueToCurrency(Number(item.comerciarioPrice)) }</Text>
                </Inline>

                <Inline justify="between" gap="lg">
                  <Text as="p">Público Geral</Text>
                  <Text as="p">{ valueToCurrency(Number(item.publicoPrice)) }</Text>
                </Inline>
              </Stack>
            </td>

            <td>
              <MenuItemVisibilityToggle item={ item } />
            </td>

            <td>
              <Inline>
                <ItemEditFormDialog>
                  <ItemFormFields item={ item } />
                </ItemEditFormDialog>
                <Form action={ deleteMenuItemAction }>
                  <input type="hidden" name="id" value={ item.id } />
                  <Button icon="delete" size="sm" title="Apagar item" type="submit" variant="text">
                    Apagar
                  </Button>
                </Form>
              </Inline>
            </td>
          </tr>
        )) }
      </tbody>
    </Table>
  );
}
