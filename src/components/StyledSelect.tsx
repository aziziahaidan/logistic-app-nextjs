import Select, { SingleValue } from 'react-select';

interface Option {
    value: string;
    label: string;
}

interface StyledSelectProps {
    options: Option[];
    onChange: (option: SingleValue<Option>, name: string) => void;
    name: string;
    val:SingleValue<Option>; 
}

export default function StyledSelect({ onChange, options, name, val }: StyledSelectProps) {
    return <Select
        styles={{
            control: (baseStyles, state) => ({
                ...baseStyles,
                // borderColor: state.isFocused ? "oklch(var(--n))" : "oklch(var(--n))", //oklch(var(--b2))
                borderColor: state.isFocused ? "f2f2f2" : "f2f2f2", //oklch(var(--b2))
                backgroundColor: "oklch(var(--b3))",
                color: "oklch(var(--bc))",

            }),
            singleValue: (base) => ({
                ...base,
                color: "oklch(var(--bc))", //text color
            }),
            input: (base) => ({
                ...base,
                color: "oklch(var(--bc))", //font color on search
            }),
            menu: (base) => ({
                ...base,
                backgroundColor: "oklch(var(--b2))", // whitespace on background
            }),
            option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                    ? "oklch(var(--n))"
                    : "oklch(var(--b2))",
                color: "oklch(var(--bc))",
            }),
        }}
        theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
                ...theme.colors,
                primary25: "oklch(var(--n))",
                primary: "oklch(var(--b1))",
            },
        })} 
        name={name}
        onChange={(option) => onChange(option, name)}
        options={options}
        value={val}
    />
}