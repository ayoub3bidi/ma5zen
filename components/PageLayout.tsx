import React from 'react'
import { AppShell, Header, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Nav from './nav'

const PageLayout = ({children} : any) => {

    const theme = useMantineTheme()
    const [opened, setOpened] = React.useState(false)

  return (
    <AppShell
        styles={{ main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], }}}
        navbarOffsetBreakpoint='sm'
        navbar={<Nav opened={opened} hiddenBreakpoint="sm" />}
        header={
            <Header height={70} p='md'>
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened(!opened)}
                            size='md'
                            color={theme.colors.gray[6]}
                            mr='xl'
                        />
                    </MediaQuery>
                    <Text>Ma5zen | مخزن</Text>
                </div>
            </Header>
        }
    >
        { children }
    </AppShell>
  )
}

export default PageLayout