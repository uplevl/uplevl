import Image from "next/image";

import uplevlIcon from "@/assets/icon.svg";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image src={uplevlIcon} alt="Uplevl" className="size-7 object-contain" />
      <span className="text-xl font-semibold">Uplevl</span>
    </div>
  );
}
