import { alarmList } from "@/lib/alarmMessage";
import TextAlarm from "@/components/alarm/TextAlarm";
import RequestAlarm from "@/components/alarm/RequestAlarm";

export default function AlarmPage() {
  const sortedAlarmList = alarmList.sort(
    (a, b) => b.created_At.getTime() - a.created_At.getTime()
  );

  return (
    <div className="flex justify-center items-center h-screen pt-20">
      <div className="h-full overflow-y-auto px-6 pb-6 space-y-6">
        {sortedAlarmList.map((alarmData) => {
          if (alarmData.type === "requestAlarm") {
            return <TextAlarm key={alarmData.id} data={alarmData} />;
          } else {
            return <RequestAlarm key={alarmData.id} data={alarmData} />;
          }
        })}
      </div>
    </div>
  );
}
