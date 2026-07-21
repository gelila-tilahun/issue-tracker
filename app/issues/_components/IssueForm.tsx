'use client';

import { ErrorMessage, Spinner } from '@/app/components/';
import { issueSchema } from '@/app/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@/app/generated/client';
import { Button, Callout, Heading, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import SimpleMDE from 'react-simplemde-editor';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.refresh();
      router.push('/issues/list');
    } catch {
      setIsSubmitting(false);
      setError('An unexpected error occurred. Please try again.');
    }
  });

  return (
    <div className="max-w-2xl">
      <Heading size="5" mb="4">
        {issue ? 'Edit Issue' : 'New Issue'}
      </Heading>

      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <TextField.Root
            defaultValue={issue?.title}
            placeholder="Issue title"
            size="3"
            {...register('title')}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <div>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Describe the issue..." {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <Button size="3" disabled={isSubmitting} className="w-full sm:w-auto">
          {issue ? 'Update Issue' : 'Submit Issue'}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
