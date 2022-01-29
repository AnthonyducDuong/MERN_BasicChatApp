import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useToast } from '@chakra-ui/react';
// import { useNavigate } from "react-router-dom";

import userApi from '../../../../api/userApi';

SignIn.propTypes = {

};

const signinSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('⚠ First name invalid')
        .max(10, '⚠ Last name must be at most 10 characters'),
    lastName: yup
        .string()
        .required('⚠ Last name invalid')
        .max(20, '⚠ Last name must be at most 20 characters'),
    email: yup
        .string()
        .required('⚠ Email invalid')
        .email('⚠ Email must be a valid email'),
    username: yup
        .string()
        .min(3, '⚠ Username must be at least 3 characters')
        .max(15, '⚠ Username must be at most 15 characters')
        .required('⚠ Username invalid'),
    password: yup
        .string()
        .required('⚠ Password invalid')
        .min(6, '⚠ Password must be at least 6 characters')
        .max(17, '⚠ Password must be at most 17 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "⚠ Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmPassword: yup.string()
        .required('⚠ Confirm password invalid')
        .oneOf([yup.ref('password'), null], '⚠ Passwords must match'),

});

function SignIn(props) {
    const toast = useToast();
    // const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [picture, setPicture] = useState();
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        mode: 'all',
        resolver: yupResolver(signinSchema),
    });

    const _onSubmitForm = async (data) => {
        setLoading(true);
        try {
            const params = { ...data, image: picture };
            delete params.confirmPassword;
            console.log('>>> Check params: ', params);
            const respone = await userApi.create(params);
            console.log('>>> Check resp userApi - create/register: ', respone);
            toast({
                title: 'Register Successfully, PLEASE CHECK EMAIL TO ACTIVE ACCOUNT',
                description: "Welcome Basic Chat App",
                status: 'success',
                duration: 10000,
                isClosable: true,
                position: 'top-right',
            });
            setLoading(false);
            // navigate('/chat', { replace: true });
        } catch (error) {
            console.log('Failed to register', error);
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            setLoading(false);
        }
    };

    const _onChangeImage = (e) => {
        // document.getElementsByName('firstName')[0].value = '1';
        setLoading(true);
        const picture = e.target.files[0];
        if (picture === undefined) {
            toast({
                title: 'Choose your image ~~',
                description: "please",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            return;
        }

        if (picture.type === 'image/jpeg' || picture.type === 'image/png') {
            const data = new FormData();
            data.append('file', picture);
            data.append('upload_preset', 'chat-app-basic');
            data.append('cloud_name', 'thangduong');
            fetch('https://api.cloudinary.com/v1_1/thangduong/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPicture(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: 'Choose your image ~~',
                description: "please",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            setLoading(false);
            return;
        }
    }

    return (
        <form onSubmit={handleSubmit(_onSubmitForm)}>
            <HStack
                spacing={4}
            >
                <FormControl
                    isInvalid={!!errors?.firstName?.message}
                    errortext={errors?.firstName?.message}
                    w={'50%'}
                    isRequired
                    marginTop={2}
                >
                    <FormLabel fontSize={'sm'} >First name</FormLabel>
                    <Input
                        borderColor='green.200'
                        variant='filled'
                        fontSize={'sm'}
                        placeholder='Thang'
                        {...register('firstName')}
                    />
                    <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={!!errors?.lastName?.message}
                    errortext={errors?.lastName?.message}
                    w={'50%'}
                    isRequired
                    style={{ marginTop: '0.5rem' }}
                >
                    <FormLabel fontSize={'sm'} >Last name</FormLabel>
                    <Input
                        borderColor='green.200'
                        variant='filled'
                        fontSize={'sm'}
                        placeholder='Duong Duc'
                        {...register('lastName')}
                    />
                    <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
                </FormControl>
            </HStack>

            <VStack spacing={4}>
                <FormControl
                    isInvalid={!!errors?.email?.message}
                    errortext={errors?.email?.message}
                    isRequired
                    marginTop={3}
                >
                    <FormLabel >Email</FormLabel>
                    <Input
                        borderColor='green.200'
                        variant='filled'
                        placeholder='thangduc.duong14@gmail.com'
                        {...register('email')}
                    />
                    <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={!!errors?.username?.message}
                    errortext={errors?.username?.message}
                    isRequired
                    marginTop={3}
                >
                    <FormLabel >Username</FormLabel>
                    <Input
                        borderColor='green.200'
                        variant='filled'
                        type={'text'}
                        placeholder='Anthony Thang'
                        {...register('username')}
                    />
                    <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={!!errors?.password?.message}
                    errortext={errors?.password?.message}
                    isRequired
                    marginTop={3}
                >
                    <FormLabel >Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={showPassword ? 'text' : 'password'}
                            placeholder={showPassword ? 'zzZthangcutevippro123Zzz' : '************************'}
                            borderColor='green.200' variant='filled'
                            {...register('password')}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={() => { setShowPassword(!showPassword) }}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={!!errors?.confirmPassword?.message}
                    errortext={errors?.confirmPassword?.message}
                    isRequired
                    marginTop={3}
                >
                    <FormLabel >Confirm password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder={showConfirmPassword ? 'zzZthangcutevippro123Zzz' : '************************'}
                            borderColor='green.200' variant='filled'
                            {...register('confirmPassword')}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}>
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors?.confirmPassword?.message}</FormErrorMessage>
                </FormControl>
                <FormControl
                    marginTop={3}
                >
                    <FormLabel>Picture profile</FormLabel>
                    <Input
                        name='picture'
                        type={'file'}
                        p={1.5}
                        accept='image/*'
                        onChange={(e) => _onChangeImage(e)}
                    />
                </FormControl>

                <Button
                    colorScheme={'green'}
                    w={'100%'}
                    style={{ marginTop: '30px' }}
                    type={'submit'}
                    isLoading={loading}
                >Register</Button>
            </VStack>
        </form>
    );
}

export default SignIn;