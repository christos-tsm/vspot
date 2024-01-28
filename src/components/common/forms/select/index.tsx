'use client';
import styles from './select.module.scss';
import React, {useEffect, useRef, useState, FC, MouseEvent} from "react";

interface IconProps {
    isOpen: boolean;
}

const Icon: FC<IconProps> = ({isOpen}) => {
    return (
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="#222" strokeWidth="1.5" fill="none"
             strokeLinecap="round" strokeLinejoin="round" className={isOpen ? 'translate' : ''}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

const CloseIcon: FC = () => {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"
             strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
};

interface Option {
    label: string;
    value: string | number;
}

interface Props {
    placeholder: string;
    options: Option[];
    isMulti: boolean;
    isSearchable: boolean;
    onChange: (value: Option | Option[]) => void;
    align?: string;
}

const Select: FC<Props> = ({placeholder, options, isMulti, isSearchable, onChange, align}) => {
    const [activeClass, setActiveClass] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<Option | Option[] | null>(isMulti ? [] : null);
    const [searchValue, setSearchValue] = useState<string>("");
    const searchRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setShowMenu(false);
                setActiveClass(false);
            }
        };

        window.addEventListener("click", handler as unknown as EventListener);
        return () => {
            window.removeEventListener("click", handler as unknown as EventListener);
        };
    }, []);

    const handleInputClick = () => {
        setShowMenu(!showMenu);
        setActiveClass(!activeClass);
    };

    const getDisplay = () => {
        if (!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0)) {
            return placeholder;
        }
        if (isMulti && Array.isArray(selectedValue)) {
            return (
                <div className="dropdown-tags">
                    {selectedValue.map((option, index) => (
                        <div key={`${option.value}-${index}`} className="dropdown-tag-item">
                            {option.label}
                            <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close">
                                <CloseIcon/>
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return (selectedValue as Option).label;
    };

    const removeOption = (option: Option) => {
        return (selectedValue as Option[]).filter((o) => o.value !== option.value);
    };

    const onTagRemove = (e: React.MouseEvent<HTMLSpanElement>, option: Option) => {
        e.stopPropagation();

        if (isMulti && Array.isArray(selectedValue)) {
            // For multi-select, filter out the option and update state
            const newValue = selectedValue.filter((o) => o.value !== option.value);
            setSelectedValue(newValue);
            onChange(newValue);
        } else {
            // For single-select, just clear the selection (assuming null is an acceptable state)
            setSelectedValue(null);
            // If you need to call onChange here, ensure it can handle null or don't call it for single-select
            // Or set it to a default value that represents "no selection"
        }
    };

    const onItemClick = (option: Option) => {
        let newValue: Option | Option[];
        if (isMulti) {
            if ((selectedValue as Option[]).findIndex((o) => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...(selectedValue as Option[]), option];
            }
        } else {
            newValue = option;
        }
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const isSelected = (option: Option) => {
        if (isMulti) {
            return (selectedValue as Option[]).some((o) => o.value === option.value);
        }
        return (selectedValue as Option)?.value === option.value;
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }
        return options.filter(
            (option) =>
                option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
    };

    return (
        <div className={styles.container}>
            <div ref={inputRef} onClick={handleInputClick}
                 className={`${styles.dropdownInput} ${activeClass ? styles.dropdownInputActive : ''}`}>
                <div
                    className={`${styles.dropdownSelectedValue} ${!selectedValue || (Array.isArray(selectedValue) && selectedValue.length === 0) ? `${styles.placeholder}` : ''}`}>{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon isOpen={showMenu}/>
                    </div>
                </div>
            </div>

            {showMenu && (
                <div className={styles.dropdownMenu}>
                    {isSearchable && (
                        <div className={styles.searchBox}>
                            <input onChange={onSearch} value={searchValue} ref={searchRef}/>
                        </div>
                    )}
                    {getOptions().map((option) => (
                        <div onClick={() => onItemClick(option)} key={option.value}
                             className={`${styles.dropdownMenuItem} ${isSelected(option) ? styles.dropdownMenuItemSelected : ""}`}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
