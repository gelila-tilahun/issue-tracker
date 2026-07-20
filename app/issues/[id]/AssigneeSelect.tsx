"use client";

import { Skeleton } from "@/app/components";
import { Issue, user as User } from "@/app/generated/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;
  
  const assignIssue = (userId: string) => {
    // Convert "unassigned" string back to null for the database
    const assignedToUserId = userId === "unassigned" ? null : userId;

    axios
      .patch("/api/issues/" + issue.id, { 
        assignedToUserId,
      }) 
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
  };

  return (
    <> 
      <Select.Root
        // Fallback to "unassigned" if assignedToUserId is null/falsy
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}      
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* Avoid using an empty string "" value in Radix Select */}
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => useQuery<User[]>({
  queryKey: ["users"],
  queryFn: () => axios.get("/api/users").then((res) => res.data),
  staleTime: 60 * 1000, // 60s
  retry: 3,
});

export default AssigneeSelect;