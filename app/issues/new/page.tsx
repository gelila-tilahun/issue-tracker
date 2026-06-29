'use client';
import {TextField} from '@radix-ui/themes';
import { TextArea } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import React from 'react'

const NewIssurPage = () => {
  return (
    <div className = 'max-w-xl space-y-3' >
      <TextField.Root>
        <input placeholder="Title" className="w-full bg-transparent outline-none" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssurPage