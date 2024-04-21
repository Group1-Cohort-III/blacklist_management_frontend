import { ICustomSelect, IOpt } from "../../interfaces/props.interface";
import { selectStyles } from "../../utils/selector.style.util";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { ComponentType, useEffect, useState } from "react";
import Select, {
  DropdownIndicatorProps,
  GroupBase,
  MenuListProps,
  components,
} from "react-select";

export default function CustomSelect({
  options,
  placeholder,
  dropDownColor,
  onSelect,
  prefillId,
  loadMore,
  inProgress,
  isAsync,
  isError,
  isDisabled = false,
  showBtn,
}: ICustomSelect) {
  const [value, setValue] = useState<IOpt | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      components={{
        DropdownIndicator: DropdownIndicator as ComponentType<
          DropdownIndicatorProps<IOpt, boolean, GroupBase<IOpt>>
        >,
        MenuList: MenuList as ComponentType<
          MenuListProps<IOpt, boolean, GroupBase<IOpt>>
        >,
      }}
      isSearchable
      value={value}
      isDisabled={isDisabled}      
      placeholder={placeholder}
      styles={selectStyles(isMenuOpen, "100%")}      
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      onChange={(newValue) => handleOnChange(newValue as IOpt)}
    />
  );
}
