import { useRouter } from "next/router";
import { useRef } from "react";
import { SingleValue, StylesConfig } from "react-select";
import AsyncSelect from "react-select/async";
import { SearchResult } from "../interfaces";
import { fetchData } from "../utils/api";
import { API_ENDPOINT } from "../utils/constant";

interface HackerOption {
  value: string;
  label: string;
}

const SearchBar = () => {
  const router = useRouter();
  const timoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadOptions = (inputValue: string): Promise<HackerOption[]> => {
    return new Promise((resolve) => {
      if (timoutRef.current) {
        clearTimeout(timoutRef.current);
      }
      timoutRef.current = setTimeout(async () => {
        const url = API_ENDPOINT.SEARCH + "?query=" + inputValue;
        try {
          const data: SearchResult = await fetchData(url);
          const options = data.hits.map((item) => ({
            value: item.objectID,
            label: item.title,
          }));
          resolve(options);
        } catch (error) {
          console.log("ERROR:", { error });
          resolve([]);
        }
      }, 1000);
    });
  };

  const handleChange = (newValue: SingleValue<HackerOption>) => {
    if (newValue) {
      const { value } = newValue;
      router.push("/" + value);
    }
  };

  const customStyles: StylesConfig<HackerOption, false> = {
    container: (base) => ({
      ...base,
      width: 340,
    }),
    input: (base) => ({
      ...base,
      height: 45,
      color: "#000000",
      padding: '6px 10px',
    }),
    placeholder: (base) => ({
      ...base,
      color: "#000000",
      padding: '6px 10px',
    }),
    control: (base) => ({
      ...base,
      boxShadow: "inset 0px 1px 1px 1px transparent",
      borderRadius: "10px",
    }),
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        onChange={handleChange}
        styles={customStyles}
        placeholder="Search News..."
      />
    </div>
  );
};

export default SearchBar;
