'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'

const createProjectSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  
  description: z.string()
    .max(5000, 'Description must be less than 5000 characters')
    .optional(),
  
  domain: z.string()
    .max(100, 'Domain must be less than 100 characters')
    .optional(),
  
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'RESTRICTED'])
    .default('PUBLIC'),
})

type CreateProjectFormData = z.infer<typeof createProjectSchema>

export function CreateProjectForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
  })

  const onSubmit = async (data: CreateProjectFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement API call to create project
      console.log('Creating project:', data)
      
      toast({
        title: 'Project created!',
        description: 'Your new research project has been created successfully.',
      })
      
      // Redirect to the new project (mock ID for now)
      router.push('/projects/new-project-id')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create project. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Project Title *
        </label>
        <Input
          id="title"
          placeholder="Enter your project title"
          {...register('title')}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          placeholder="Describe your research project..."
          {...register('description')}
          className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.description ? 'border-red-500' : ''
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
          Research Domain
        </label>
        <Input
          id="domain"
          placeholder="e.g., Computer Science, Biology, Physics"
          {...register('domain')}
          className={errors.domain ? 'border-red-500' : ''}
        />
        {errors.domain && (
          <p className="mt-1 text-sm text-red-600">{errors.domain.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-2">
          Visibility
        </label>
        <select
          id="visibility"
          {...register('visibility')}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="PUBLIC">Public - Anyone can view</option>
          <option value="PRIVATE">Private - Only you can view</option>
          <option value="RESTRICTED">Restricted - Only collaborators can view</option>
        </select>
        {errors.visibility && (
          <p className="mt-1 text-sm text-red-600">{errors.visibility.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Project'}
        </Button>
      </div>
    </form>
  )
}