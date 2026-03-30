import { fetchAppState } from "./actions";
import PublicProfile from "@/components/PublicProfile";
import { defaultState } from "@/utils/storage";

export const revalidate = 0; // Ensures it's dynamically fetching from DB

export default async function HomePage() {
  const state = await fetchAppState() || defaultState;
  
  return <PublicProfile state={state} />;
}
