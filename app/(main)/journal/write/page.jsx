'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import 'react-quill-new/dist/quill.snow.css';
import { journalSchema } from '@/app/lib/schema';
import { BarLoader } from 'react-spinners';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getMoodById, MOODS } from '@/app/lib/moods';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const JournalEntryPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      title: '',
      content: '',
      mood: '',
      collectionId: '',
    },
  });

  const isLoading = false;

  const selectedMood = watch('mood');

  return (
    <div className="py-8">
      <form className="space-y-2 mx-auto">
        <h1 className="text-5xl md:text-6xl gradient-title">
          What's on your mind
        </h1>

        {isLoading && <BarLoader color="organe" width={'100%'} />}

        <div className="space-y-4">
          <label className="text-sm font-medium">Title</label>
          <Input
            disabled={isLoading}
            {...register('title')}
            placeholder="Give your entry a title..."
            className={`py-5 md:text-md ${
              errors.title ? 'border-red-500' : ''
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">How are you feeling?</label>

          <Controller
            name="mood"
            control={control}
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={`w-full ${errors.mood ? 'border-red-500' : ''}`}
                  >
                    <SelectValue placeholder="Select a mood..." />
                  </SelectTrigger>

                  <SelectContent className="max-h-64" position="popper">
                    {Object.values(MOODS).map((mood) => (
                      <SelectItem key={mood.id} value={mood.id}>
                        <span className="flex items-center gap-2">
                          {mood.emoji}
                          {mood.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />
          {errors.mood && (
            <p className="text-red-500 text-sm">{errors.mood.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">
            {getMoodById(selectedMood)?.prompt ?? 'Write your thoughts...'}
          </label>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ReactQuill
                readOnly={isLoading}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block'],
                    ['link'],
                    ['clean'],
                  ],
                }}
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">
            Add to collection (Optional)
          </label>

          {/* <Controller
            name="content"
            control={control}
            render={({ field }) => (

            )}
          /> */}
          {errors.collectionId && (
            <p className="text-red-500 text-sm">
              {errors.collectionId.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default JournalEntryPage;
