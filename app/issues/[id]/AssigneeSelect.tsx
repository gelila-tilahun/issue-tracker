"use client";

import { Skeleton } from "@/app/components";
import { Issue, user as User } from "@/app/generated/client";
import { Select, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height={35} />;
  if (error) return null;

  const assignIssue = (userId: string) => {
    const assignedToUserId = userId === "unassigned" ? null : userId;
    axios
      .patch("/api/issues/" + issue.id, { assignedToUserId })
      .then(() => toast.success("Assignee updated."))
      .catch(() => toast.error("Could not save changes."));
  };

  return (
    <div>
      <Text size="1" color="gray" weight="medium" mb="1" className="block uppercase tracking-wide">
        Assignee
      </Text>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign to..." className="w-full" />
        <Select.Content>
          <Select.Group>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name || user.email}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
