'use server';

import { getMenuCategories } from '@/app/data/menuCategory';
import { getMenuItems } from '@/app/data/menuItem';
import { buildTvPlaylist } from './buildTvPlaylist';

export async function getTvPlaylistAction() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories(),
  ]);

  return buildTvPlaylist(items, categories);
}
