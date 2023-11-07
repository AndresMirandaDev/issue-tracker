'use client';
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import axios from 'axios';

import {MdDangerous} from 'react-icons/md'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeOf, z } from 'zod'

import { createIssueSchema } from '@/app/validationSchema';
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;//zod is infering the type of the schema, so theres no need to make an interface and have duplicated code

const NewIssuePage = () => {
  const {register, handleSubmit, control, formState:{ errors }} = useForm<IssueForm>({
    resolver:zodResolver(createIssueSchema)
  })
  const router = useRouter()
  const [error, setError]= useState('')


  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Icon>
          <MdDangerous />
        </Callout.Icon>
        <Callout.Text>
          {error}
        </Callout.Text>
      </Callout.Root>}
      <form 
      className='max-w-xl space-y-3' 
      
      onSubmit={handleSubmit(async (data)=>{
        try {
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          setError('An unexpected error ocurred.')
        }
      })}>
          <TextField.Root>
              <TextField.Input placeholder='Title' {...register('title')}/>
          </TextField.Root>
         <ErrorMessage>
            {errors.title?.message}
         </ErrorMessage>
          <Controller 
          control={control}
          name='description'
          render={({field})=> <SimpleMDE {...field}/>}
          />
          <ErrorMessage>
            {errors.description?.message}
          </ErrorMessage>
          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage