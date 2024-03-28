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
import { COMPANY_NAME, CREDENTIALS } from '@/constants/const'
import { LOGGED_IN_FAILED_MESSAGE, LOGGED_IN_MESSAGE } from '@/constants/generalMessage'
import useRegisterModal from '@/hooks/useRegisterModal'
import PasswordStrengthPoints from '@/components/PasswordStrengthPoints/PasswordStrengthPoints'
import { PASSWORD_REGEX } from '@/constants/regex'
import { isPasswordValid } from '@/libs/utils/util'
import PasswordInput from '@/components/PasswordInput/PasswordInput'

// TODO: add password eye icon
const LoginModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        watch,
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

    const password = watch('password');

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
                loginModal.onClose();
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
            <PasswordInput isRequired id='password' {...{ register, errors, isLoading }} />
            <PasswordStrengthPoints input={password} />
        </div>
    )

    const switchLoginToSignupModal = () => {
        loginModal?.onClose();
        registerModal?.onOpen();
    }

    const footerContent = (
        <div className='flex flex-col gap-2 justify-center items-center'>
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
            <hr />
            <p className='text-xs font-medium'>Are you a new user? <span className='text-xs font-bold cursor-pointer' onClick={switchLoginToSignupModal}>signup</span> </p>
        </div>
    )



    return (
        <Modal
            disabled={isLoading || isPasswordValid(password)}
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