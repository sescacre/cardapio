import type { MenuCategory } from '@/app/data/menuCategory.type';
import type { MenuItem } from '@/app/data/menuItem.type';

export type TvSlide = {
  item: MenuItem;
  categoryName: string;
};

/**
 * Round-robin por categoria: intercala um item visível de cada categoria.
 * Ex.: CatA=[a1,a2], CatB=[b1] → [a1, b1, a2]
 */
export function buildTvPlaylist(
  items: MenuItem[],
  categories: MenuCategory[],
): TvSlide[] {
  const visibleItems = items.filter((item) => item.visible);

  const queues = categories
    .map((category) => ({
      categoryName: category.name,
      items: visibleItems.filter((item) => item.categoryId === category.id),
    }))
    .filter((queue) => queue.items.length > 0);

  if (!queues.length) {
    return [];
  }

  const playlist: TvSlide[] = [];
  const pointers = queues.map(() => 0);
  let remaining = queues.reduce((sum, queue) => sum + queue.items.length, 0);

  while (remaining > 0) {
    for (let i = 0; i < queues.length; i++) {
      const pointer = pointers[i];
      if (pointer >= queues[i].items.length) {
        continue;
      }

      playlist.push({
        item: queues[i].items[pointer],
        categoryName: queues[i].categoryName,
      });
      pointers[i] = pointer + 1;
      remaining -= 1;
    }
  }

  return playlist;
}
