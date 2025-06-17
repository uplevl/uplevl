import uplevlIcon from "@@/assets/icon.svg";

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <img src={uplevlIcon} alt="Uplevl" width={28} height={28} className="size-7 object-contain" />
      <span className="text-xl font-semibold">Uplevl</span>
    </div>
  );
}
