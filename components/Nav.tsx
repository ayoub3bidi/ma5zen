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
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react'
import { GoArchive } from 'react-icons/go';
import { ImIcoMoon, ImSun } from 'react-icons/im';
import { AiOutlineHome } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { BsBox } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { TbClipboardList } from 'react-icons/tb';
import { useSession } from 'next-auth/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

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
                    <Title size={'1.2rem'} weight={400}>Ma5zen</Title>
                </Group>
                {/* TODO: add light/dark mode */}
                <ActionIcon variant='default' onClick={() =>  toggleColorScheme()} size={30}>
                    { colorScheme === 'dark' ? <ImSun size={18}/> : <ImIcoMoon size={18}/> }
                </ActionIcon>
            </Group>
        </Box>
    )
}

interface MainLinksProps {
    icon: React.ReactNode;
    label: string;
    color: string;
    pageLink: string;
    setOpened: (opened: boolean) => void;
}

const MainLinks = ({icon, label, color, pageLink, setOpened }: MainLinksProps) => {
    const {pathname} = useRouter();

    return (<Link href={pageLink} passHref>
        <UnstyledButton 
            onClick={() => setOpened(false)}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.black,
                backgroundColor:
                pathname === pageLink
                    ? theme.colorScheme === 'dark'
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0]
                    : 'transparent',
                "& hover": {
                    backgroundColor:
                        theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0],
                }
        })}>
            <Group>
                <ThemeIcon color={color} variant={'light'}>{icon}</ThemeIcon>
                <Text size='sm'>{label}</Text>
            </Group>
        </UnstyledButton>
    </Link>
    );
};

const data: MainLinksProps[] = [
    {
        icon: <AiOutlineHome size={18}/>,
        color: 'blue',
        label: 'Home',
        pageLink: '/',
        setOpened: () => {},
    },
    {
        icon: <BiCategory size={18}/>,
        color: 'teal',
        label: 'Categories',
        pageLink: '/categories',
        setOpened: () => {},
    },
    {
        icon: <BsBox size={16}/>,
        color: 'violet',
        label: 'Inventory',
        pageLink: '/inventory',
        setOpened: () => {},
    },
    {
        icon: <TbClipboardList size={20}/>,
        color: 'grape',
        label: 'Products',
        pageLink: '/products',
        setOpened: () => {},
    },
    {
        icon: <FiSettings size={16}/>,
        color: 'orange',
        label: 'Settings',
        pageLink: '/settings',
        setOpened: () => {},
    },
]

const getWordInitials = (word: string) : string => {
    const bits = word.trim().split(' ');
    return bits.map((bit) => bit.charAt(0)).join('').toUpperCase();
}

const User = () => {
    const theme = useMantineTheme();
    const { data: session } = useSession();
    const { pathname } = useRouter();
    return <Link passHref href={pathname === '/settings' ? "/" : "/settings"}>
        <Box sx={{paddingTop: theme.spacing.sm, borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
        }`}}>
            <UnstyledButton
                sx={{
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color:
                        theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.black,
                        "& hover": {
                            backgroundColor:
                                theme.colorScheme === 'dark'
                                    ? theme.colors.dark[6]
                                    : theme.colors.gray[0],
                        },
                }}>
                <Group>
                    {/* IMAGE */}
                    <Avatar
                        src={session?.user?.image}
                        radius='xl'
                        color='blue'
                        variant='light'
                    >
                        {`${getWordInitials(session?.user?.name ?? "")}`}
                    </Avatar>
                    {/* NAME AND EMAIL */}
                    <Box sx={{flex: 1}}>
                        <Text size='sm' weight={500}>{session?.user?.name}</Text>
                        <Text color='dimmed' size='xs'>{session?.user?.email}</Text>
                    </Box>
                    { pathname === '/settings'
                        ? (<MdKeyboardArrowLeft size={18}/>)
                        : ( <MdKeyboardArrowRight size={18}/>)
                    }
                </Group>
            </UnstyledButton>
        </Box>
    </Link>
}

const Nav = ({
    setOpened,
    opened,
    hiddenBreakpoint
} : {
    setOpened: (opened: boolean) => void;
    opened: boolean;
    hiddenBreakpoint: MantineNumberSize;
}) => {
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
            {data.map((item, index) => (
                <MainLinks key={index} {...item} setOpened={setOpened} />
            ))}
        </Navbar.Section>
        <Navbar.Section>
            <User/>
        </Navbar.Section>
    </Navbar>
  )
}

export default Nav