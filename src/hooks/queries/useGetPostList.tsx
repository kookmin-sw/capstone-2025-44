import { useInfiniteQuery } from "@tanstack/react-query";

import PostApi from "@/api/post-api";

export const useGetPostList = ({
  search,
  category,
}: {
  search: string;
  category: number;
}) => {
  if (search !== "" && category !== 0) {
    return useInfiniteQuery({
      queryKey: ["post-list-search", search],
      queryFn: ({ pageParam }) =>
        PostApi.getPostList({
          page: pageParam,
          size: 10,
          search: search,
          category: category,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length : undefined;
      },
    });
  } else if (search !== "") {
    return useInfiniteQuery({
      queryKey: ["post-list-search", search],
      queryFn: ({ pageParam }) =>
        PostApi.getPostList({ page: pageParam, size: 10, search: search }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length : undefined;
      },
    });
  } else if (category !== 0) {
    return useInfiniteQuery({
      queryKey: ["post-list-search", search],
      queryFn: ({ pageParam }) =>
        PostApi.getPostList({ page: pageParam, size: 10, category: category }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length : undefined;
      },
    });
  } else {
    return useInfiniteQuery({
      queryKey: ["post-list"],
      queryFn: ({ pageParam }) =>
        PostApi.getPostList({ page: pageParam, size: 10 }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length : undefined;
      },
    });
  }
};
