import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import BMWStripe from "@/components/reusable/BMWStripe";

export default function HomeSec4({ data }) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-bmw-violet bg-white px-4 py-6 sm:px-8 sm:py-8">
        <div className="text-center">
          <BMWStripe className="mx-auto mb-3" />
          <h2 className="hp-h2 text-[#101828]">{data.h2}</h2>
          <p className="mt-2 text-sm text-[#101828]">{data.description}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {data.symptoms.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              className="group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.label}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(140% 100% at 0% 100%, rgba(255,255,255,0.9) 0%, transparent 45%), radial-gradient(110% 90% at 100% 100%, rgba(255,255,255,0.85) 0%, transparent 40%)",
                  }}
                />
                <Icon
                  name={s.icon}
                  className="absolute bottom-11 left-2 h-7 w-7 text-[var(--color-hero-blue)] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] sm:bottom-16 sm:left-3 sm:h-9 sm:w-9"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 border-t border-white/25 bg-transparent px-2 py-1.5 backdrop-blur-md sm:px-3 sm:py-2.5">
                <p className="text-xs font-semibold leading-tight text-[#101828] drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] sm:text-sm">
                  {i + 1}. {s.label}
                </p>
                <span className="mt-1 block h-0.5 w-8 bg-[var(--color-hero-blue)] transition-all group-hover:w-full sm:mt-2" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
