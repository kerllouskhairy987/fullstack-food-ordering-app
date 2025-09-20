"use client";

import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { ITranslations } from "@/types/translations";
import { useParams, usePathname } from "next/navigation";

function AdminTabs({ translations }: { translations: ITranslations }) {
  const pathname = usePathname();
  const { locale } = useParams();

  const tabs = [
    {
      id: crypto.randomUUID(),
      title: translations.adminTabs.profile,  
      href: Routes.ADMIN,
    },
    {
      id: crypto.randomUUID(),
      title: translations.adminTabs.categories,
      href: `${Routes.ADMIN}/${Pages.CATEGORIES}`,
    },
    {
      id: crypto.randomUUID(),
      title: translations.adminTabs.menuItems,
      href: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    },
    {
      id: crypto.randomUUID(),
      title: translations.adminTabs.users,
      href: `${Routes.ADMIN}/${Pages.USERS}`,
    }
  ];
  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray.length > 1
      ? pathname.startsWith(`/${locale}/${href}`)
      : pathname === `/${locale}/${href}`;
  };
  return (
    <nav className="my-10">
      <ul className="flex items-center flex-wrap gap-4 justify-center">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={`/${locale}/${tab.href}`}
              className={`hover:!text-white ${isActiveTab(tab.href)
                  ? buttonVariants({ variant: "default" })
                  : buttonVariants({ variant: "outline" })
                }`}
            >
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AdminTabs;