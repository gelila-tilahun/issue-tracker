'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button, TextField , Callout, Text } from '@radix-ui/themes';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useState } from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/ValidationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/api/issues/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>;


const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors } } =  useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setErrorMessage] = useState('');

return (
    <div className='max-w-xl '>
      {error && (
        <Callout.Root color="red" className="mb-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setErrorMessage('An unexpected error occurred.');
          }
        })}
      >

      <TextField.Root 
        placeholder="Title" {...register("title")}>
      </TextField.Root>
      
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
      
      <Controller
        name="description"
        control={control}
        render ={({ field })=> <SimpleMDE placeholder="Description" {...field} />}
      />
      
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
      
      <Button>Submit New Issue</Button>
    </form>
    </div>
  );
}

export default NewIssuePage