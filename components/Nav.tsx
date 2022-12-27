import {
    MantineNumberSize,
    ActionIcon,
    Box,
    Navbar,
    ScrollArea,
    useMantineColorScheme,
    Title,
    ThemeIcon,
    UnstyledButton, 
    Group,
    Text,
    Avatar,
    useMantineTheme
} from '@mantine/core';
import React from 'react'
import { GoArchive } from 'react-icons/go';
import { ImIcoMoon, ImSun } from 'react-icons/im';

const Brand = () => {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    return (
        <Box
            sx={(theme) => ({
                paddingLeft: theme.spacing.xs,
                paddingRight: theme.spacing.xs,
                paddingBottom: theme.spacing.lg,
                borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
            })}
        >
            <Group position='apart' align='center'>
                <Group>
                    <ThemeIcon
                        variant="gradient"
                        gradient={{from: 'indigo', to: 'cyan'}}
                        size="lg"
                        radius="lg"
                    >
                        <GoArchive size={18}/>
                    </ThemeIcon>
                    <Title size={'1.2rem'} weight={400}>Inventory</Title>
                </Group>
                {/* TODO: add light/dark mode */}
                <ActionIcon variant='default' onClick={() =>  toggleColorScheme()} size={30}>
                    { colorScheme === 'dark' ? <ImSun size={18}/> : <ImIcoMoon size={18}/> }
                </ActionIcon>
            </Group>
        </Box>
    )
}

const Nav = ({opened, hiddenBreakpoint} : {opened: boolean; hiddenBreakpoint: MantineNumberSize}) => {
  return (
    <Navbar
        p='xs'
        width={{sm:300}}
        hiddenBreakpoint={hiddenBreakpoint}
        hidden={!opened}
    >
        <Navbar.Section mt='xs'>
            <Brand/>
        </Navbar.Section>
        <Navbar.Section grow mt='md'>
            Links
        </Navbar.Section>
        <Navbar.Section>
            Avatar
        </Navbar.Section>
    </Navbar>
  )
}

export default Nav