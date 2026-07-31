import { getPublicMenuCatalog } from "@/app/data/menuItem";
import { valueToCurrency } from "@/app/utils/dataFormat";
import Text from "@/app/ui/Text";
import styles from "./page.module.css";

const CATEGORY_ORDER = ["Lanches", "Sobremesas", "Bebidas"] as const;

export default async function HomePage() {
  console.log("📄 PAGE - HOME");

  let items: Awaited<ReturnType<typeof getPublicMenuCatalog>>["items"] = [];
  let categories: Awaited<
    ReturnType<typeof getPublicMenuCatalog>
  >["categories"] = [];
  let loadError: string | null = null;

  try {
    const catalog = await getPublicMenuCatalog();
    items = catalog.items;
    categories = catalog.categories;
  } catch (error) {
    loadError =
      error instanceof Error
        ? error.message
        : "Não foi possível carregar o cardápio.";
  }

  const categoryNameById = new Map(
    categories.map((category) => [category.id, category.name]),
  );

  const itemsByCategory = new Map<string, typeof items>();
  for (const name of CATEGORY_ORDER) {
    itemsByCategory.set(name, []);
  }

  for (const item of items) {
    const categoryName = categoryNameById.get(item.categoryId);
    if (!categoryName || !itemsByCategory.has(categoryName)) continue;
    itemsByCategory.get(categoryName)!.push(item);
  }

  for (const group of itemsByCategory.values()) {
    group.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }

  const sections = CATEGORY_ORDER.map((name) => ({
    name,
    items: itemsByCategory.get(name) ?? [],
  })).filter((section) => section.items.length > 0);

  return (
    <section className={styles.page}>
      <header className={styles.intro}>
        <Text as="h2" size="lg" weight="md">
          Cardápio da Lanchonete
        </Text>
        <p className={styles.subtitle}>
          Confira os itens disponíveis. Preços para comerciários e público geral.
        </p>
      </header>

      {loadError ? (
        <p className={styles.empty}>{loadError}</p>
      ) : sections.length === 0 ? (
        <p className={styles.empty}>Nenhum item visível no cardápio no momento.</p>
      ) : (
        sections.map((section) => (
          <section key={section.name} className={styles.section}>
            <Text as="h3" className={styles.sectionTitle} size="md" weight="md">
              {section.name}
            </Text>
            <ul className={styles.grid}>
              {section.items.map((item) => (
                <li key={item.id} className={styles.card}>
                  <Text as="h4" size="md" weight="md">
                    {item.name}
                  </Text>
                  {item.description ? (
                    <p className={styles.description}>{item.description}</p>
                  ) : null}
                  <dl className={styles.prices}>
                    <div>
                      <dt>Comerciário</dt>
                      <dd>{valueToCurrency(Number(item.comerciarioPrice))}</dd>
                    </div>
                    <div>
                      <dt>Público</dt>
                      <dd>{valueToCurrency(Number(item.publicoPrice))}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </section>
  );
}
