'use client';
import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {MdDangerous} from 'react-icons/md'

interface IssueForm {
  title:string,
  description:string
}

const NewIssuePage = () => {
  const {register, handleSubmit, control} = useForm<IssueForm>()
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
          <Controller 
          control={control}
          name='description'
          render={({field})=> <SimpleMDE {...field}/>}
          />
          
          <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage