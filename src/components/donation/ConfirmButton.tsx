import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const ConfirmButton= () => {
  const router = useRouter();
  return (
    <Button
      className=" w-40 h-12 text-white text-base font-semibold rounded-3xl relative"
      onClick={() => {
        router.push("/");
      }}>
      확인
    </Button>
  );
};

export default ConfirmButton;
