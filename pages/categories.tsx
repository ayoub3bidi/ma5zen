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
import { GetCategory } from '../types/getCategories'

const Categories:CustomNextPage = () => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  // SEARCH VALUE & DATA
  const [selectData, setSelectData] = useState<GetCategory['name'][]>([]);
  const [selectValue, setSelectValue] = useState<GetCategory['name'] | null>(null);
  // FILTERED VALUES
  const [filteredValue, setFilteredValue] = useState<GetCategory[]>();
  // SET SELECT DATA FOR SEARCH
  useEffect(() => {
    setSelectData([]);
    if(categories) {
      categories.map(category=>setSelectData((selectData)=>[...selectData, category.name]));
    }
    setFilteredValue(categories);
  }, [categories]);

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
      <Select
        data={selectData}
        value={selectValue}
        onChange={setSelectValue}
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
      />
      {/* NO CATEGORIES FOUND */}
      {
        categories?.length === 0
        && !categoriesLoading
        && (<Box>
          <Group align='center'>
            <Text>No Inventory/Categories</Text>
            <FiSearch size={20} />
          </Group>
        </Box>)
      }
    </main>
  )
}

export default Categories;
Categories.requireAuth = true;