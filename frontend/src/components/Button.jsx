function Button({label, type, onClick}) {
    return <button onClick={onClick} type={type}>{label}</button>
}

export default Button