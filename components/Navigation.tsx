import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { ReactNode } from "react";

const basePages = ["/", "blog"];

function Navigation() {
  const router = useRouter();
  const pathname = router.asPath;
  const [basePage = "/", ...subpages] = pathname.split("/").filter(Boolean);

  return (
    <nav className="navigation">
      <ul className="navigation-directory">
        {basePages.map(
          (page): ReactNode => {
            const baseLink = page === "/" ? page : `/${page}`;
            const active = basePage === page;
            return (
              <li
                className={clsx({
                  "navigation-base": true,
                  "navigation-base-highlight": active,
                })}
                key={page}
              >
                <Link href={baseLink}>
                  <a>{baseLink === "/" ? baseLink + "index" : baseLink}</a>
                </Link>
                {active && subpages.length > 0 && (
                  <ul className="navigation-subdirectory">
                    {subpages.map(
                      (subpage): ReactNode => (
                        <li
                          className={clsx({
                            "navigation-subpage": true,
                            "navigation-subpage-highlight": active,
                          })}
                          key={subpage}
                        >
                          <Link href={baseLink + "/" + subpage}>
                            <a>{subpage}</a>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            );
          }
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
