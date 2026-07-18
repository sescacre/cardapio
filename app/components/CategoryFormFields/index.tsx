import { MenuCategory } from "@/app/data/menuCategory.type";
import { Button } from "@/app/ui/Button";
import Stack from "@/app/ui/Flexbox/Stack";
import { Input } from "@/app/ui/Input";

export default function CategoryFormFields({ category }: { category?: MenuCategory }){
    return (
        <Stack gap="lg">
            { category ? (
                <input type="hidden" name="id" value={ category.id } />
            ) : null }

            <Stack fillWidth>
                <label htmlFor="name">Nome</label>
                <Input
                    fillWidth
                    id="name"
                    name="name"
                    type="text"
                    required
                    defaultValue={ category?.name }
                />
            </Stack>

            <Button type="submit">Salvar Categoria</Button>
        </Stack>
    );
}
