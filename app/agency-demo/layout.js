import AgencyHeader from "@/components/agency/AgencyHeader";
import AgencyFooter from "@/components/agency/AgencyFooter";

export const metadata = {
  title: {
    default: "LUMORA — Дигитално студио за дизайн и разработка",
    template: "%s · LUMORA",
  },
  description:
    "LUMORA е демонстрационен сайт на дигитална агенция — стратегия, UI/UX дизайн, уеб и мобилна разработка, брандинг.",
};

export default function AgencyDemoLayout({ children }) {
  return (
    <div className="bg-slate-950">
      <AgencyHeader />
      <main>{children}</main>
      <AgencyFooter />
    </div>
  );
}
