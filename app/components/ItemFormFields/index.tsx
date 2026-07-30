import { getMenuCategories } from "@/app/data/menuCategory";
import { MenuItem } from "@/app/data/menuItem.type";
import { Button } from "@/app/ui/Button";
import Inline from "@/app/ui/Flexbox/Inline";
import Stack from "@/app/ui/Flexbox/Stack";
import { Input, Select } from "@/app/ui/Input";

export default async function ItemFormFields({ item }: { item?: MenuItem }) {
    const categories = await getMenuCategories();

    return (
        <Stack gap="lg">
            { item ? (
                <input type="hidden" name="id" value={ item.id } />
            ) : null }

            <Stack fillWidth>
                <label htmlFor="name">Nome</label>
                <Input
                    fillWidth
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={ item?.name }
                />
            </Stack>

            <Stack fillWidth>
                <label htmlFor="description">Descrição</label>
                <Input
                    fillWidth
                    id="description"
                    name="description"
                    type="text"
                    defaultValue={ item?.description ?? undefined }
                />
            </Stack>

            <Stack fillWidth>
                <label htmlFor="categoryId">Categoria</label>
                <Select
                    fillWidth
                    id="categoryId"
                    name="categoryId"
                    required
                    defaultValue={ item?.categoryId ?? "" }
                >
                    <option value="" disabled>Selecione uma categoria</option>
                    { categories.map((category) => (
                        <option key={ category.id } value={ category.id }>
                            { category.name }
                        </option>
                    )) }
                </Select>
            </Stack>

            <Inline fillWidth>
                <Stack fillWidth>
                    <label htmlFor="comerciarioPrice">Preço Comerciário</label>
                    <Input
                        fillWidth
                        id="comerciarioPrice"
                        mask="currency"
                        name="comerciarioPrice"
                        required
                        defaultValue={ item?.comerciarioPrice }
                    />
                </Stack>

                <Stack fillWidth>
                    <label htmlFor="publicoPrice">Preço Público</label>
                    <Input
                        fillWidth
                        id="publicoPrice"
                        mask="currency"
                        name="publicoPrice"
                        required
                        defaultValue={ item?.publicoPrice }
                    />
                </Stack>
            </Inline>

            <Inline>
                <input
                    id="visible"
                    name="visible"
                    type="checkbox"
                    defaultChecked={ item?.visible }
                />
                <label htmlFor="visible">Visível no cardápio</label>
            </Inline>

            <Button type="submit">Salvar Item</Button>
        </Stack>
    );
}
