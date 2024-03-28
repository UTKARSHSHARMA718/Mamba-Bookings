'use client'

import React, { useState } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from "next-auth/react";
import axios from 'axios';

import Button from '@/components/Button/Button'
import Heading from '@/components/Headers/Heading'
import Input from '@/components/Input/Input'
import Modal from '@/components/Modal/Modal'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { isPasswordValid } from '@/libs/utils/util'
import { API, SIGNUP } from '@/constants/apiEndpoints'
import { COMPANY_NAME } from '@/constants/const'
import PasswordStrengthPoints from '@/components/PasswordStrengthPoints/PasswordStrengthPoints'
import PasswordInput from '@/components/PasswordInput/PasswordInput'

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, watch, formState: {
        errors,
    } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const password = watch('password');

    const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
        setIsLoading(true);
        try {
            const url = "/" + API + SIGNUP;
            let res = await axios.post(url, payload);
            if (res?.data?.ok) {
                registerModal?.onClose(); // coming from zustan library
                loginModal?.onOpen();
            }
        } catch (err) {
            console.log("Error while registering user: " + err)

        } finally {
            setIsLoading(false);
        }
    }

    const bodyContent = (
        <div className='flex flex-col gap-2'>
            <Heading heading={`Welcome ${COMPANY_NAME}`} subHeading='Create an account!' />
            <Input
                disabled={isLoading}
                id='name'
                label="Name"
                type='text'
                {...{ register, errors }}
                required
            />
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

    const switchSignupToLoginModal = () => {
        registerModal?.onClose();
        loginModal?.onOpen();
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
            <p className='text-xs font-medium'>Are you already a user? <span className='text-xs font-bold cursor-pointer' onClick={switchSignupToLoginModal}>login</span> </p>
        </div>
    )


    return (
        <Modal
            disabled={isLoading || isPasswordValid(password)}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            actionLabel='SignIn'
            title='Register'
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal