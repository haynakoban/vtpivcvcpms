import useDashboardStore from "@/store/useDashboardStore";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import DashboardMainChart from "@/components/dashboard/DashboardMainChart";
import DashboardPieChart from "@/components/dashboard/DashboardPieChart";

export default function DashboardContainer({ userType, dashboard }) {
  const { usersSummary, petsSummary, apptSummary } = useDashboardStore();

  return (
    <div>
      {userType != 2 &&
        <div className="mt-5 flex flex-wrap gap-4">
        <DashboardSummary summary={usersSummary} color="purple" />
        <DashboardSummary summary={petsSummary} color="green" />
        <DashboardSummary summary={apptSummary} color="red" />
      </div>
      }
      <div className="mt-5">
        {dashboard?.version ?
          <DashboardMainChart dashboard={dashboard} />
          :
          <DashboardPieChart dashboard={dashboard}/>
        }
      </div>
    </div>
  );
}
