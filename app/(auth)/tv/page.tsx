import { getMenuCategories } from "@/app/data/menuCategory";
import { getMenuItems } from "@/app/data/menuItem";
import { getMe, userHasModule } from "@/app/data/auth";
import { buildTvPlaylist } from "./buildTvPlaylist";
import TvSlideshow from "./components/TvSlideshow";
import { redirect } from "next/navigation";

export default async function TvPage() {
  const user = await getMe();

  if (!userHasModule(user, "tv") && !userHasModule(user, "controle")) {
    redirect("/login?error=forbidden");
  }

  const [items, categories] = await Promise.all([
    getMenuItems(),
    getMenuCategories(),
  ]);

  const slides = buildTvPlaylist(items, categories);

  return <TvSlideshow slides={slides} />;
}
