'use client';

import { Button, TextField  } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";


const NewIssurPage = () => {
  return (
    <div className = 'max-w-xl space-y-3' >
      <TextField.Root>
        <input placeholder="Title" className="w-full bg-transparent outline-none" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssurPage