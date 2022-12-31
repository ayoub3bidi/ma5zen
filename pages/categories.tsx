import React, {useEffect, useState} from 'react'
import { CustomNextPage } from '../types/CustomNextPage'
import {
  Title,
  Group,
  ThemeIcon,
  Button,
  Box,
  Table,
  Select,
  Modal,
  TextInput,
  Text,
  LoadingOverlay,
  Accordion,
} from "@mantine/core"

import { useForm, zodResolver } from "@mantine/form"
import { BiCategory } from 'react-icons/bi'
import { FiSearch } from 'react-icons/fi'
import { MdWarningAmber } from 'react-icons/md'
import { useGetCategories } from '../queries/CategoryQueries'

const Categories:CustomNextPage = () => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  return (
    <main>
      <Group align='center' mb='3rem'>
        <ThemeIcon variant='light' color='green' size='md'>
          <BiCategory size={25} />
        </ThemeIcon>
        <Title size='1.rem' weight='500'>
          Your Categories
        </Title>
      </Group>
      {/* <Select
        clearable
        searchable
        nothingFound="No Categories Found"
        icon={<FiSearch/>}
        transition='pop-top-left'
        transitionDuration={80}
        transitionTimingFunction='ease'
        sx={{maxWidth: '600px'}}
        mb='1rem'
        placeholder='Search Categories'
      /> */}
    </main>
  )
}

export default Categories;
Categories.requireAuth = true;