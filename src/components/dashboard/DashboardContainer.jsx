import useDashboardStore from "@/store/useDashboardStore";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import DashboardMainChart from "@/components/dashboard/DashboardMainChart";

export default function DashboardContainer() {
  const { usersSummary, petsSummary, apptSummary } = useDashboardStore();

  return (
    <div>
      <div className="mt-5 flex flex-wrap gap-4">
        <DashboardSummary summary={usersSummary} color="purple" />
        <DashboardSummary summary={petsSummary} color="green" />
        <DashboardSummary summary={apptSummary} color="red" />
      </div>
      <div className="mt-5">
        <DashboardMainChart />
      </div>
    </div>
  );
}
