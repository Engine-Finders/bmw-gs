import Icon from "@/components/reusable/Icon";

export default function HomeSec3({ data }) {
  return (
    <section className="px-2 pt-8 sm:px-6 lg:px-8">
      <div
        className="mx-auto flex max-w-6xl items-stretch rounded-2xl border border-hero-blue/30 bg-[#f3f6fb] px-2 py-4 sm:px-6 sm:py-6"
        style={{ boxShadow: "0 0 40px -8px rgba(0,138,201,0.35)" }}
      >
        {data.stats.map((stat, i) => (
          <div key={stat.label} className="flex min-w-0 flex-1 items-stretch justify-center">
            {i > 0 && <span className="mr-1 w-px shrink-0 self-center bg-hero-blue/20 sm:mr-6" style={{ height: "60%" }} />}
            <div className="flex min-w-0 flex-col items-center px-0.5 text-center">
              <Icon name={stat.icon} className="mb-1 h-6 w-6 shrink-0 text-hero-blue sm:mb-2 sm:h-9 sm:w-9" />
              <p className="whitespace-nowrap text-[11px] font-extrabold text-[#101828] sm:text-2xl lg:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[9px] font-medium leading-tight text-[#101828] sm:mt-1 sm:text-xs lg:text-sm">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
