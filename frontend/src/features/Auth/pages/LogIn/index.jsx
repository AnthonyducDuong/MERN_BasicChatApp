import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import './LogIn.scss';

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
        console.log(JSON.stringify(data));
        setLoading(true);
        try {
            const params = { ...data };
            const response = await userApi.login(params);
            console.log(response);
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
            // if (error.response.status === 401) {
            //     reset();
            // }
            setLoading(false);
        }
    };

    const _onSuccessGoogleLogin = async (data) => {
        setLoading(true);
        try {
            // const 
            const res = await userApi.googleLogin({
                googleToken: data.tokenId,
            });
            console.log(res);
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
            setLoading(false);
        }
        console.log(data);
    }

    const _onFailureGoogleLogin = (response) => {
        // setLoading(true);
        // toast({
        //     title: 'Error Occured!',
        //     description: response,
        //     status: 'error',
        //     duration: 4000,
        //     isClosable: true,
        //     position: 'top-right',
        // });
        // setLoading(false);
        console.log(response);
    }

    return (
        <>
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
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                // clientId='303523771509-bf66l88fid32i95l5r8f4majmsa02fs1.apps.googleusercontent.com'
                buttonText="Login with Google"
                onSuccess={_onSuccessGoogleLogin}
                onFailure={_onFailureGoogleLogin}
                cookiePolicy={'single_host_origin'}
            // render={renderProps => (
            //     <button onClick={renderProps.onClick} style={{ width: '100%', display: 'flex', marginTop: '10px' }}>This is my custom Google button</button>
            // )}
            // style={{ width: '100%', display: 'flex', marginTop: '10px' }}
            // className='test'
            ></GoogleLogin>
        </>
    );
}

export default LogIn;