'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button, TextField , Callout } from '@radix-ui/themes';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useState } from 'react';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} =  useForm<IssueForm>();
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
      <Controller
        name="description"
        control={control}
        render ={({ field })=> <SimpleMDE placeholder="Description" {...field} />}
      />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  );
}

export default NewIssuePage