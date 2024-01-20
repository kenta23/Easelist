'use server'

import { authOptions, prisma } from "@/auth"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connect } from "tls";
import { z } from 'zod'
import { getSession } from "next-auth/react";
import { json } from "stream/consumers";

const userIdSession =  getSession();



const FormSchema = z.object({
  id: z.coerce.number(),
  title: z.string({
    invalid_type_error: "Invalid Task",
  }),
});

const sessionData = async() => {
  const session = await getServerSession(authOptions);
  const getUser = session?.user;

  return getUser;
}


export const getAllTaskList = async () => {
  const session = await getServerSession(authOptions);
  const getUser = session?.user?.email;

   if(!session) {
     redirect('/login');
   }

   try {
      const data = await prisma.tasks.findMany({
          where: {
            userId: getUser as string
          },
          orderBy: { createdAt: "desc"}
       })
       return data;
    }
   catch (err: any) {
      return new Error(err.message)
   }
}
const AddTaskSchema = FormSchema.omit({ id: true });

export const addTask = async (prevState: any, formData: FormData) => {
    const session = await sessionData();

    //check the authenticated user 
    if(!session) {
      return redirect('/login');
     }

        //validate using zod
      const validateTask = AddTaskSchema.safeParse({
          title: formData.get('task')
      })

      //if validation fails 
      if(!validateTask.success) {
        return {
            errors: validateTask.error.flatten().fieldErrors,
            message: 'Missing input field or invalid field'
        }
      }
      //INSERTING DATA TO THE DATABASE
      const { title } = validateTask.data;
      try {
        await prisma.tasks.create({
            data: {
                 title: title,
                 userId: session.email as string
            }
          })    

          formData.delete('title')
      }
      catch (err: any) {
        return {
            message: err.message
        }
      }
      revalidatePath('/')      
      return {
        message: 'Successfully Added Task'
      }
  }


const itemTodelete = FormSchema.omit({ title: true });


export const deleteItem = async (prevState: any, formdata: FormData) => {
    const session = await sessionData();
 
    if(!session) {
      redirect('/');
    }

    const validateId = itemTodelete.safeParse({
       id: formdata.get('id')
    })
    
     if(!validateId.success) {
      return {
        errors: validateId.error.flatten().fieldErrors,
        message: 'Missing ID'
    }
      
     }
    try {
      const { id } = validateId.data;

      await prisma.tasks.delete({
        where: { id: id  }
      })
    }
     
    catch(err) {
      return {
        message: 'Error deletig task'
      }
    }
    revalidatePath('/')     
    return {
      message: "Task deleted successfully"
    }
}

export const updateItem = async (prevState: any, formData: FormData) => {
  const session = await sessionData();

  const validationUpdateContent = FormSchema.safeParse({
      id: formData.get('id'),
      title: formData.get('edit-content')
   })

   if(!session) {
    redirect('/');
   }
    //if validation fails 
    if(!validationUpdateContent.success) {
      return {
          errors: validationUpdateContent.error.flatten().fieldErrors,
          message: 'Missing input field or invalid field'
      }
    }
      const { id, title } = validationUpdateContent.data;
   try {
      //update to the database
      await prisma.tasks.update({
        data: {
          title: title,
        },
        where: { id: id }
      })
     console.log('Successfully Updated task');
   }

   catch(err) {
       console.log(err);
       return {
        message: "Something went wrong"
       }
   }
   revalidatePath('/')     
    return {
      message: "Task updated successfully"
    }
}


 