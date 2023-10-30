import SideNav from "@/app/ui/dashboard/sidenav";

//One benefit of using layout is that on navigation, only the page components update while the layout won’t re-render.
//In Next.js, this is called partial rendering:

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
