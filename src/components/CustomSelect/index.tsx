import Select, {
  DropdownIndicatorProps,
  MenuListProps,
  components,
} from "react-select";
import { ICustomSelect, IOpt } from "../../interfaces/props.interface";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function CustomSelect({
  options,
  placeholder,
  isMenuOpen,
  styles,
  dropDownColor,
  setIsMenuOpen,
  onSelect,
  prefillId,
  loadMore,
  inProgress,
  isAsync,
  isError,
  showBtn,
}: ICustomSelect) {
  const [value, setValue] = useState<IOpt | null>(null);

  const DropdownIndicator = (props: DropdownIndicatorProps) => (
    <components.DropdownIndicator {...props}>
      {isMenuOpen ? (
        <FiChevronUp size={20} color={dropDownColor && dropDownColor} />
      ) : (
        <FiChevronDown size={20} color={dropDownColor && dropDownColor} />
      )}
    </components.DropdownIndicator>
  );

  const MenuList = (props: MenuListProps) => (
    <components.MenuList {...props}>
      {props.children}
      {isError ? (
        <p style={{ fontSize: "12px", textAlign: "center" }}>
          an error occurred
        </p>
      ) : inProgress ? (
        <p style={{ fontSize: "12px", textAlign: "center" }}>...Loading</p>
      ) : (
        isAsync &&
        showBtn && (
          <button
            style={{ padding: "0 10px", fontSize: "12px", color: "GrayText" }}
            disabled={inProgress || isError}
            onClick={() => loadMore && loadMore((prev) => prev + 1)}
          >
            Load More
          </button>
        )
      )}
    </components.MenuList>
  );

  const handleOnChange = (newValue: IOpt) => {
    setValue(newValue);
    onSelect(newValue);
  };

  useEffect(() => {
    if (prefillId && options) {
      const selectedOpt = options.find((option) => option.value === prefillId);
      if (selectedOpt) setValue(selectedOpt);
    }
  }, [options, prefillId]);

  return (
    <Select
      options={options}
      components={{ DropdownIndicator, MenuList }}
      value={value}
      isSearchable={false}
      styles={styles}
      placeholder={placeholder}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      onChange={(newValue) => handleOnChange(newValue as IOpt)}
    />
  );
}
