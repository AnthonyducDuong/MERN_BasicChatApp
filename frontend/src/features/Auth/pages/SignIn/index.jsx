import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
        .max(10, '⚠ Username must be at most 10 characters')
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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        mode: 'all',
        resolver: yupResolver(signinSchema),
    });

    const _onSubmitForm = (data) => {
        console.log(JSON.stringify(data));
    };

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
                        onChange={(e) => { console.log(e.target.files[0]); }}
                    />
                </FormControl>

                <Button
                    colorScheme={'green'}
                    w={'100%'}
                    style={{ marginTop: '30px' }}
                    type={'submit'}
                    isLoading={isSubmitting}
                >Register</Button>
            </VStack>
        </form>
    );
}

export default SignIn;