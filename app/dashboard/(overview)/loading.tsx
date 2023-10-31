import DashboardSkeleton from "@/app/ui/skeletons";

//Here, you're using a route group to ensure loading.tsx only applies to your dashboard overview page.
//loading.tsx is a special Next.js file built on top of Suspense, it allows you to create loading UI to show as a replacement while page content loads.
export default function Loading() {
  return <DashboardSkeleton />;
}
