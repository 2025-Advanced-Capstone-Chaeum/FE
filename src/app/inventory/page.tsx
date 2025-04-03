<<<<<<< HEAD
import BackButton from "@/components/BackButton";
import ItemContainer from "@/components/inventory/ItemContainer";
import Image from "next/image";
import React from "react";
=======
import BackButton from '@/components/BackButton'
import React from 'react'
>>>>>>> 3ff5ee2 (feat: 뒤로가기 버튼에 children 추가)

const InventoryPage = () => {
  return (
    <div>
<<<<<<< HEAD
      <BackButton>인벤토리</BackButton>
      <div className="flex justify-center py-14">
        <Image
          src="/assets/images/cat.svg"
          alt="Cat"
          width={170}
          height={170}
        />
      </div>
      <ItemContainer />
    </div>
  );
};

export default InventoryPage;
=======
        <BackButton>인벤토리</BackButton>
    </div>
  )
}

export default InventoryPage
>>>>>>> 3ff5ee2 (feat: 뒤로가기 버튼에 children 추가)
