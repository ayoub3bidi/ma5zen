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

const Nav = ({opened, hiddenBreakpoint} : {opened: boolean; hiddenBreakpoint: MantineNumberSize}) => {
  return (
    <Navbar
        p='xs'
        width={{sm:300}}
        hiddenBreakpoint={hiddenBreakpoint}
        hidden={!opened}
    >
        <Navbar.Section mt='xs'>
            Ma5zen
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