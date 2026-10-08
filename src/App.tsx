import { RouterProvider, useRouter } from "@/lib/router";
import { Page, SiteFooter, SiteNav } from "@/components/shell";
import { Home } from "@/sections/Home";
import { Ju } from "@/sections/Ju";
import { Story } from "@/sections/Story";
import { Create } from "@/sections/Create";
import { Archive } from "@/sections/Archive";
import { Ip } from "@/sections/Ip";
import { About } from "@/sections/About";

function RouteView() {
  const { route } = useRouter();
  switch (route) {
    case "ju":
      return <Ju />;
    case "story":
      return <Story />;
    case "create":
      return <Create />;
    case "archive":
      return <Archive />;
    case "ip":
      return <Ip />;
    case "about":
      return <About />;
    default:
      return <Home />;
  }
}

export default function App() {
  return (
    <RouterProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteNav />
        <Page className="flex-1">
          <RouteView />
        </Page>
        <SiteFooter />
      </div>
    </RouterProvider>
  );
}
