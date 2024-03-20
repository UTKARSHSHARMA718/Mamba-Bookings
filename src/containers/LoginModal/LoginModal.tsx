'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import Button from '@/components/Button/Button'
import Heading from '@/components/Headers/Heading'
import Input from '@/components/Input/Input'
import Modal from '@/components/Modal/Modal'
import useLoginModal from '@/hooks/useLoginModal'
import { API, LOGIN } from '@/constants/apiEndpoints'
import { COMPANY_NAME, CREDENTIALS } from '@/constants/const'
import { LOGGED_IN_FAILED_MESSAGE, LOGGED_IN_MESSAGE } from '@/constants/generalMessage'

// TODO: add password eye icon
const LoginModal = () => {

    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
        setIsLoading(true);
        try {
            let res = await signIn(CREDENTIALS, {
                ...(payload),
                redirect: false,
            });

            if (res?.ok) {
                toast.success(LOGGED_IN_MESSAGE);
                router?.refresh();
                return;
            }
            toast.error(LOGGED_IN_FAILED_MESSAGE);            
        } catch (err) {
            console.log("Error while loging user: " + err)
            toast.error(LOGGED_IN_FAILED_MESSAGE);

        } finally {
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className='flex flex-col gap-2'>
            <Heading heading={`Welcome ${COMPANY_NAME}`} subHeading='Create an account!' />
            <Input
                disabled={isLoading}
                id='email'
                label="Email"
                type='email'
                {...{ register, errors }}
            />
            <Input
                disabled={isLoading}
                id='password'
                label="Password"
                type='password'
                {...{ register, errors }}
                required
            />
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-2'>
            <Button
                label='Google'
                outline
                icon={FcGoogle}
                onClick={() => signIn('google')}
                disabled={isLoading}
            />
            <Button
                disabled={isLoading}
                label='Github'
                outline
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            actionLabel='Login'
            title='Login'
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal