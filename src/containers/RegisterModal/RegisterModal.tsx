'use client'

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'
import useRegisterModal from '@/hooks/useRegisterModal'
import { API, SIGNUP } from '@/constants/apiEndpoints'
import Modal from '@/components/Modal/Modal'
import Heading from '@/components/Headers/Heading'
import Input from '@/components/Input/Input'
import Button from '@/components/Button/Button'
import { COMPANY_NAME } from '@/constants/const'

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {
        errors,
    } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (payload) => {
        setIsLoading(true);
        try {
            const url = API + SIGNUP;
            let res = await axios.post(url, payload);
            // also check for the isOk or status code of the response
            //@ts-ignore
            if (res?.ok) {
                registerModal?.onClose(); // coming from zustan library
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
                onClick={() => { }}
                disabled={isLoading}
            />
            <Button
                disabled={isLoading}
                label='Github'
                outline
                icon={AiFillGithub}
                onClick={() => { }}
            />
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
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