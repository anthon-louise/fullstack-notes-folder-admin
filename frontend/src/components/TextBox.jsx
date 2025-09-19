function TextBox({label, value, onChange}) {
    return <input
            type="text"
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            />
}

export default TextBox