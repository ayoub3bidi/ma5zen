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
  Skeleton,
} from "@mantine/core"

import { useForm, zodResolver } from "@mantine/form"
import { BiCategory } from 'react-icons/bi'
import { FiSearch } from 'react-icons/fi'
import { MdWarningAmber } from 'react-icons/md'
import { useGetCategories, usePostCategory } from '../queries/CategoryQueries'
import { GetCategory } from '../types/getCategories'
import { PostCategorySchema } from '../types/postCategory'
import { queryClient } from './_app'

const Categories:CustomNextPage = () => {
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  // ACCORDION VALUE/STATE
  const [accordionValue, setAccordionValue] = useState<string | null>(null);
  // SEARCH VALUE & DATA
  const [selectData, setSelectData] = useState<GetCategory['name'][]>([]);
  const [selectValue, setSelectValue] = useState<GetCategory['name'] | null>(null);
  // FILTERED VALUES
  const [filteredValue, setFilteredValue] = useState<GetCategory[]>();
  // MODAL STATE
  const [createModal, setCreateModal] = useState<boolean>(false);
  // SET SELECT DATA FOR SEARCH
  useEffect(() => {
    setSelectData([]);
    if(categories) {
      categories.map(category=>setSelectData((selectData)=>[...selectData, category.name]));
    }
    setFilteredValue(categories);
  }, [categories]);

  // FILTER THE DATA BY THE SELECTED VALUE
  useEffect(() => {
    if (selectValue) {
      setFilteredValue(categories?.filter((category) => category.name === selectValue));
    } else {
      setFilteredValue(categories);
    }
  }, [selectValue, categories]);

  // VALIDATE POST CATEGORY FORM
  const createCategoryForm = useForm({
    validate:zodResolver(PostCategorySchema),
    initialValues: {
      name : '',
    }
  });

  const {mutate: postCategory, isLoading:postCategoryLoading} = usePostCategory();

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
      {/* ACCORDION FOR THE DATA */}
      <Skeleton
        mb='3rem'
        visible={categoriesLoading ?? false}
        style={{ minHeight: "80px" }}
        animate
      >
        <Accordion value={accordionValue} onChange={setAccordionValue} transitionDuration={500}>
          {filteredValue?.map((category: GetCategory, index) => (
            <Accordion.Item
              key={category.id}
              value={category.name}
              sx={{overflowX: 'auto'}}
            >
              <Accordion.Control>{category.name}</Accordion.Control>
              <Accordion.Panel sx={{width: 'max-content', minWidth: '100%'}}>
                <Table verticalSpacing='md' horizontalSpacing='md'>
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: "0" }}>Name</th>
                      <th style={{ paddingLeft: "0" }}>Price</th>
                      <th style={{ paddingLeft: "0" }}>Id</th>
                      <th style={{ paddingLeft: "0" }}>Last Updated</th>
                      <th style={{ paddingLeft: "0" }}>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.products?.map(product => (
                      <tr key={product.name}>
                        {/* NAME */}
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.name}
                          </div>
                        </td>
                        {/* PRICE */}
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.price}
                          </div>
                        </td>
                        {/* ID */}
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.id}
                          </div>
                        </td>
                        {/* ID */}
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.lastUpdate.toString()}
                          </div>
                        </td>
                        {/* LATEST DATE STOCK */}
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product?.date[0]?.stock ?? '0'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* BUTTONS GROUP */}
                <Group>
                  <Button mt='1.5rem' color='blue'>Change details</Button>
                  <Button mt='1.5rem' color='red'>Delete</Button>
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Skeleton>
      {/* ACTIONS FOR CATEGORIES */}
      <Box>
        <Button
          color='blue'
          variant='outline'
          onClick={() => setCreateModal(true)}
        >Create Category</Button>
      </Box>
      {/* MODALS  */}
      {/* CREATE CATEGORY */}
      <Modal
        centered
        opened={createModal}
        onClose={() => setCreateModal(false)}
        title='Create Category'
      >
        <form onSubmit={createCategoryForm.onSubmit((values) => {
          postCategory(values, {
            onSuccess() {
                setCreateModal(false);
                queryClient.refetchQueries(['categories']);
            },
          });
        })}>
          <LoadingOverlay 
            transitionDuration={500}
            visible={postCategoryLoading ?? false}
          />
          <TextInput
            placeholder='Category name'
            label='Category name'
            withAsterisk
            mb='1rem'
            {...createCategoryForm.getInputProps('name')}
          />
          <Group noWrap={false}>
            <Button type='submit'>Create</Button>
            <Button color='red' onClick={() => setCreateModal(false)}>Exit</Button>
          </Group>
        </form>
      </Modal>
    </main>
  )
}

export default Categories;
Categories.requireAuth = true;