import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import NavigationBar from "@/components/ui/NavigationBar";

export default function Home() {
  return (
    <div className= "min-h-screen">
      <TopMenu />
      <ProgressBar now={35}/>
      <BottomMenu />
      <NavigationBar />
    </div>
  );
}
