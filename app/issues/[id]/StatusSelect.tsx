"use client";

import { Issue } from "@/app/generated/client";
import { Select, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const statuses: { label: string; value: Issue["status"] }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const changeStatus = (status: Issue["status"]) => {
    axios
      .patch("/api/issues/" + issue.id, { status })
      .then(() => {
        toast.success("Status updated.");
        router.refresh();
      })
      .catch(() => toast.error("Could not update status."));
  };

  return (
    <div>
      <Text size="1" color="gray" weight="medium" mb="1" className="block uppercase tracking-wide">
        Status
      </Text>
      <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
        <Select.Trigger placeholder="Change status..." className="w-full" />
        <Select.Content>
          <Select.Group>
            {statuses.map((s) => (
              <Select.Item key={s.value} value={s.value}>
                {s.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default StatusSelect;
