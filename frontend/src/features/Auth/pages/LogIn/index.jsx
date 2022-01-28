import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

LogIn.propTypes = {

};

const loginSchema = yup.object().shape({
    username: yup
        .string()
        .max(10, '⚠ Username must be at most 10 characters')
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
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        mode: 'all',
        resolver: yupResolver(loginSchema),
    });

    const _onSubmitForm = (data) => {
        console.log(JSON.stringify(data));
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
                    isLoading={isSubmitting}
                    type='submit'
                >Login</Button>
            </VStack>
        </form>
    );
}

export default LogIn;