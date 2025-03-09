/* eslint-disable react/prop-types */
const colorClasses = {
  rose: "text-rose-600",
  red: "text-red-600",
  green: "text-green-600",
  blue: "text-blue-600",
  orange: "text-orange-600",
  purple: "text-purple-600",
  yellow: "text-yellow-600",
  zinc: "text-zinc-600",
  violet: "text-violet-600",
};
export default function DashboardSummary({ summary, color = "green" }) {
  return (
    <div className="flex-1 min-w-[250px] xl:w-[23%] min-h-[200px] rounded-xl bg-muted/50 border">
      <div className="h-full grid grid-cols-5 gap-4 p-4">
        <div className="col-span-3">
          <div className="h-full flex flex-col justify-between">
            <div
              className={`uppercase font-bold tracking-wide text-xs ${colorClasses[color]}`}
            >
              {summary?.title}
            </div>
            <div>
              <span className="w-[32px] border-t border-muted-foreground block"></span>
            </div>
            <div className={`uppercase text-4xl ${colorClasses[color]}`}>
              {summary?.[summary?.total]}
            </div>
            <div className="relative w-fit text-center">
              <span
                className={`text-xs uppercase text-muted-foreground ${colorClasses[color]}`}
              >
                Total {summary?.title}
              </span>
              <span className="absolute top-[-2px] left-0 w-full border-t border-muted-foreground"></span>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-1">
            {[1, 2, 3, 4].map((num) => {
              if (!summary?.[`val${num}`]) return null;

              return (
                <div key={num} className="flex flex-col items-end">
                  <span
                    className={`text-xl font-bold text-right ${colorClasses[color]}`}
                  >
                    {summary?.[summary?.[`val${num}`]]}
                  </span>
                  <span className="text-[.6rem] uppercase text-muted-foreground tracking-wide text-right">
                    {summary?.[`name${num}`]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
