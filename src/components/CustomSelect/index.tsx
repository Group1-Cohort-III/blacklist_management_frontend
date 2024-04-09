import Select, { DropdownIndicatorProps, components } from "react-select";
import { ICustomSelect, IOpt } from "../../utils/interfaces";
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
      components={{ DropdownIndicator }}
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
