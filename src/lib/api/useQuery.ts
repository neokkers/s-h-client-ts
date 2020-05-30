import { useState, useEffect, useCallback } from "react";
import { server } from "./server";
import { PlayersData } from "../../components/Players/types";
interface State<TData> {
  data: TData | null;
}
export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      const { data } = await server.fetch<TData>({ query });
      setState({ data });
      console.log(`${data} loaded (useQuery hook)`);
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
    console.log(state);
  }, [fetch]);

  return { ...state, refetch: fetch };
};
