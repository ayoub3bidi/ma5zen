import { AppShell, Burger, Header, MediaQuery, Text, useMantineTheme } from '@mantine/core'
import React from 'react'
import Nav from './Nav'

const PageLayout = ({children} : any) => {

    const theme = useMantineTheme()
    const [opened, setOpened] = React.useState(false)

  return (
    <AppShell
        styles={{ main: {backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], }}}
        navbarOffsetBreakpoint='sm'
        navbar={<Nav setOpened={setOpened} opened={opened} hiddenBreakpoint="sm" />}
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