import { useQuery, UseQueryOptions } from "react-query";
import { AxiosResponse } from "axios";

interface Props {
  key: string;
  fetchMethod(): Promise<AxiosResponse>;
  options?: UseQueryOptions<any, Error, any>;
  criteria?: any;
}
export function useApi<T>({ key, fetchMethod, options, criteria }: Props) {
  const { isLoading, error, data, refetch } = useQuery<T, Error>(
    [key, criteria],
    async () => {
      const { data: fetchData } = await fetchMethod();
      if (error)
        console.log(error, {
          customMessage: `An error occurred when fetching ${key}`,
        });

      return fetchData;
    },
    options
  );

  return {
    isLoading,
    error,
    data,
    refetch,
  };
}
