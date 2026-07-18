import { getMenuCategories } from "@/app/data/menuCategory";
import { getMenuItems } from "@/app/data/menuItem";
import { Button } from "@/app/ui/Button";
import Inline from "@/app/ui/Flexbox/Inline";
import { List } from "@/app/ui/List";
import Text from "@/app/ui/Text";
import Form from "next/form";
import { deleteMenuCategoryAction } from "../CategoryForm/actions";
import CategoryEditFormDialog from "../CategoryEditFormDialog";
import CategoryFormFields from "../CategoryFormFields";

export default async function MenuCategoriesList() {
  const [categories, items] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
  ]);

  const categoryIdsWithItems = new Set(items.map((item) => item.categoryId));

  return categories.length ? (
    <List>
      { categories.map((category) => (
        <li key={ category.id }>
          <Inline justify="between">
            <Text as="p">{ category.name }</Text>

            <Inline>
              <CategoryEditFormDialog>
                <CategoryFormFields category={ category } />
              </CategoryEditFormDialog>
              { !categoryIdsWithItems.has(category.id) ? (
                <Form action={ deleteMenuCategoryAction }>
                  <input type="hidden" name="id" value={ category.id } />
                  <Button
                    icon="delete"
                    size="sm"
                    title="Apagar categoria"
                    type="submit"
                    variant="text"
                  />
                </Form>
              ) : null }
            </Inline>
          </Inline>
        </li>
   
      )) }
    </List>
  ) : ( <Text as="p">Nenhuma categoria encontrada</Text> );
}
