import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Heading } from '@chakra-ui/react';

Header.propTypes = {

};

function Header(props) {
    return (
        <Box
            d='flex'
            justifyContent='center'
            p={3}
            bg={'whiteAlpha.800'}
            w={'100%'}
            m={'40px 0 15px 0'}
            borderRadius={'lg'}
            borderWidth={'1px'}
            _hover={{
                bgGradient: 'linear(to-r, green.200, pink.500)',
            }}
        >
            <Heading
                as='h4'
                size='lg'
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'
                fontWeight='extrabold'
            >
                MERN Chat App
            </Heading>
        </Box>
    );
}

export default Header;