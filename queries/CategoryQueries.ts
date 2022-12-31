import { useQuery } from "@tanstack/react-query";
import axios from "../config/axios";
import { type GetCategory } from "../types/getCategories";

const getCategories = async (): Promise<GetCategory[]> => {
    const { data } = await axios.get("/categories");
    return data; 
}

const useGetCategories = () => useQuery(["categories"], getCategories);

export { useGetCategories };