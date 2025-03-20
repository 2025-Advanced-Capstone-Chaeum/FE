import Image from "next/image";
import cat from "../../../public/assets/images/cat.svg";
import { centerImageStyles, mainStyles } from "@/styles/styles";

const WelcomePage = () => {
  return (
    <main className={mainStyles}>
      <div className={centerImageStyles}>
        <Image src={cat} alt="Cat" width={180} height={180} />
        <h2 className={textStyle}>민상님, 반가워요!</h2>
      </div>
    </main>
  );
};

const textStyle = "text-sky-950 text-2xl font-semibold tracking-wide";

export default WelcomePage;
