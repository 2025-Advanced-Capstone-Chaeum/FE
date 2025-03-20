import BottomMenu from "@/components/main/BottomMenu";
import TopMenu from "@/components/main/TopMenu";
import NavigationBar from "@/components/ui/NavigationBar";

export default function Home() {
  return (
    <div className= "min-h-screen">
      <TopMenu />
      <BottomMenu />
      <NavigationBar />
    </div>
  );
}
