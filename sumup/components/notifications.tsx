import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Bell } from "lucide-react";

interface Notification {
  message: string;
  date: string;
  time: string;
}

const notifications: Notification[] = [
  {
    message: "You have used up 80% of your budget.",
    date: "Today",
    time: "12:30PM",
  },
  {
    message: "You have used up 30% of your budget.",
    date: "Today",
    time: "12:30PM",
  },
  {
    message: "Save up to 10% discount through...",
    date: "Today",
    time: "12:30PM",
  },
];

export function Notifications() {
  return (
    <>
      <div className="w-full border border-[#DADADA] max-w-2xl rounded-lg bg-white p-4">
        <h2 className="text-md  h-[35px] font-medium mb-2 flex justify-center items-center bg-[#FFC23D] py-2 rounded-lg">
          Notifications
        </h2>
        <Table>
          <TableBody>
            {notifications.map((notification, index) => (
              <TableRow
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <TableCell className="w-8">
                  <Bell className="w-5 h-5 text-gray-600" />
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-900">
                      {notification.message}
                    </span>
                    <span className="text-xs text-gray-500">
                      {notification.date}, {notification.time}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
