export const IS_IBHE_STAGING = process.env.NEXT_PUBLIC_IBHE_STAGING === '1';

export default function StagingBanner() {
  if (!IS_IBHE_STAGING) return null;
  return (
    <div className="relative z-[60] bg-amber-400 text-black text-center text-sm font-bold px-4 py-2 mt-20">
      STAGED DRAFT for review (IBHE round 2). Not published. Items marked [NEEDS] await confirmation.
    </div>
  );
}
