import BottomMenu from "@/components/main/BottomMenu";
import ProgressBar from "@/components/main/ProgressBar";
import TopMenu from "@/components/main/TopMenu";
import NavigationBar from "@/components/ui/NavigationBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopMenu />
      <ProgressBar now={35} />
      <div className="flex justify-center py-25 sm:py-15 md:py-10">
        <Image
          src={"/assets/images/cat.svg"}
          alt="cat"
          width={180}
          height={180}
        />
      </div>
      <BottomMenu />
      <NavigationBar />
    </div>
  );
}
