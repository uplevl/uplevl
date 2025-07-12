import Eyebrow from "@/components/eyebrow";

function Intro() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Eyebrow>AI Customer Agent</Eyebrow>
      <h2 className="text-[26px] leading-[30px] font-bold tracking-tight">
        The Customer Agent That Works For You 24/7
      </h2>
      <p className="text-sm leading-6 text-balance text-neutral-600">
        Uplevl&apos;s intelligent agent lives on your website and quietly turns visitors into customers. From bookings
        to upsells, reviews to re-engagement. It handles the tasks that drive growth, so you don&apos;t have to.
      </p>
    </div>
  );
}

export default Intro;
