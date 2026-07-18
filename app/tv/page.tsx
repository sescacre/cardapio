import { getMenuCategories } from '@/app/data/menuCategory';
import { getMenuItems } from '@/app/data/menuItem';
import { buildTvPlaylist } from './buildTvPlaylist';
import TvSlideshow from './components/TvSlideshow';

export default async function TvPage() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories(),
  ]);

  const slides = buildTvPlaylist(items, categories);

  return <TvSlideshow slides={slides} />;
}
