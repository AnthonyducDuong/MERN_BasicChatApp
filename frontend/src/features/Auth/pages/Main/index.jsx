import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import SignIn from '../SignIn';
import LogIn from '../LogIn';


MainPage.propTypes = {

};

function MainPage(props) {
    const navigate = useNavigate();

    return (
        <Container
            maxW='container.xl'
            centerContent>
            <Header />
            {/* Form */}
            <Box
                bg={'whitesmoke'}
                w={'100%'}
                p={4}
                borderRadius={'lg'}
                borderWidth={'1px'}
            >
                <Tabs
                    variant='soft-rounded'
                    colorScheme={'whatsapp'}
                    color={'blackAlpha.800'}
                >
                    <TabList>
                        <Tab
                            w={'50%'}
                        >
                            Log In
                        </Tab>
                        <Tab
                            w={'50%'}
                        >
                            Register
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <LogIn />
                        </TabPanel>
                        <TabPanel>
                            <SignIn />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
}

export default MainPage;