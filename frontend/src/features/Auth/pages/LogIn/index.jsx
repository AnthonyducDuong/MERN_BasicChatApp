import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import userApi from '../../../../api/userApi';

LogIn.propTypes = {

};

const loginSchema = yup.object().shape({
    username: yup
        .string()
        // .max(10, '⚠ Username must be at most 10 characters')
        .required('⚠ Username invalid'),
    password: yup.string()
        .required('⚠ Password invalid')
    // .min(6, '⚠ Password must be at least 6 characters')
    // .max(17, '⚠ Password must be at most 17 characters')
    // .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //     "⚠ Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // ),
});

function LogIn(props) {
    const toast = useToast();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'all',
        resolver: yupResolver(loginSchema),
    });

    const _onSubmitForm = async (data) => {
        // console.log(JSON.stringify(data));
        setLoading(true);
        try {
            const params = { ...data };
            const respone = await userApi.login(params);
            setLoading(false);
            navigate('/chat', { replace: true });
        } catch (error) {
            console.log('Failed to login', error);
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
            });
            if (error.response.status === 401) {
                reset();
            }
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(_onSubmitForm)} >
            <VStack spacing={4}>
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
                        // name='username'
                        placeholder='Example: Thang Duong'
                        {...register('username')}

                    />
                    <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
                </FormControl>

                <FormControl
                    isRequired
                    marginTop={3}
                    isInvalid={!!errors?.password?.message}
                    errortext={errors?.password?.message}
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
                <Button
                    colorScheme={'green'}
                    w={'100%'}
                    style={{ marginTop: '30px' }}
                    isLoading={loading}
                    type='submit'
                >Login</Button>
            </VStack>
        </form>
    );
}

export default LogIn;