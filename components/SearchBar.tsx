import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { InputActionMeta, SingleValue, StylesConfig } from "react-select";
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
  const inputValue = decodeURI((router.query.query as string) || "");
  const [options, setOptions] = useState<HackerOption[]>([]);

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
            label: item.title || item.story_title || "",
          }));
          setOptions(options);
          resolve(options);
        } catch (error) {
          console.log("ERROR:", { error });
          setOptions([]);
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

  const handleInputChange = (newValue: string, meta: InputActionMeta) => {
    if (meta.action === "input-change") {
      const query = newValue.trim()
        ? {
            query: encodeURI(newValue),
          }
        : undefined;
      router.replace(
        {
          pathname: window.location.pathname,
          query,
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  };

  const customStyles: StylesConfig<HackerOption, false> = {
    container: (base) => ({
      ...base,
      width: "100%",
      maxWidth: 340,
    }),
    input: (base) => ({
      ...base,
      minHeight: 45,
      color: "#000000",
      padding: "6px 10px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#000000",
      padding: "6px 10px",
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
        defaultOptions={options}
        inputValue={inputValue}
        loadOptions={loadOptions}
        onChange={handleChange}
        styles={customStyles}
        placeholder="Search News  ..."
        isClearable
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
